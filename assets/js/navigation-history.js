(function (root) {
    function create({ key, read, restore, onError }) {
        let current = null;
        let restoring = false;
        let queued = null;
        const route = (state) => JSON.stringify(state.route);
        const entry = (state) => ({ ...history.state, [key]: state });
        function sync() {
            if (restoring) return;
            const next = read();
            if (!current) history.replaceState(entry(next), "");
            else if (route(current) !== route(next)) history.pushState(entry(next), "");
            else history.replaceState(entry(next), "");
            current = next;
        }
        async function pop(event) {
            const target = event.state?.[key];
            if (!target) return;
            if (restoring) {
                queued = event;
                return;
            }
            const previous = read();
            restoring = true;
            try {
                await restore(target);
                current = read();
                history.replaceState(entry(current), "");
            } catch (error) {
                history.pushState(entry(previous), "");
                current = previous;
                onError(error);
            } finally {
                restoring = false;
                if (queued) {
                    const next = queued;
                    queued = null;
                    await pop(next);
                }
            }
        }
        root.addEventListener("popstate", pop);
        return { sync };
    }
    root.SlovaPageHistory = { create };
})(window);
