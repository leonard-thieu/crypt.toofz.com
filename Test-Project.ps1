Push-Location $env:PROJECT

$env:PATH += ';' + (Resolve-Path .\node_modules\.bin).Path
gulp build:js:test
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
electron-mocha --opts .\tests\mocha-appveyor.opts
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
remap-istanbul --input .\coverage\coverage-final.json --output .\coverage\coverage-final.json
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
istanbul report --report lcovonly
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Pop-Location