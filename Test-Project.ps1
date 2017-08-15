cd $env:PROJECT

$env:PATH += ';' + (Resolve-Path .\node_modules\.bin).Path
electron-mocha --opts .\tests\mocha-appveyor.opts
if ($LASTEXITCODE -ne 0) { $Host.SetShouldExit($LASTEXITCODE) }
$coveragePath = (Resolve-Path .\coverage\coverage-final.json).Path
remap-istanbul --input "$coveragePath" --output "$coveragePath"
if ($LASTEXITCODE -ne 0) { $Host.SetShouldExit($LASTEXITCODE) }
istanbul report --report lcovonly
if ($LASTEXITCODE -ne 0) { $Host.SetShouldExit($LASTEXITCODE) }

cd ..