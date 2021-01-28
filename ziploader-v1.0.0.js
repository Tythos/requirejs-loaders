/**
 * @author "Brian Kirkpatrick" <code@tythos.net>
 */

define(function (require, exports, module) {
    let zipjs = require("lib/zipjs-v2.2.4");
    zipjs.useWebWorkers = false;
    zipjs.workerScriptsPath = "../";

    /**
     * Loader extension for RequireJS. This entry point defines asynchronous
     * behaviors for loading ZIP file contents, using the zipjs library, as
     * module dependencies. The final symbol returned from the require()
     * statement will be an Object mapping filenames to zip filesystem objects,
     * to which each entry will also have a "buffer" property.
     * 
     * The "buffer" contains a Uint8Array encoding of the file contents, having
     * been extracted asynchronously as part of the module (zip file) loading
     * process. (This means users do not have to worry about asynchronous
     * decompression, which is performed at module-load time). Uint8Array
     * encoding (in addition to being synchronous, unlike Blobs) can also be
     * easily passed into a TextDecoder instance for plaintext files.
     * 
     * @param {String} name     - Path to .ZIP file to be loaded. This was originally the parameter to require(), minus the "zip!" prefix required to route to this loader.
     * @param {Function} req    - "Parent" require function, used to load other modules.
     * @param {Function} onload - Callback to invoke once loading has completed. 
     * @param {Object} config   - Configuration object, used primarily by optimizer.
     */
    exports.load = function(name, req, onload, config) {
        var zipFs = new zipjs.fs.FS();
        fetch(name).then(function(response) {
            return response.blob();
        }).then(function(blob) {
            zipFs.importBlob(blob, function() {
                // transform zip filesystem object into filename=>fileobject mapping, pre-emptively performing transcription to uint8 array
                let fileMap = {};
                let children = zipFs.root.children;
                children.forEach(function(fileObj) {
                    fileObj.getBlob("application/octet-stream", function(fileBlob) {
                        fileBlob.arrayBuffer().then(function(ab) {
                            fileObj.buffer = new Uint8Array(ab);
                            fileMap[fileObj.name] = fileObj;
                            if (Object.keys(fileMap).length == children.length) {
                                onload(fileMap);
                            }
                        });
                    });
                });
            });
        });
    };

    return Object.assign(exports, {
        "__url__": "",
        "__semver__": "",
        "__license__": ""
    });
});