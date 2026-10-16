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

    window.SlovaActivityUI = { enhancePairing, renderNote };
})();
