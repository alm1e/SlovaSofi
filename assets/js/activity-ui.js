(function () {
    // Turns the native selects of match/columns activities into clickable slots and a chip bank.
    // The selects stay in the DOM as the source of truth, so saved answers keep their format.
    function enhancePairing(root, labels = {}) {
        root.querySelectorAll("[data-pair-board]:not([data-pair-ready])").forEach((board) => {
            board.dataset.pairReady = "true";
            const reuse = board.hasAttribute("data-pair-reuse");
            if (reuse) { enhanceSorting(board); return; }
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

    function enhanceSorting(board) {
        const rows = [...board.querySelectorAll('[data-pair-row]')];
        const selects = rows.map(row => row.querySelector('select'));
        if (!selects.length || selects.some(select => !select)) return;
        const language = typeof localStorage !== 'undefined' ? localStorage.getItem('siteLanguage') : 'ru';
        const words = ({
            ru: ['Слова', 'Перетащите слово сюда или выберите его и нажмите на категорию', 'Вернуть слова сюда', 'Выбрано слово', 'Выберите слово, затем категорию'],
            ua: ['Слова', 'Перетягніть слово сюди або виберіть його та натисніть категорію', 'Повернути слова сюди', 'Вибрано слово', 'Виберіть слово, потім категорію'],
            en: ['Words', 'Drag a word here, or select it and choose a category', 'Return words here', 'Word selected', 'Select a word, then a category'],
            sk: ['Slová', 'Presuňte slovo sem alebo ho vyberte a kliknite na kategóriu', 'Vrátiť slová sem', 'Vybrané slovo', 'Vyberte slovo a potom kategóriu'],
            kk: ['Сөздер', 'Сөзді осында сүйреңіз немесе таңдап, санатты басыңыз', 'Сөздерді осында қайтару', 'Таңдалған сөз', 'Сөзді, содан кейін санатты таңдаңыз']
        })[language] || ['Words', 'Drag a word here, or select it and choose a category', 'Return words here', 'Word selected', 'Select a word, then a category'];
        const categories = [...selects[0].options].filter(option => option.value).map(option => ({value:option.value,label:option.textContent}));
        board.classList.add('sorting-board');
        rows.forEach(row => { row.hidden = true; });
        const instructions = document.createElement('p');
        instructions.className = 'sorting-instructions'; instructions.textContent = words[4];
        board.append(instructions);
        const bank = document.createElement('div');
        bank.className = 'sorting-bank'; bank.setAttribute('aria-label', words[0]);
        const bankButton = document.createElement('button');
        bankButton.type = 'button'; bankButton.className = 'sorting-bank-return'; bankButton.textContent = `↶ ${words[2]}`;
        bank.append(bankButton); board.append(bank);
        const grid = document.createElement('div'); grid.className = 'sorting-categories'; board.append(grid);
        const zones = categories.map(category => {
            const zone = document.createElement('section'); zone.className = 'sorting-category';
            const target = document.createElement('button'); target.type = 'button'; target.className = 'sorting-category-target';
            const title = document.createElement('strong'); title.textContent = category.label;
            const hint = document.createElement('span'); hint.textContent = `↓ ${words[1]}`;
            target.append(title,hint); zone.append(target); grid.append(zone);
            return {zone,target,value:category.value};
        });
        const status = document.createElement('p'); status.className = 'sorting-status'; status.setAttribute('role','status'); board.append(status);
        let selected = -1, dragged = -1;
        const chips = rows.map((row,index) => {
            const chip = document.createElement('button'); chip.type = 'button'; chip.className = 'sorting-chip'; chip.draggable = true;
            const content = row.querySelector('span');
            if (content) chip.append(content.cloneNode(true));
            else chip.textContent = selects[index].getAttribute('aria-label') || String(index + 1);
            if (row.dataset.pairCorrect) {
                const correctHint = document.createElement('small');
                correctHint.className = 'sorting-correct-hint';
                correctHint.textContent = `→ ${row.dataset.pairCorrect}`;
                chip.append(correctHint);
            }
            chip.addEventListener('click', () => {
                selected = selected === index ? -1 : index;
                refresh(); status.textContent = selected < 0 ? words[4] : `${words[3]}: ${chip.textContent}`;
            });
            chip.addEventListener('dragstart', event => {
                dragged = index; selected = index;
                event.dataTransfer.setData('text/plain', String(index)); event.dataTransfer.effectAllowed = 'move';
            });
            chip.addEventListener('dragend', () => { dragged = -1; zones.forEach(({zone}) => zone.classList.remove('is-over')); bank.classList.remove('is-over'); });
            return chip;
        });
        const order = chips.map((_,index) => index);
        for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i+1)); [order[i],order[j]] = [order[j],order[i]]; }
        function refresh() {
            for (const index of order) {
                const destination = zones.find(zone => zone.value === selects[index].value)?.zone || bank;
                const chip = chips[index];
                if (chip.parentElement !== destination) destination.append(chip);
                chip.setAttribute('aria-pressed', String(selected === index));
                chip.classList.toggle('is-selected', selected === index);
            }
        }
        function move(value) {
            const index = dragged >= 0 ? dragged : selected;
            if (index < 0 || !selects[index]) return;
            selects[index].value = value;
            selects[index].dispatchEvent(new Event('change', {bubbles:true}));
            selected = -1; dragged = -1; status.textContent = words[4]; refresh();
            chips[index].focus();
        }
        function dropTarget(element, value, button) {
            button.addEventListener('click', () => move(value));
            element.addEventListener('dragover', event => { if (dragged < 0) return; event.preventDefault(); element.classList.add('is-over'); event.dataTransfer.dropEffect = 'move'; });
            element.addEventListener('dragleave', event => { if (!element.contains(event.relatedTarget)) element.classList.remove('is-over'); });
            element.addEventListener('drop', event => { event.preventDefault(); element.classList.remove('is-over'); if (dragged >= 0) move(value); });
        }
        dropTarget(bank,'',bankButton);
        zones.forEach(({zone,target,value}) => dropTarget(zone,value,target));
        board.addEventListener('pair-refresh',refresh);
        selects.forEach(select => select.addEventListener('change',refresh));
        refresh();
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

    function renderRichText(content, depth = 0) {
        const source = String(content || "");
        if (!source.trim()) return "";
        if (depth > 20) return `<p>${escapeNote(source)}</p>`;
        const lines = source.replace(/\r/g, "").split("\n");
        const blocks = [];
        let listItems = [];
        let listType = "";
        let tableRows = [];
        const flushList = () => {
            if (listItems.length) blocks.push(`<${listType}>${listItems.map((item) => `<li>${noteInline(item)}</li>`).join("")}</${listType}>`);
            listItems = [];
            listType = "";
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
                blocks.push(`<div style="text-align:${alignment[1].toLowerCase()}">${renderRichText(alignment[2], depth + 1)}</div>`);
                continue;
            }
            const quote = line.match(/^>\s?(.*)$/);
            if (quote) {
                flushList();
                blocks.push(`<blockquote>${noteInline(quote[1])}</blockquote>`);
                continue;
            }
            const heading = line.match(/^(#{1,3})\s+(.+)$/);
            if (heading) {
                flushList();
                const level = heading[1].length;
                blocks.push(`<h${level}>${noteInline(heading[2])}</h${level}>`);
                continue;
            }
            const item = line.match(/^(\d+[.)]|[-•])\s+(.*)$/);
            if (item) {
                const nextListType = /^\d/.test(item[1]) ? "ol" : "ul";
                if (listType && listType !== nextListType) flushList();
                listType = nextListType;
                listItems.push(item[2]);
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
    function renderNote(content, title, settings = {}) {
        const match = String(content || "").match(/^\s*\[(info|star)\]\s*\n?([\s\S]*)$/i);
        if (!match && settings.note !== true) return "";
        const kind = match ? match[1].toLowerCase() : 'info';
        const icon = kind === "info" ? "i" : "★";
        if (window.SlovaLessonNotes) {
            const language = typeof localStorage !== 'undefined' ? localStorage.getItem('siteLanguage') : 'ru';
            const words = window.SlovaLessonNotes.text(language);
            return `<details class="activity-note customizable-note" style="--note-color:${window.SlovaLessonNotes.color(settings)}" ${settings.noteCollapsed ? '' : 'open'}><summary><span aria-hidden="true">${icon}</span> ${noteInline(title || words[0])}${settings.studentVisible === false ? `<small class="note-private">◉ ${words[4]}</small>` : ''}</summary><div class="activity-note-body">${renderRichText(match ? match[2] : content)}</div></details>`;
        }
        return `<aside class="activity-note activity-note-${kind}"><span class="activity-note-icon" aria-hidden="true">${icon}</span><div class="activity-note-body">${title ? `<h4>${noteInline(title)}</h4>` : ""}${renderRichText(match ? match[2] : content)}</div></aside>`;
    }

    function renderBlankText(parts, inputs) {
        let marker = '\uE000GAP';
        while (parts.some(part => String(part).includes(marker))) marker += 'X';
        const content = parts.map((part, index) => part + (inputs[index] ? `${marker}${index}\uE001` : '')).join('');
        return renderRichText(content).replace(new RegExp(`${marker}(\\d+)\uE001`, 'g'), (_, index) => inputs[Number(index)] || '');
    }
    window.SlovaActivityUI = { enhancePairing, renderNote, renderRichText, renderBlankText };
})();
