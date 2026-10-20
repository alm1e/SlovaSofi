(function () {
    // Turns the native selects of match/columns activities into clickable slots and a chip bank.
    // The selects stay in the DOM as the source of truth, so saved answers keep their format.
    function enhancePairing(root, labels = {}) {
        root.querySelectorAll("[data-pair-board]:not([data-pair-ready])").forEach((board) => {
            board.dataset.pairReady = "true";
            const reuse = board.hasAttribute("data-pair-reuse");
            const rows = [...board.querySelectorAll("[data-pair-row]")];
            const selects = rows.map((row) => row.querySelector("select"));
            if (!selects.length || selects.some((select) => !select)) return;

            const optionList = [...selects[0].options].map((option, index) => ({ index, value: option.value, label: option.textContent }))
                .filter((option) => option.value !== "");
            const bank = document.createElement("div");
            bank.className = "pair-bank";
            bank.setAttribute("aria-label", labels.bank || "");
            const chips = optionList.map((option) => {
                const chip = document.createElement("button");
                chip.type = "button";
                chip.className = "pair-chip";
                chip.textContent = option.label;
                chip.dataset.pairValue = option.value;
                bank.append(chip);
                return chip;
            });
            board.after(bank);

            const slots = rows.map((row, rowIndex) => {
                const select = selects[rowIndex];
                select.hidden = true;
                select.classList.add("teacher-select-native", "pair-native");
                const slot = document.createElement("button");
                slot.type = "button";
                slot.className = "pair-slot";
                row.append(slot);
                return slot;
            });

            let active = -1;
            const refresh = () => {
                slots.forEach((slot, rowIndex) => {
                    const value = selects[rowIndex].value;
                    const option = optionList.find((item) => item.value === value);
                    const correctLabel = rows[rowIndex].dataset.pairCorrect || "";
                    slot.textContent = option ? option.label : correctLabel || labels.empty || "";
                    slot.classList.toggle("is-filled", Boolean(option));
                    slot.classList.toggle("is-correct-hint", !option && Boolean(correctLabel));
                    slot.classList.toggle("is-active", rowIndex === active);
                });
                const used = new Set(selects.map((select) => select.value).filter(Boolean));
                chips.forEach((chip) => chip.classList.toggle("is-used", !reuse && used.has(chip.dataset.pairValue)));
            };
            const setValue = (rowIndex, value) => {
                selects[rowIndex].value = value;
                selects[rowIndex].dispatchEvent(new Event("change", { bubbles: true }));
            };

            slots.forEach((slot, rowIndex) => slot.addEventListener("click", () => {
                if (selects[rowIndex].value) {
                    setValue(rowIndex, "");
                    active = rowIndex;
                } else {
                    active = active === rowIndex ? -1 : rowIndex;
                }
                refresh();
            }));
            chips.forEach((chip) => chip.addEventListener("click", () => {
                if (chip.classList.contains("is-used")) return;
                let target = active >= 0 && !selects[active].value ? active : selects.findIndex((select) => !select.value);
                if (target < 0 && active >= 0) target = active;
                if (target < 0) return;
                setValue(target, chip.dataset.pairValue);
                active = selects.findIndex((select, index) => index > target && !select.value);
                refresh();
            }));
            board.addEventListener("pair-refresh", refresh);
            refresh();
        });
    }

    const escapeNote = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
    const noteInline = (value) => escapeNote(value).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");

    const richTags = new Set(["P", "BR", "H1", "H2", "H3", "STRONG", "B", "EM", "I", "U", "S", "UL", "OL", "LI", "BLOCKQUOTE", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD", "A", "IMG", "MARK", "SPAN", "DIV"]);
    const safeLink = (value) => {
        try {
            const url = new URL(value, location.href);
            return ["https:", "http:", "mailto:"].includes(url.protocol) ? url.href : "";
        } catch {
            return "";
        }
    };
    function sanitizeRichText(value) {
        const source = String(value || "");
        const looksLikeHtml = /<\/?(?:p|br|h[1-3]|strong|b|em|i|u|ul|ol|li|table|tr|td|th|a|img|mark|span|div)\b/i.test(source);
        if (!looksLikeHtml) {
            return source.split(/\r?\n/).map((line) => {
                const heading = line.match(/^(#{1,3})\s+(.+)$/);
                const list = line.match(/^(?:[-*•]|\d+[.)])\s+(.+)$/);
                const escaped = escapeNote(heading ? heading[2] : list ? list[1] : line)
                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*(.+?)\*/g, "<em>$1</em>")
                    .replace(/==(.*?)==/g, "<mark>$1</mark>");
                if (heading) return `<h${heading[1].length}>${escaped}</h${heading[1].length}>`;
                if (list) return `<p>• ${escaped}</p>`;
                return escaped ? `<p>${escaped}</p>` : "";
            }).join("");
        }
        const parsed = new DOMParser().parseFromString(`<body>${source}</body>`, "text/html");
        const clean = (node) => {
            if (node.nodeType === Node.TEXT_NODE) return document.createTextNode(node.nodeValue || "");
            if (node.nodeType !== Node.ELEMENT_NODE) return document.createDocumentFragment();
            const element = node;
            const tag = element.tagName;
            const children = [...element.childNodes].map(clean);
            if (!richTags.has(tag)) {
                const fragment = document.createDocumentFragment();
                children.forEach((child) => fragment.append(child));
                return fragment;
            }
            const output = document.createElement(tag.toLowerCase());
            children.forEach((child) => output.append(child));
            if (tag === "A") {
                const href = safeLink(element.getAttribute("href") || "");
                if (href) {
                    output.href = href;
                    output.target = "_blank";
                    output.rel = "noopener noreferrer";
                }
            }
            if (tag === "IMG") {
                const src = safeLink(element.getAttribute("src") || "");
                if (!src || !["http:", "https:"].includes(new URL(src).protocol)) return document.createDocumentFragment();
                output.src = src;
                output.alt = (element.getAttribute("alt") || "").slice(0, 300);
                output.loading = "lazy";
            }
            if (tag === "SPAN" || tag === "MARK") {
                const color = (element.style.color || "").trim();
                if (/^#[0-9a-f]{3,8}$/i.test(color) || /^(red|blue|green|orange|purple|teal|black|white)$/i.test(color)) output.style.color = color;
                if (tag === "SPAN" && element.style.backgroundColor && /^(#[0-9a-f]{3,8}|yellow|orange|pink)$/i.test(element.style.backgroundColor.trim())) {
                    output.style.backgroundColor = element.style.backgroundColor.trim();
                }
            }
            return output;
        };
        const wrapper = document.createElement("div");
        [...parsed.body.childNodes].map(clean).forEach((node) => wrapper.append(node));
        return wrapper.innerHTML;
    }

    function renderRichText(value) {
        const markup = sanitizeRichText(value);
        return markup ? `<div class="activity-rich-content">${markup}</div>` : "";
    }

    // A text block becomes a note when its content starts with [info] or [star].
    function renderNote(content, title) {
        const match = String(content || "").match(/^\s*\[(info|star)\]\s*\n?([\s\S]*)$/i);
        if (!match) return "";
        const kind = match[1].toLowerCase();
        const lines = match[2].split("\n").map((line) => line.trim()).filter(Boolean);
        let items = "";
        let paragraphs = "";
        lines.forEach((line) => {
            const item = line.match(/^(?:\d+[.)]|[-•])\s+(.*)$/);
            if (item) items += `<li>${noteInline(item[1])}</li>`;
            else paragraphs += `<p>${noteInline(line)}</p>`;
        });
        const icon = kind === "info" ? "i" : "★";
        return `<aside class="activity-note activity-note-${kind}"><span class="activity-note-icon" aria-hidden="true">${icon}</span><div class="activity-note-body">${title ? `<h4>${noteInline(title)}</h4>` : ""}${paragraphs}${items ? `<ol>${items}</ol>` : ""}</div></aside>`;
    }

    window.SlovaActivityUI = { enhancePairing, renderNote, sanitizeRichText, renderRichText };
})();
