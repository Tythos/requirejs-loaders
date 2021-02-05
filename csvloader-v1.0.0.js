/**
 * @author <code@tythos.net>
 * @module csvloader
 */

define(function (require, exports, module) {    
    let papaparse = require("lib/papaparse-v5.0.2");

    /**
     * RequireJS loader extension interface. Asynchronously loads a .CSV
     * resource with the given name (path), then parses using the papaparse
     * library (should be co-located in the "lib/ folder") and returns that
     * Array of Objects with the "onload()" callback. (We assume the first row
     * contains header values used to generate the keys of each Object.)
     * 
     * As with all loader extensions: to configure, add the following at the
     * top of your entry point (referencing the location where this SFJM has
     * been copied into your project)::
     * 
     *   > require.config({ "paths": { "csv": "lib/csvloader-v1.0.0" } });
     * 
     * @param {String} name     - Name (path) to the .CSV file that will be loaded
     * @param {Function} req    - Original require() function, provided to support additional dependencies of the laoder
     * @param {Function} onload - Callback invoked when module loading and processing has completed
     * @param {Object} config   - Optional configuration settings, as (for example) assigned by the original loader extension hook
     */
    exports.load = function (name, req, onload, config) {
        fetch(name).then(function (response) {
            return response.text();
        }).then(function (text) {
            onload(papaparse.parse(text.trim(), { "header": true }).data);
        });
    };

    Object.assign(exports, {
        "__url__": "https://raw.githubusercontent.com/Tythos/requirejs-loaders/main/csvloader-v1.0.0.js",
        "__semver__": "1.0.0",
        "__license": "MIT"
    });
});
