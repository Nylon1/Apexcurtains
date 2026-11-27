[CmdletBinding()]
param(
    [Parameter(Mandatory)][datetimeoffset]$Since,
    [Parameter(Mandatory)][datetimeoffset]$Until
)
$ErrorActionPreference = 'Stop'
if ($Until -le $Since -or $Until -gt [datetimeoffset]::UtcNow) { throw 'Choose a completed reporting interval.' }
$paths = @('guided-start', 'planner-start', 'guided-complete', 'planner-complete')
$countPaths = ($paths | ForEach-Object { "request_path eq '/api/enquiry-count/$_'" }) -join ' or '
$filter = "(($countPaths) and http_status eq 204 and request_method eq 'POST') or (request_path eq '/api/send-lead' and http_status eq 200 and request_method eq 'POST') or (request_path eq '/' and http_status eq 200 and request_method eq 'GET')"
$cli = if ($IsWindows -or $env:OS -eq 'Windows_NT') { 'vercel.cmd' } else { 'vercel' }
$result = & $cli metrics vercel.request.count --project apexcurtains-43nc --scope hamzas-projects-4ef62f35 --prod --since $Since.UtcDateTime.ToString('o') --until $Until.UtcDateTime.ToString('o') --group-by request_path --filter $filter --limit 6 --json
if ($LASTEXITCODE -ne 0) { throw 'Vercel could not retrieve this reporting interval.' }
$metrics = ($result -join [Environment]::NewLine) | ConvertFrom-Json
if (-not $metrics.query -or $null -eq $metrics.summary) { throw 'Incomplete Vercel metrics response.' }
$totals = @{}
foreach ($row in $metrics.summary) { $totals[$row.request_path] = [long]$row.vercel_request_count_sum }
if (-not $totals.ContainsKey('/')) { throw 'No successful homepage request confirms coverage for this interval. Leave the counts unverified.' }
[pscustomobject]@{
    FromUTC = $Since.UtcDateTime.ToString('u')
    ToUTC = $Until.UtcDateTime.ToString('u')
    GuidedStarts = [long]$totals['/api/enquiry-count/guided-start']
    PlannerStarts = [long]$totals['/api/enquiry-count/planner-start']
    GuidedConsentedCompletions = [long]$totals['/api/enquiry-count/guided-complete']
    PlannerConsentedCompletions = [long]$totals['/api/enquiry-count/planner-complete']
    AcceptedSubmissions = [long]$totals['/api/send-lead']
}
