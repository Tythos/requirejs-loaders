/* To configure (typically do this in main, before require()):
   > require.config({ "paths": { "txt": "lib/txtloader-v1.0.0" } });
*/

define(function (require, exports, module) {    
    exports.load = function (name, req, onload, config) {
        fetch(name).then(function (response) {
            return response.text();
        }).then(function (text) {
            onload(text);
        });
    }

    Object.assign(exports, {
        "__uni__": "com.github.tythos.txtloader",
        "__semver__": "1.0.0",
        "__author__": "code@tythos.net",
        "__license__": "MIT" // SPDX Identifier
    });
});
