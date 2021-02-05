/**
 * @author <code@tythos.net>
 * @module hbsloader
 */

define(function (require, exports, module) {    
    var handlebars = require("lib/handlebars-v4.0.11");
    handlebars.registerHelper("upper", function(str) { return str.toUpperCase(); });
    handlebars.registerHelper("lower", function(str) { return str.toLowerCase(); });
    handlebars.registerHelper("ifeq", function(lhs, rhs, options) { return (lhs == rhs) ? options.fn(this) : options.inverse(this); });
    handlebars.registerHelper("ifneq", function(lhs, rhs, options) { return (lhs != rhs) ? options.fn(this) : options.inverse(this); });
    handlebars.registerHelper("ifeven", function(arg, options) { return (arg % 2 == 0) ? options.fn(this) : options.inverse(this); });
    handlebars.registerHelper("ifodd", function(arg, options) { return (arg % 2 == 1) ? options.fn(this) : options.inverse(this); });

    /**
     * RequireJS loader extension interface. Asynchronously loads the .HBS file
     * from the given name (path), then instantes and returns that template
     * using Handlebars (assumed to be co-located). Also defines several helper
     * macros for HBS evaluation.
     * 
     * As with all loader extensions: to configure, add the following at the
     * top of your entry point (referencing the location where this SFJM has
     * been copied into your project)::
     * 
     *   > require.config({ "paths": { "hbs": "lib/hbsloader-v1.0.0" } });
     * 
     * To load template (do this at the module level to ensure single async
     * upfront loading), treat it like any other module dependency/resource::
     * 
     *   > const template = require("hbs!template.hbs");
     * 
     * From this object, the render() method produces a single sub-DOM node
     * that can be directly attached to a parent element::
     * 
     *   > window.document.body.appendChild(template.render({ "name": "Bob" }));
     * 
     * @param {String} name     - Name (path) to the .HBS module that will be loaded
     * @param {Function} req    - Original require() function, provided to support additional dependencies of the loader
     * @param {Function} onload - Callback invoked when module loading and instantiation has completed
     * @param {Object} config   - Optional configuration settings, as (for example) assigned by the original loader extension hook
     */
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
        });
    }

    Object.assign(exports, {
        "__url__": "https://raw.githubusercontent.com/Tythos/requirejs-loaders/main/hbsloader-v1.0.0.js",
        "__semver__": "1.1.0",
	     "__license__": "MIT"
    });
});
