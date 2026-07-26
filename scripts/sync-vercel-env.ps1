# Sync .env.local to Vercel production (run from project root)
$ErrorActionPreference = "Stop"
$env:Path = "C:\Program Files\Git\bin;C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:Path
Set-Location (Split-Path $PSScriptRoot -Parent)

$names = @(
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "CONTACT_EMAIL",
  "ADMIN_PASSWORD",
  "NEXT_PUBLIC_CONTACT_PHONE"
)

$lines = Get-Content ".env.local" | Where-Object { $_ -match '^\s*[^#]' }
$map = @{}
foreach ($line in $lines) {
  if ($line -match '^([^=]+)=(.*)$') {
    $map[$matches[1].Trim()] = $matches[2].Trim()
  }
}

foreach ($name in $names) {
  if (-not $map.ContainsKey($name)) { continue }
  $value = $map[$name]
  if ($value -match 'placeholder|your_|change_me') {
    Write-Host "Skip $name (placeholder)"
    continue
  }
  Write-Host "Adding $name to Vercel production..."
  $value | npx vercel env add $name production --force 2>&1 | Out-Null
}

Write-Host "Done. Run: npx vercel deploy --prod --yes"
