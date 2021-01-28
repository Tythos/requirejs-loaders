/* To configure (typically do this in main, before require()):
   > require.config({ "paths": { "csv": "lib/csvloader-v1.0.0" } });
*/

define(function (require, exports, module) {    
    let papaparse = require("lib/papaparse-v5.0.2");

    exports.load = function (name, req, onload, config) {
        fetch(name).then(function (response) {
            return response.text();
        }).then(function (text) {
            onload(papaparse.parse(text.trim(), { "header": true }).data);
        });
    }

    Object.assign(exports, {
        "__uni__": "com.github.gist.tythos.csvloader",
        "__semver__": "1.0.0",
        "__author__": "code@tythos.net"
    });
});
