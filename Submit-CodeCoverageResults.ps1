cd $env:PROJECT

if (Test-Path Env:\APPVEYOR_PULL_REQUEST_NUMBER) {
    $msg = 'The environment variable "COVERALLS_REPO_TOKEN" is a secure environment variable. ' + `
           'Secure environment variables are not available during pull request builds. ' + `
           'Code coverage results have not been submitted.'
    Write-Warning $msg
} elseif (!(Test-Path Env:\COVERALLS_REPO_TOKEN)) {
    $msg = 'The environment variable "COVERALLS_REPO_TOKEN" is not set. ' + `
           'Code coverage results have not been submitted.'
    Write-Warning $msg
} else {
    $env:PATH += $env:PATH + ';' + (Resolve-Path .\node_modules\.bin).Path
    Get-Content .\coverage\lcov.info | coveralls
    if ($LASTEXITCODE -ne 0) { $Host.SetShouldExit($LASTEXITCODE) }

    Write-Output 'Code coverage results have been submitted.'
}

cd ..