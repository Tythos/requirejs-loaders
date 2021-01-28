/* To configure (typically do this in main, before require()):
   > require.config({ "paths": { "hbs": "lib/hbsloader-v1.0.0" } });

   To load template (do this at the module level to ensure single async upfront loading):
   > let template = require("hbs!template.hbs");

   To render (render() produces sub-DOM node that can be directly attached)
   > window.document.body.appendChild(template.render({ "name": "Bob" }));
*/

define(function (require, exports, module) {    
    var handlebars = require("lib/handlebars-v4.0.11");
    handlebars.registerHelper("upper", function(str) { return str.toUpperCase(); });
    handlebars.registerHelper("lower", function(str) { return str.toLowerCase(); });
    handlebars.registerHelper("ifeq", function(lhs, rhs, options) { return (lhs == rhs) ? options.fn(this) : options.inverse(this); });
    handlebars.registerHelper("ifneq", function(lhs, rhs, options) { return (lhs != rhs) ? options.fn(this) : options.inverse(this); });
    handlebars.registerHelper("ifeven", function(arg, options) { return (arg % 2 == 0) ? options.fn(this) : options.inverse(this); });
    handlebars.registerHelper("ifodd", function(arg, options) { return (arg % 2 == 1) ? options.fn(this) : options.inverse(this); });

    exports.load = function (name, req, onload, config) {
        fetch(name).then(function (response) {
            return response.text();
        }).then(function (text) {
            var template = handlebars.compile(text);
            template.render = function (n) {
                var div = window.document.createElement("div");
                div.innerHTML = this(n);
                return div;
            };
            onload(template);
        })
    }

    Object.assign(exports, {
        "__uni__": "com.github.tythos.hbsloader",
        "__semver__": "1.1.0",
        "__author__": "code@tythos.net",
	     "__license__": "MIT" // SPDX Identifier       
    });
});
