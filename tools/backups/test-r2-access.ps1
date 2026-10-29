param(
    [string]$Endpoint = 'https://dd1c9cccc478514ab9ff2d921d99e885.r2.cloudflarestorage.com/slovasofi-backups',
    [switch]$VerifyToken
)

$ErrorActionPreference = 'Stop'
if ($Endpoint -notmatch '^https://[a-f0-9]{32}\.r2\.cloudflarestorage\.com/[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$') {
    throw 'Use the HTTPS S3 API bucket endpoint from Cloudflare.'
}
if (-not (Get-Command curl.exe -ErrorAction SilentlyContinue)) {
    throw 'curl.exe is required. Run this script on a Windows computer with curl installed.'
}

function Read-HiddenValue([string]$Label) {
    $secure = Read-Host $Label -AsSecureString
    $pointer = [IntPtr]::Zero
    try {
        $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
    } finally {
        if ($pointer -ne [IntPtr]::Zero) {
            [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
        }
        $secure.Dispose()
    }
}

$accessKey = $null
$secretKey = $null
$config = $null
$response = $null
$apiToken = $null
$tokenBytes = $null
$tokenHash = $null
$expectedSecret = $null
try {
    Write-Host 'Read-only R2 test. Keys stay in this process and are not saved to files or environment variables.'
    $accessKey = Read-HiddenValue 'Access Key ID (hidden)'
    $secretKey = Read-HiddenValue 'Secret Access Key (hidden)'
    if ($accessKey -cnotmatch '^[a-fA-F0-9]{32}$' -or $secretKey -cnotmatch '^[a-fA-F0-9]{64}$') {
        throw 'Invalid key format. Use the Access Key ID and Secret Access Key fields, without spaces.'
    }
    if ($VerifyToken) {
        $apiToken = Read-HiddenValue 'Original API Token value (hidden; NOT Secret Access Key)'
        if ([string]::IsNullOrWhiteSpace($apiToken) -or $apiToken -match '\s') {
            throw 'API Token value must not be empty or contain whitespace.'
        }
        $sha256 = [Security.Cryptography.SHA256]::Create()
        try {
            $tokenBytes = [Text.Encoding]::UTF8.GetBytes($apiToken)
            $tokenHash = $sha256.ComputeHash($tokenBytes)
            $expectedSecret = [BitConverter]::ToString($tokenHash).Replace('-', '').ToLowerInvariant()
            if (-not [string]::Equals($secretKey, $expectedSecret, [StringComparison]::Ordinal)) {
                throw 'TOKEN_SECRET_MISMATCH: Secret Access Key is not the SHA-256 of this API Token value. No network request was made.'
            }
            Write-Host 'TOKEN_SECRET_MATCH: Secret Access Key matches this API token. This does not yet verify the Access Key ID or token status.'
        } finally {
            $sha256.Dispose()
            if ($tokenBytes) { [Array]::Clear($tokenBytes, 0, $tokenBytes.Length) }
            if ($tokenHash) { [Array]::Clear($tokenHash, 0, $tokenHash.Length) }
            $apiToken = $null
            $expectedSecret = $null
        }
    }
    # Send credentials through stdin, not process arguments or a temporary file.
    $config = @(
        'silent'
        'connect-timeout = 15'
        'max-time = 30'
        'proxy = ""'
        'aws-sigv4 = "aws:amz:auto:s3"'
        ('user = "{0}:{1}"' -f $accessKey, $secretKey)
        ('url = "{0}?list-type=2&max-keys=0"' -f $Endpoint)
        'write-out = "\nR2_HTTP_STATUS:%{http_code}"'
    ) -join "`n"
    $response = $config | & curl.exe -q --config - 2>$null
    $curlExit = $LASTEXITCODE
    if ($curlExit -ne 0) {
        throw "curl connection/client error ($curlExit). Check connectivity and curl version; no credentials were printed."
    }
    $result = $response -join "`n"
    $status = [regex]::Match($result, 'R2_HTTP_STATUS:(\d{3})$').Groups[1].Value
    if ($status -eq '200') {
        Write-Host 'SUCCESS: R2 accepted this credential pair and bucket access. No objects were downloaded or changed.' -ForegroundColor Green
        Write-Host 'If GitHub still fails, compare its two stored secrets with this exact pair.'
    } else {
        $code = [regex]::Match($result, '<Code>([A-Za-z0-9]+)</Code>').Groups[1].Value
        if (-not $code) { $code = 'UnrecognizedResponse' }
        Write-Host "FAILED: HTTP $status; R2 error: $code" -ForegroundColor Red
        if ($code -eq 'SignatureDoesNotMatch') {
            Write-Host 'An independent client also failed authentication. This test did not use GitHub secrets or AWS CLI.'
        }
        throw 'R2 access is not confirmed. No objects were changed.'
    }
} finally {
    $accessKey = $null
    $secretKey = $null
    $config = $null
    $response = $null
    $result = $null
    $apiToken = $null
    $expectedSecret = $null
}
