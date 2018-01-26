'use strict';

// From https://github.com/zinserjan/mocha-webpack/issues/142#issuecomment-355690449
/* HACK

    This next chunk of setup is a _really_ nasty hack, but we need it to successfully
    use the prebuilt DLL bundles with our third-party libs in our tests.

     The problem is that the DLL bundles look like this:

     var abc123 = function() {
        // bundle contents here
     };

     When our application code runs, Webpack expects that "abc123" will be a variable
     in the global namespace so that it can initialize the bundled code.  However, when
     run under Node, that module is isolated, so "var abc123" will _not_ be added to the
     global namespace.

     Here's the workaround:

     1) Read the Webpack-generated manifest files for the bundles, and read out the "name"
        field, which gives us the expected global variable name
     2) Use a lib that hooks into Node's file resolution process, and gives us the actual
        source code of the module after it's been read off disk.  We can then add a new line
        of code that exports the variable as the default export of the module.
     3) Import each DLL bundle and save a reference to the contents
     4) Turn off the require hook
     5) Add the imported bundle function into the "global" object that will become the
        actual global namespace when the application code is run in the test.

     Ugly? Yep. Does it work? Yep :)
 */

const path = require('path');
const context = path.join(__dirname, '..', '..', 'wwwroot', 'app');

installDll('vendor.dll.manifest.json', 'vendor.manifest.json', 'vendor.js');
installDll('app.dll.manifest.json', 'app.manifest.json', 'app.js');

function installDll(dllManifestFileName, manifestFileName, originalFileName) {
    const dllManifest = require(path.join(context, dllManifestFileName));
    const varName = dllManifest.name;

    const nodeHook = require('node-hook');
    const { EOL } = require('os');

    nodeHook.hook('.js', function(source) {
        return `${source}${EOL}${EOL}module.exports = ${varName};`;
    });

    const manifest = require(path.join(context, manifestFileName));
    const dllFileName = manifest[originalFileName];
    const dll = require(path.join(context, dllFileName));

    // Temporarily disable console logging to quiet nodeHook
    const { log } = console;
    console.log = () => { };

    nodeHook.unhook('.js');

    // Re-enable console .logging
    console.log = log;

    global[varName] = dll;
}
