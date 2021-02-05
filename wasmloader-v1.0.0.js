/**
 * @author <code@tythos.net>
 * @module wasmloader
 */

define(function(require, exports, module) {
    /**
     * RequireJS loader extension interface. Asynchronously loads a .WASM
     * module with the given name (path), then instantes and returns that
     * module with the "onload()" callback.
     * 
     * As with all loader extensions: to configure, add the following at the
     * top of your entry point (referencing the location where this SFJM has
     * been copied into your project)::
     * 
     *   > require.config({ "paths": { "wasm": "lib/wasmloader-v1.0.0" } });
     * 
     * @param {String} name     - Name (path) to the .WASM module that will be loaded
     * @param {Function} req    - Original require() function, provided to support additional dependencies of the loader
     * @param {Function} onload - Callback invoked when module loading and instantiation has completed
     * @param {Object} config   - Optional configuration settings, as (for example) assigned by the original loader extension hook
     */
    exports.load = function(name, req, onload, config) {
        fetch(name)
            .then(response => response.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, {}))
            .then(instantiation => onload(instantiation.instance));
    };

    return Object.assign(exports, {
        "__url__": "https://raw.githubusercontent.com/Tythos/requirejs-loaders/main/wasmloader-v1.0.0.js",
        "__semver__": "1.0.0",
        "__license__": "MIT"
    });
});
