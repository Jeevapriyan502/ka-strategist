# Run in PowerShell from project root: .\scripts\push-github.ps1
$ErrorActionPreference = "Stop"
$env:Path = "C:\Program Files\Git\bin;C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:Path
Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host "Checking GitHub login..."
& gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Log in to GitHub (browser will open)..."
  & gh auth login -h github.com -p https -w
}

if (git remote get-url origin 2>$null) {
  Write-Host "Pushing to existing remote..."
  git push -u origin main
} else {
  Write-Host "Creating repo ka-strategist and pushing..."
  & gh repo create ka-strategist --public --source=. --remote=origin --push
}

Write-Host "Done."
