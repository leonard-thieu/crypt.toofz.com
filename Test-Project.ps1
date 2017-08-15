cd $env:PROJECT

$env:PATH += ';' + (Resolve-Path .\node_modules\.bin).Path
electron-mocha --opts .\tests\mocha-appveyor.opts
# Still running into the cleanup issue.
# if ($LASTEXITCODE -ne 0) { $Host.SetShouldExit($LASTEXITCODE) }
remap-istanbul --input .\coverage\coverage-final.json --output .\coverage\coverage-final.json
if ($LASTEXITCODE -ne 0) { $Host.SetShouldExit($LASTEXITCODE) }
istanbul report --report lcovonly
if ($LASTEXITCODE -ne 0) { $Host.SetShouldExit($LASTEXITCODE) }

cd ..