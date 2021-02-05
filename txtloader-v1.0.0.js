/**
 * @author <code@tythos.net>
 * @module txtloader
 */

define(function (require, exports, module) {
    /**
     * RequireJS loader extension interface. Asynchronously loads a .TXT file
     * with the given name (path), then returns the content of that file with
     * the "onload()" callback. This is less useful for actual plaintext .TXT
     * files, of course, for which fetch() is perfectly fine. It is more useful
     * for OTHER module-level resources/dependencies that EXIST as plaintext;
     * for example, shader source code (.GLSL), etc.
     * 
     * As with all loader extensions: to configure, add the following at the
     * top of your entry point (referencing the location where this SFJM has
     * been copied into your project)::
     * 
     *   > require.config({ "paths": { "txt": "lib/txtloader-v1.0.0" } });
     * 
     * @param {String} name     - Name (path) to the .TXT-like file that will be loaded
     * @param {Function} req    - Original require() function, provided to support additional dependencies of the loader
     * @param {Function} onload - Callback invoked when module loading and instantiation has completed
     * @param {Object} config   - Optional configuration settings, as (for example) assigned by the original loader extension hook
     */
    exports.load = function (name, req, onload, config) {
        fetch(name).then(function (response) {
            return response.text();
        }).then(function (text) {
            onload(text);
        });
    }

    Object.assign(exports, {
        "__url__": "https://raw.githubusercontent.com/Tythos/requirejs-loaders/main/txtloader-v1.0.0.js",
        "__semver__": "1.0.0",
        "__license__": "MIT"
    });
});
