$ErrorActionPreference = 'Stop'
$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$restic = Join-Path $root 'artifacts\private-backups\backup-tools\restic_0.19.1_windows_amd64.exe'
if (-not (Test-Path -LiteralPath $restic)) {
    $installed = Get-Command restic -ErrorAction SilentlyContinue
    if (-not $installed) { throw 'restic is required. Install restic and restart the terminal.' }
    $restic = $installed.Source
}
foreach ($tool in @('node', 'supabase', 'docker', 'tar.exe', 'git')) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        throw "Missing $tool. For docker, install Docker Desktop and start its engine before retrying."
    }
}
& docker info --format '{{.ServerVersion}}' 2>$null
if ($LASTEXITCODE -ne 0) { throw 'Start Docker Desktop and wait until its engine is ready.' }

function Read-BackupSecret([string]$Label) {
    $secure = Read-Host $Label -AsSecureString
    $pointer = [IntPtr]::Zero
    try {
        $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
    } finally {
        if ($pointer -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }
        $secure.Dispose()
    }
}

$names = @('SUPABASE_DB_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'RESTIC_PASSWORD', 'BACKUP_RESTIC_BINARY')
$previous = @{}
foreach ($name in $names) { $previous[$name] = [Environment]::GetEnvironmentVariable($name, 'Process') }
$confirmation = $null
try {
    Write-Host 'Manual backup: no Cloudflare keys and no automatic uploads.'
    Write-Host 'Keep the encryption password in your password manager. It cannot be recovered from the backup.'
    $env:SUPABASE_DB_URL = Read-BackupSecret 'Supabase Session pooler connection URL, port 5432 (hidden)'
    $env:SUPABASE_SERVICE_ROLE_KEY = Read-BackupSecret 'Supabase legacy service_role key (hidden)'
    $env:RESTIC_PASSWORD = Read-BackupSecret 'Backup encryption password, at least 32 characters (hidden)'
    $confirmation = Read-BackupSecret 'Repeat encryption password (hidden)'
    if ($env:RESTIC_PASSWORD -cne $confirmation) { throw 'Encryption passwords do not match. Backup not started.' }
    $env:BACKUP_RESTIC_BINARY = $restic
    & node (Join-Path $PSScriptRoot 'manual.cjs')
    if ($LASTEXITCODE -ne 0) { throw 'Manual backup failed. Do not upload incomplete output. See the error above.' }
} finally {
    foreach ($name in $names) { [Environment]::SetEnvironmentVariable($name, $previous[$name], 'Process') }
    $confirmation = $null
}
