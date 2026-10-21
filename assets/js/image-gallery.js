(function () {
    const words = {
        ua: { of: "з", prev: "Попереднє зображення", next: "Наступне зображення", close: "Закрити", zoom: "Збільшити зображення" },
        ru: { of: "из", prev: "Предыдущее изображение", next: "Следующее изображение", close: "Закрыть", zoom: "Увеличить изображение" },
        en: { of: "of", prev: "Previous image", next: "Next image", close: "Close", zoom: "Enlarge image" }
    };
    const maxImages = 20;
    let lightbox = null;
    let lightboxImages = [];
    let lightboxIndex = 0;

    const label = (key) => (words[localStorage.getItem("siteLanguage")] || words.ru)[key];
    const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

    function safeUrl(value, allowFile) {
        try {
            const url = new URL(value, location.href);
            return ["http:", "https:"].concat(allowFile ? ["file:"] : []).includes(url.protocol) ? url.href : "";
        } catch {
            return "";
        }
    }

    // One image per line; a line may be a plain address or Markdown ![alt](address).
    function parse(content, allowFile = false) {
        return String(content || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean).slice(0, maxImages).map((line) => {
            const markdown = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
            return { url: safeUrl(markdown ? markdown[2] : line, allowFile), alt: markdown ? markdown[1] : "" };
        }).filter((image) => image.url);
    }

    const chevron = (direction) => `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="${direction < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    const slotFor = (offset) => (offset < -1 ? "past" : offset > 1 ? "far" : String(offset));

    function html(images, fallbackAlt, imageClass) {
        if (!images.length) return "";
        const slides = images.map((image, index) => `<img class="slova-gallery-image ${escape(imageClass || "")}" style="--o:${index}" data-slot="${slotFor(index)}" src="${escape(image.url)}" alt="${escape(image.alt || fallbackAlt || "")}" title="${escape(label("zoom"))}" data-gallery-zoom draggable="false">`).join("");
        if (images.length === 1) return `<figure class="slova-gallery" data-gallery data-gallery-index="0">${slides}</figure>`;
        return `<figure class="slova-gallery is-multiple" data-gallery data-gallery-index="0">
            <div class="slova-gallery-stage">${slides}</div>
            <div class="slova-gallery-nav">
                <button type="button" class="slova-gallery-arrow" data-gallery-step="-1" aria-label="${escape(label("prev"))}">${chevron(-1)}</button>
                <span class="slova-gallery-count"><b data-gallery-current>1</b> ${escape(label("of"))} ${images.length}</span>
                <button type="button" class="slova-gallery-arrow" data-gallery-step="1" aria-label="${escape(label("next"))}">${chevron(1)}</button>
            </div></figure>`;
    }

    const PEEK = 56;

    // Equal-sized cards keep their height and reveal only a side strip behind the active card.
    function layout(gallery) {
        const slides = [...gallery.querySelectorAll(".slova-gallery-stage .slova-gallery-image")];
        const active = slides[Number(gallery.dataset.galleryIndex)];
        if (!active) return;
        slides.forEach((slide, position) => {
            const offset = position - Number(gallery.dataset.galleryIndex);
            const steps = Math.min(Math.abs(offset), 3);
            const sign = Math.sign(offset);
            slide.style.setProperty("--x", `${sign * PEEK * steps}px`);
        });
    }

    // Each card sits at --o steps from the active one: 0 is in front, others peek out on both sides.
    function showSlide(gallery, index) {
        const slides = [...gallery.querySelectorAll(".slova-gallery-image")];
        const next = (index + slides.length) % slides.length;
        slides.forEach((slide, position) => {
            slide.style.setProperty("--o", String(position - next));
            slide.dataset.slot = slotFor(position - next);
        });
        gallery.dataset.galleryIndex = String(next);
        layout(gallery);
        const counter = gallery.querySelector("[data-gallery-current]");
        if (counter) counter.textContent = String(next + 1);
        return next;
    }

    function ensureLightbox() {
        if (lightbox) return lightbox;
        lightbox = document.createElement("div");
        lightbox.className = "slova-lightbox";
        lightbox.hidden = true;
        lightbox.innerHTML = `<button type="button" class="slova-lightbox-close" data-lightbox-close>×</button>
            <button type="button" class="slova-lightbox-arrow slova-lightbox-prev" data-lightbox-step="-1">‹</button>
            <img class="slova-lightbox-image" alt="">
            <button type="button" class="slova-lightbox-arrow slova-lightbox-next" data-lightbox-step="1">›</button>
            <span class="slova-lightbox-count"></span>`;
        document.body.appendChild(lightbox);
        return lightbox;
    }

    function renderLightbox() {
        const box = ensureLightbox();
        const image = lightboxImages[lightboxIndex];
        const picture = box.querySelector(".slova-lightbox-image");
        picture.src = image.src;
        picture.alt = image.alt;
        const many = lightboxImages.length > 1;
        box.querySelectorAll("[data-lightbox-step]").forEach((button) => { button.hidden = !many; });
        box.querySelector(".slova-lightbox-count").textContent = many ? `${lightboxIndex + 1} ${label("of")} ${lightboxImages.length}` : "";
        box.querySelector("[data-lightbox-close]").setAttribute("aria-label", label("close"));
    }

    function openLightbox(gallery, startImage) {
        const slides = [...gallery.querySelectorAll(".slova-gallery-image")];
        lightboxImages = slides.map((slide) => ({ src: slide.src, alt: slide.alt }));
        lightboxIndex = Math.max(0, slides.indexOf(startImage));
        renderLightbox();
        lightbox.hidden = false;
        document.documentElement.classList.add("slova-lightbox-open");
    }

    function closeLightbox() {
        if (!lightbox || lightbox.hidden) return;
        lightbox.hidden = true;
        document.documentElement.classList.remove("slova-lightbox-open");
    }

    function stepLightbox(step) {
        if (lightboxImages.length < 2) return;
        lightboxIndex = (lightboxIndex + step + lightboxImages.length) % lightboxImages.length;
        renderLightbox();
    }

    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const step = target.closest("[data-gallery-step]");
        if (step) {
            const gallery = step.closest("[data-gallery]");
            showSlide(gallery, Number(gallery.dataset.galleryIndex) + Number(step.dataset.galleryStep));
            return;
        }
        const zoom = target.closest("[data-gallery-zoom]");
        if (zoom) {
            const gallery = zoom.closest("[data-gallery]");
            const slides = [...gallery.querySelectorAll(".slova-gallery-image")];
            const position = slides.indexOf(zoom);
            if (gallery.classList.contains("is-multiple") && position !== Number(gallery.dataset.galleryIndex)) showSlide(gallery, position);
            else openLightbox(gallery, zoom);
            return;
        }
        if (target.closest("[data-lightbox-step]")) {
            stepLightbox(Number(target.closest("[data-lightbox-step]").dataset.lightboxStep));
            return;
        }
        if (target.closest("[data-lightbox-close]") || target.classList.contains("slova-lightbox")) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
        if (!lightbox || lightbox.hidden) return;
        if (event.key === "Escape") closeLightbox();
        else if (event.key === "ArrowLeft") stepLightbox(-1);
        else if (event.key === "ArrowRight") stepLightbox(1);
    });

    document.addEventListener("load", (event) => {
        const gallery = event.target instanceof Element && event.target.closest(".is-multiple[data-gallery]");
        if (gallery) layout(gallery);
    }, true);

    window.addEventListener("resize", () => {
        document.querySelectorAll(".is-multiple[data-gallery]").forEach(layout);
    });

    window.slovaGallery = { parse, html };
})();
