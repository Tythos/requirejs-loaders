requirejs-loaders
=================

Loader modules (SFJMs) for RequireJS extensions.

Listing
-------

This project contains different RequireJS extensions for loading various file
types as module dependencies. Most of these have been migrated from their
previous life as Gists to provide a better degree of organization (though they
remain single-file JavaScript modules). Currently this includes:

* *csvloader*, which uses Papaparse to load CSV tables

* *hbsloader*, which uses Handlebars to load HTML templates

* *txtloader*, which is a super-basic demo and shortcut for loading text files
  that may (for whatever reason) be module dependencies. This can be useful for
  other plaintext resources, like source code (for GLSL shaders, for example).

* *ziploader*, which uses a streamlined (SFJM) version of the zipjs library to
  expose .ZIP file contents that a module can then use.

I cannot guarantee that this list remains complete, as additional loader
extensions may be added at any time and this is not meant to be an exhaustive
enumeration. However, the four examples included here cover a wide and
interesting range of use cases, should you be interested in learning more (or
possibly replicating) about how these mechanics work.

Usage
-----

RequireJS loader extensions are used in two steps: configuration and loading.

First, RequireJS must be *configured* to utilize the loader when a specific
file type (or, rather, prefix flag) is used by a module's invocation of the
"require()" function. This must happen at the top level of the web application,
before other modules are required, and may look something like this::

  require.config({ "paths": { "csv": "lib/csvloader-v1.0.0" } });

In the above case, RequireJS is told that the "csv!" prefix will indicate that
users (developers) would like to use a loader extension for the subsequent
path--and that the module at "lib/csvloader-v1.0.0.js" (in this case) will
expose a "load()" function that RequireJS should invoke to implement the
desired behavior.

Second, users (developers) call the "require()" function from within a module
to declare a dependency and map it to a symbol. Using the CSV loader extension
configured in the example above, this might look something like the following::

  const mycsv = require("csv!path/to/my.csv");

In this call, RequireJS sees the "csv!" prefix and knows to utilize the loader
extension defined in the configuration under the "csv" path property. That
module's "load()" function will be invoked, including a callback that will be
passed the results of the loading operation. In this case, the CSV loader will
load and parse a table of data from a .CSV file and return an Array of Objects,
processed using the Papaparse library, for the module to utilize.
