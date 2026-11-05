(function (root) {
    const types = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', avif: 'image/avif', bmp: 'image/bmp' };
    function type(file) {
        const declared = String(file?.type || '').toLowerCase();
        if (declared.startsWith('image/')) return declared === 'image/jpg' ? 'image/jpeg' : declared;
        if (declared && declared !== 'application/octet-stream') return '';
        return types[String(file?.name || '').split('.').pop().toLowerCase()] || '';
    }
    function files(transfer) {
        const direct = Array.from(transfer?.files || []).filter(file => type(file));
        if (direct.length) return direct;
        return Array.from(transfer?.items || []).filter(item => item.kind === 'file')
            .map(item => item.getAsFile()).filter(file => type(file));
    }
    const api = { type, files };
    root.SlovaImageInput = api;
    if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
