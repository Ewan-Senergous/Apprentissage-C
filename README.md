# Apprendre le C depuis zéro

Parcours guidé pour apprendre le langage C sans aucun prérequis : **13 modules, ~90 heures**,
dans un ordre imposé par les dépendances réelles du langage (chaque module ne suppose acquis
que les précédents).

Le dépôt contient deux choses :

- **le parcours** — un petit site SvelteKit qui dit quoi apprendre, dans quel ordre, avec les
  pièges annoncés à l'avance et un critère de validation par notion ;
- **l'espace de travail** — `exercices/`, où l'on écrit le C soi-même. Aucun corrigé n'est
  fourni, c'est délibéré.

## Démarrer

```powershell
pnpm install
pnpm dev          # http://localhost:5173
```

Puis, dans l'ordre : la page **Méthode** (comment travailler), et le **module 1**. La chaîne
d'outils est déjà en place — voir « Chaîne d'outils » plus bas si tu dois la remonter ailleurs.

## Chaîne d'outils

Tout est installé et vérifié sur cette machine. Cette section est la **référence de remontage** :
elle sert le jour où tu changes de poste, où quelqu'un clone le dépôt, ou où le PATH casse.

| Outil                               | Rôle                             | Où                   |
| ----------------------------------- | -------------------------------- | -------------------- |
| Node 22 + pnpm                      | le site du parcours              | Windows              |
| gcc 16.1 · gdb 17.2 · make 4.4      | compiler, déboguer, automatiser  | MSYS2 UCRT64         |
| gcc 13.3 · gdb 15.1 · valgrind 3.22 | ASan, UBSan, valgrind (module 7) | WSL 2 / Ubuntu 24.04 |

Vérification, à tout moment — chaque commande doit afficher une version :

```powershell
gcc --version ; gdb --version ; make --version
wsl -d Ubuntu -- gcc --version
```

### Remonter la chaîne Windows

```powershell
winget install --id MSYS2.MSYS2 -e
& C:\msys64\usr\bin\bash.exe -lc "pacman -S --needed --noconfirm mingw-w64-ucrt-x86_64-gcc mingw-w64-ucrt-x86_64-gdb mingw-w64-ucrt-x86_64-make"
[Environment]::SetEnvironmentVariable('Path', 'C:\msys64\ucrt64\bin;' + [Environment]::GetEnvironmentVariable('Path','User'), 'User')
Copy-Item C:\msys64\ucrt64\bin\mingw32-make.exe C:\msys64\ucrt64\bin\make.exe
```

Quatre pièges, tous rencontrés pour de vrai :

- le préfixe **`mingw-w64-ucrt-x86_64-`** est obligatoire sur les **trois** paquets. Le paquet
  `make` tout court appartient à l'environnement MSYS (`usr/bin`), qui n'est pas dans le PATH ;
- le paquet mingw installe `mingw32-make.exe`, d'où la copie sous le nom `make.exe` — on garde
  les deux, CMake et l'extension makefile-tools cherchent le premier ;
- **ne jamais mettre `usr/bin` dans le PATH** : ses `find.exe` et `sort.exe` masqueraient les
  commandes Windows du même nom ;
- **`C:\msys64\ucrt64\bin` doit passer AVANT les autres entrées du PATH** — d'où le
  préfixe ci-dessus, et surtout pas un ajout en queue. PostgreSQL et MySQL livrent leurs
  propres `libwinpthread-1.dll`, `libzstd.dll`, `zlib1.dll` et `libiconv-2.dll` ; si leur
  dossier est trouvé en premier, `cc1.exe` charge ces DLL-là et meurt sur `0xC0000139`
  (_entry point not found_) **sans afficher une seule ligne**. Symptôme trompeur :
  `gcc --version` répond normalement — le pilote va bien, c'est le compilateur derrière lui
  qui ne démarre pas. Vérifier l'ordre avec `$env:Path -split ';'`.

### Remonter la chaîne WSL

```powershell
wsl --install -d Ubuntu
wsl -d Ubuntu -u root -- apt update
wsl -d Ubuntu -u root -- apt install -y build-essential gdb valgrind
```

`-u root` évite `sudo`, donc aucun mot de passe Linux n'est demandé : c'est Windows qui atteste
que la distribution t'appartient. (Pour redéfinir un mot de passe oublié, même principe :
`wsl -d Ubuntu -u root passwd <utilisateur>`.)

### Pourquoi deux chaînes

Les sanitizers **n'existent sur aucune chaîne Windows de type GNU** — ni MinGW-w64, ni
w64devkit, ni le clang de MSYS2, dont le paquet `compiler-rt` ne contient aucun
`libclang_rt.asan` (vérifié). La bibliothèque d'exécution n'est portée que sur Linux, macOS et
MSVC. `gcc` accepte l'option puis l'éditeur de liens échoue sur `cannot find -lasan`.

D'où la répartition :

| Commande                       | Chaîne               | Quand                        |
| ------------------------------ | -------------------- | ---------------------------- |
| `.\compile.ps1 fichier.c`      | MSYS2, natif Windows | tous les jours               |
| `.\compile.ps1 fichier.c -Wsl` | Ubuntu + ASan/UBSan  | module 7, traquer les fuites |

Les deux se lancent depuis PowerShell, sans changer de terminal.

### Éditeur

VS Code, avec l'extension **C/C++** de Microsoft (coloration, complétion, débogage). Le fichier
`.vscode/settings.json` du dépôt règle déjà le reste : tabulations réelles dans les `Makefile`
(sinon make répond « missing separator » au module 10) et IntelliSense pointée sur le gcc de
MSYS2 (sinon `#include <stdio.h>` est souligné en rouge alors que la compilation passe).

À éviter pour débuter : les **compilateurs en ligne** (ils cachent la compilation, qui est
justement à apprendre), **Code::Blocks / Dev-C++** (gcc souvent très ancien), et **MSVC**, bon
compilateur mais dont les options et les messages ne ressemblent à rien de ce que tu liras
ailleurs.

## Structure

```
src/                       le site du parcours
  lib/data/curriculum.ts   les 13 modules — source unique du contenu
  lib/data/methode.ts      la méthode de travail
exercices/                 TON code C, un dossier par module
  compile.ps1              compile avec les bons drapeaux (jusqu'au module 10)
  00-verification/         le seul fichier .c fourni : test de la chaîne d'outils
JOURNAL.md                 journal de bord, trois lignes par séance
CLAUDE.md                  instructions agents — dont la règle « ne pas faire les exercices »
```

## Le principe

Trois choses font la différence, et elles sont détaillées sur la page Méthode :

1. **Le clavier avant les yeux.** Un exercice compris mais non tapé compte comme non fait.
2. **`-Wall -Wextra` dès le premier programme.** En C, un programme faux compile très bien ;
   les warnings sont la seule relecture gratuite que tu auras.
3. **La règle des 20 minutes.** Bloqué ? 20 minutes seul, puis demande une piste — jamais la
   solution. Y compris à un assistant IA : `CLAUDE.md` le configure pour refuser d'écrire le
   code des exercices.

## Progression

Les critères de validation cochés sont stockés dans le `localStorage` du navigateur. Rien
n'est envoyé nulle part, et rien n'est partagé entre deux navigateurs.
