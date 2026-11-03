const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const test = require("node:test");
const source = fs.readFileSync(`${__dirname}/teacher.js`, "utf8");
function fn(name) {
    const start = source.indexOf(`async function ${name}(`);
    return source.slice(start, source.indexOf("\n}", start) + 2);
}
test("single file and imported original uploads both validate pixels before storing anything", async () => {
    const uploads = [], checked = [];
    const ctx = vm.createContext({
        currentLanguage: "en", currentUser: { id: "teacher" },
        crypto: { randomUUID: () => "image" },
        imageUploadMessages: { en: { blank: "Blank image: upload the original again" } },
        resizeImageForUpload: async (file, strict, preserveOriginal) => {
            checked.push([file, strict]);
            if (file.blank) {
                const error = Error("Blank image"); error.code = "BLANK_IMAGE"; throw error;
            }
            return preserveOriginal ? file : { type: "image/jpeg" };
        },
        window: { supabaseClient: { storage: { from: () => ({
            upload: async (path, file) => { uploads.push([path, file]); return { error: null }; },
            getPublicUrl: () => ({ data: { publicUrl: "https://example.test/image.jpg" } })
        }) } } }
    });
    vm.runInContext(fn("uploadLessonImage"), ctx);
    const blank = { type: "image/png", blank: true };
    await assert.rejects(ctx.uploadLessonImage(blank), /upload the original again/);
    await assert.rejects(ctx.uploadLessonImage(blank, true), /upload the original again/);
    assert.equal(uploads.length, 0);
    assert.equal(checked.every(([, strict]) => strict), true);
    const valid = { type: "image/png" };
    await ctx.uploadLessonImage([blank, valid]);
    assert.equal(uploads.length, 1);
    await ctx.uploadLessonImage(valid, true);
    assert.equal(uploads[1][1], valid);
});
test("a white JPEG is rejected while a decoded picture with varied colours is encoded", async () => {
    let pixels = new Uint8ClampedArray([255, 255, 255, 255, 255, 255, 255, 255]);
    let encoded = false, closed = 0;
    const ctx = vm.createContext({
        createImageBitmap: async () => ({ width: 2, height: 1, close: () => { closed++; } }),
        document: { createElement: () => ({
            getContext: () => ({ drawImage() {}, getImageData: () => ({ data: pixels }), fillRect() {} }),
            toBlob: (callback) => { encoded = true; callback({ size: 200, type: "image/jpeg" }); }
        }) }
    });
    vm.runInContext(fn("resizeImageForUpload"), ctx);
    await assert.rejects(ctx.resizeImageForUpload({ type: "image/jpeg" }, true), error => error.code === "BLANK_IMAGE");
    assert.equal(encoded, false);
    assert.equal(closed, 1);
    pixels = new Uint8ClampedArray([255, 255, 255, 255, 0, 60, 120, 255]);
    assert.equal((await ctx.resizeImageForUpload({ type: "image/png" }, true)).type, "image/jpeg");
    assert.equal(encoded, true);
});
test("transparent clipboard images upload the recovered opaque pixels instead of the broken original", async () => {
    let recovered = false, encoded = false;
    const ctx = vm.createContext({
        createImageBitmap: async () => ({ width: 2, height: 1, close() {} }),
        recoverTransparentImage: async () => { recovered = true; return {}; },
        document: { createElement: () => ({
            getContext: () => ({
                drawImage() {}, fillRect() {},
                getImageData: () => ({ data: new Uint8ClampedArray(recovered
                    ? [255, 255, 255, 255, 0, 60, 120, 255] : [0, 0, 0, 0, 0, 0, 0, 0]) })
            }),
            toBlob: callback => { encoded = true; callback({ size: 200, type: "image/jpeg" }); }
        }) }
    });
    vm.runInContext(fn("resizeImageForUpload"), ctx);
    const original = { type: "image/png" };
    const result = await ctx.resizeImageForUpload(original, true, true);
    assert.notEqual(result, original);
    assert.equal(result.type, "image/jpeg");
    assert.equal(encoded, true);
});
