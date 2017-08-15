cd $env:PROJECT

$env:PATH += ';' + (Resolve-Path .\node_modules\.bin).Path
# Tests are run twice, once with an AppVeyor reporter and then with the spec reporter.
# A multiplexing reporter would be ideal here but current solutions don't seem to handle output well.
electron-mocha --opts .\tests\mocha-appveyor.opts
if ($LASTEXITCODE -ne 0) { $Host.SetShouldExit($LASTEXITCODE) }
electron-mocha --opts .\tests\mocha.opts
if ($LASTEXITCODE -ne 0) { $Host.SetShouldExit($LASTEXITCODE) }
remap-istanbul --input .\coverage\coverage-final.json --output .\coverage\coverage-final.json
if ($LASTEXITCODE -ne 0) { $Host.SetShouldExit($LASTEXITCODE) }
istanbul report --report lcovonly
if ($LASTEXITCODE -ne 0) { $Host.SetShouldExit($LASTEXITCODE) }

cd ..