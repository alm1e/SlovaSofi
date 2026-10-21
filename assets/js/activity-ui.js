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
    const noteInline = (value) => escapeNote(value)
        .replace(/!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/gi, '<img src="$2" alt="$1" loading="lazy">')
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/gi, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\[color=(#[\da-f]{3,8})\]([\s\S]+?)\[\/color\]/gi, '<span style="color:$1">$2</span>')
        .replace(/\[size=(12|14|16|18|20|24|28|32|36)\]([\s\S]+?)\[\/size\]/gi, '<span style="font-size:$1px">$2</span>')
        .replace(/\[highlight=(#[\da-f]{6})\]([\s\S]+?)\[\/highlight\]/gi, '<mark style="background-color:$1">$2</mark>')
        .replace(/\[u\]([\s\S]+?)\[\/u\]/gi, "<u>$1</u>")
        .replace(/\[s\]([\s\S]+?)\[\/s\]/gi, "<s>$1</s>")
        .replace(/\[border\]([\s\S]+?)\[\/border\]/gi, '<span class="activity-rich-outline">$1</span>')
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");

    function renderRichText(content) {
        const source = String(content || "");
        if (!source.trim()) return "";
        const lines = source.replace(/\r/g, "").split("\n");
        const blocks = [];
        let listItems = [];
        let tableRows = [];
        const flushList = () => {
            if (listItems.length) blocks.push(`<ul>${listItems.map((item) => `<li>${noteInline(item)}</li>`).join("")}</ul>`);
            listItems = [];
        };
        const flushTable = () => {
            if (tableRows.length) blocks.push(`<div class="preview-table-wrap"><table><tbody>${tableRows.map((row) => `<tr>${row.map((cell) => `<td>${noteInline(cell.trim())}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
            tableRows = [];
        };
        for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line) {
                flushList();
                flushTable();
                continue;
            }
            const cells = line.startsWith("|") && line.endsWith("|")
                ? line.slice(1, -1).split("|")
                : null;
            if (cells) {
                flushList();
                if (!cells.every((cell) => /^[-:\s]+$/.test(cell))) tableRows.push(cells);
                continue;
            }
            flushTable();
            const alignment = line.match(/^\[align=(left|center|right)\]([\s\S]*)\[\/align\]$/i);
            if (alignment) {
                flushList();
                blocks.push(`<p style="text-align:${alignment[1].toLowerCase()}">${noteInline(alignment[2])}</p>`);
                continue;
            }
            const heading = line.match(/^(#{1,3})\s+(.+)$/);
            if (heading) {
                flushList();
                const level = heading[1].length;
                blocks.push(`<h${level}>${noteInline(heading[2])}</h${level}>`);
                continue;
            }
            const item = line.match(/^(?:\d+[.)]|[-•])\s+(.*)$/);
            if (item) {
                listItems.push(item[1]);
                continue;
            }
            flushList();
            blocks.push(`<p>${noteInline(line)}</p>`);
        }
        flushList();
        flushTable();
        return `<div class="activity-rich-text">${blocks.join("")}</div>`;
    }

    // A text block becomes a note when its content starts with [info] or [star].
    function renderNote(content, title) {
        const match = String(content || "").match(/^\s*\[(info|star)\]\s*\n?([\s\S]*)$/i);
        if (!match) return "";
        const kind = match[1].toLowerCase();
        const icon = kind === "info" ? "i" : "★";
        return `<aside class="activity-note activity-note-${kind}"><span class="activity-note-icon" aria-hidden="true">${icon}</span><div class="activity-note-body">${title ? `<h4>${noteInline(title)}</h4>` : ""}${renderRichText(match[2])}</div></aside>`;
    }

    window.SlovaActivityUI = { enhancePairing, renderNote, renderRichText };
})();
