<#
.SYNOPSIS
    Compile et lance un exercice avec les bons drapeaux, sans avoir à les retaper.

.DESCRIPTION
    Volontairement un script PowerShell et PAS un Makefile : écrire le Makefile est
    l'exercice du module 10. Tant qu'on n'y est pas, ce script évite de recopier
    la ligne gcc vingt fois par jour — mais il l'AFFICHE avant de l'exécuter, pour
    qu'elle reste sous les yeux et finisse par être connue par cœur.

.PARAMETER Fichier
    Chemin du .c à compiler, relatif à exercices/ (ex. 05-tableaux/stats.c).

.PARAMETER San
    Ajoute -fsanitize=address,undefined (module 7). Indisponible avec le gcc de MSYS2, qui
    ne livre pas les bibliotheques d'execution (ni aucune autre chaine Windows de type GNU) :
    le script le detecte et te dit quoi faire.

.PARAMETER Wsl
    Compile et lance sous WSL 2 / Ubuntu AVEC les sanitizers, qui n'existent pas cote Windows.
    C'est la voie du module 7. Necessite gcc dans Ubuntu (le script te le dit sinon).

.PARAMETER NoRun
    Compile sans lancer le programme.

.EXAMPLE
    .\compile.ps1 01-compilation/hello.c
    .\compile.ps1 07-memoire/tableau_dyn.c -Wsl
#>
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Fichier,
    [switch]$San,
    [switch]$Wsl,
    [switch]$NoRun
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path $Fichier)) {
    Write-Host "Fichier introuvable : $Fichier" -ForegroundColor Red
    exit 1
}

# -Wsl : on delegue tout a Ubuntu. wsl.exe traduit le repertoire courant (C:\... -> /mnt/c/...),
# donc les chemins RELATIFS passent tels quels. Binaire sans .exe pour ne pas ecraser celui de
# Windows dans bin/.
if ($Wsl) {
    if (-not (Get-Command wsl.exe -ErrorAction SilentlyContinue)) {
        Write-Host "WSL n'est pas installe. Voir la section Chaine d'outils du README." -ForegroundColor Red
        exit 1
    }

    $gccWsl = & wsl.exe -d Ubuntu which gcc
    if ([string]::IsNullOrWhiteSpace($gccWsl)) {
        Write-Host "Ubuntu est la, mais sans compilateur. Une seule commande a passer :" -ForegroundColor Yellow
        Write-Host "  wsl -d Ubuntu -u root -- apt update" -ForegroundColor Cyan
        Write-Host "  wsl -d Ubuntu -u root -- apt install -y build-essential gdb valgrind" -ForegroundColor Cyan
        Write-Host "  (-u root : aucun mot de passe Linux demande)" -ForegroundColor DarkGray
        exit 1
    }

    $nomWsl = [System.IO.Path]::GetFileNameWithoutExtension($Fichier)
    $drapeauxWsl = @('-Wall', '-Wextra', '-std=c17', '-g', '-O0', '-fsanitize=address,undefined')
    Write-Host "wsl: gcc $($drapeauxWsl -join ' ') $Fichier -o bin/$nomWsl" -ForegroundColor DarkGray

    & wsl.exe -d Ubuntu -- gcc @drapeauxWsl $Fichier -o "bin/$nomWsl"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`nEchec de la compilation. Lis la PREMIERE erreur, et la ligne au-dessus." -ForegroundColor Red
        exit $LASTEXITCODE
    }
    Write-Host "Compile (WSL, sanitizers actifs) -> bin/$nomWsl" -ForegroundColor Green

    if (-not $NoRun) {
        Write-Host "--- sortie du programme ---" -ForegroundColor DarkGray
        & wsl.exe -d Ubuntu -- "./bin/$nomWsl"
        Write-Host "--- code de retour : $LASTEXITCODE ---" -ForegroundColor DarkGray
    }
    exit 0
}

if (-not (Get-Command gcc -ErrorAction SilentlyContinue)) {
    Write-Host "gcc est introuvable dans le PATH." -ForegroundColor Red
    Write-Host "Voir la section Chaine d'outils du README, a la racine du depot."
    exit 1
}

$nom = [System.IO.Path]::GetFileNameWithoutExtension($Fichier)
$binDir = Join-Path $PSScriptRoot 'bin'
if (-not (Test-Path $binDir)) { New-Item -ItemType Directory $binDir | Out-Null }
$sortie = Join-Path $binDir "$nom.exe"

# -Wall -Wextra : non negociable des le module 1. -g : indispensable a gdb (module 12).
# -O0 : sans optimisation, les lignes affichees par gdb correspondent au source.
$drapeaux = @('-Wall', '-Wextra', '-std=c17', '-g', '-O0')
if ($San) {
    # MinGW-w64 ne fournit pas libasan/libubsan : gcc ACCEPTE l'option, puis l'edition de
    # liens echoue sur un « cannot find -lasan » qui n'aide personne. On teste avant de
    # compiler : -print-file-name renvoie un CHEMIN si la bibliotheque existe, et le nom nu
    # sinon. Test-Path tranche les deux cas sans dependre de la forme exacte du retour.
    $asan = & gcc '-print-file-name=libasan.a'
    if (-not (Test-Path -LiteralPath $asan)) {
        Write-Host "Sanitizers indisponibles avec ce gcc (libasan absente de MinGW-w64)." -ForegroundColor Yellow
        Write-Host "Aucune chaine Windows native ne les fournit : relance avec -Wsl." -ForegroundColor Cyan
        Write-Host "Compilation poursuivie SANS sanitizers.`n" -ForegroundColor Yellow
    }
    else {
        $drapeaux += '-fsanitize=address,undefined'
    }
}

$commande = "gcc $($drapeaux -join ' ') $Fichier -o $sortie"
Write-Host $commande -ForegroundColor DarkGray

& gcc @drapeaux $Fichier -o $sortie

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nEchec de la compilation. Lis la PREMIERE erreur, et la ligne au-dessus." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Compile -> $sortie" -ForegroundColor Green

if (-not $NoRun) {
    Write-Host "--- sortie du programme ---" -ForegroundColor DarkGray
    & $sortie
    Write-Host "--- code de retour : $LASTEXITCODE ---" -ForegroundColor DarkGray
}
