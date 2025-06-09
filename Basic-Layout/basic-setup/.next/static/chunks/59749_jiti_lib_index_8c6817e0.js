(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/59749_jiti_lib_index_8c6817e0.js", {

"[project]/node_modules/tailwindcss/node_modules/jiti/lib/index.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
function onError(err) {
    throw err; /* ↓ Check stack trace ↓ */ 
}
module.exports = function jiti(filename, opts) {
    const jiti = __turbopack_context__.r("[project]/node_modules/tailwindcss/node_modules/jiti/dist/jiti.js [app-client] (ecmascript)");
    opts = {
        onError,
        ...opts
    };
    if (!opts.transform) {
        opts.transform = __turbopack_context__.r("[project]/node_modules/tailwindcss/node_modules/jiti/dist/babel.js [app-client] (ecmascript)");
    }
    return jiti(filename, opts);
};
}}),
}]);

//# sourceMappingURL=59749_jiti_lib_index_8c6817e0.js.map