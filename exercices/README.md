# Exercices

Un dossier par module du parcours. **C'est ici que se passe l'apprentissage** — le site
(`pnpm dev`) ne fait que dire quoi coder et signaler les pièges.

## Règle du dossier

Le seul fichier C fourni est `00-verification/test-installation.c`, et il ne sert qu'à
vérifier la chaîne d'outils. **Aucun exercice n'a de corrigé, volontairement.** Un exercice
lu, compris et non tapé compte comme non fait ; un exercice résolu en collant du code reçu
n'apprend rien. Le blocage, puis la sortie du blocage, sont l'apprentissage lui-même.

## Compiler

Tant que le module 10 (Makefile) n'est pas atteint :

```powershell
cd exercices
.\compile.ps1 01-compilation/hello.c          # compile + lance
.\compile.ps1 07-memoire/tableau_dyn.c -Wsl   # via Ubuntu, sanitizers actifs (module 7)
.\compile.ps1 05-tableaux/stats.c -NoRun      # compile seulement
```

Le script affiche la commande `gcc` avant de la lancer : lis-la à chaque fois, elle doit
finir par être connue par cœur. À la main, c'est :

```powershell
gcc -Wall -Wextra -std=c17 -g -O0 mon_fichier.c -o bin/mon_fichier.exe
.\bin\mon_fichier.exe
```

À partir du module 10, on remplace ce script par un vrai `Makefile` — que tu écris toi-même.

## Drapeaux, et pourquoi

| Drapeau                        | Rôle                                                                  | À partir de |
| ------------------------------ | --------------------------------------------------------------------- | ----------- |
| `-Wall -Wextra`                | Signale le code douteux qui compile quand même. Zéro warning toléré.  | Module 1    |
| `-std=c17`                     | Fixe la version du langage : mêmes règles qu'ailleurs.                | Module 1    |
| `-g`                           | Garde les infos de débogage : sans lui, gdb ne montre pas tes lignes. | Module 1    |
| `-O0`                          | Pas d'optimisation : ce que gdb affiche correspond au source.         | Module 1    |
| `-fsanitize=address,undefined` | Attrape débordements, fuites, use-after-free, à la ligne près.        | Module 7    |

> ⚠ **Les sanitizers n'existent pas côté Windows** : MinGW-w64 ne livre pas leurs bibliothèques
> d'exécution, et l'édition de liens échoue sur « cannot find -lasan ». Ni clang de MSYS2 ni
> w64devkit n'y changent quoi que ce soit — elles ne sont portées que sur Linux, macOS et MSVC.
>
> D'où **`-Wsl`**, qui délègue la compilation à Ubuntu avec les sanitizers actifs. C'est déjà
> installé et vérifié sur cette machine ; pour le remonter ailleurs, voir la section « Chaîne
> d'outils » du README à la racine.
>
> `-San` reste utilisable côté Windows : il détecte l'absence des bibliothèques, te le dit et
> compile sans. Rien à faire avant le module 7.

## Convention de nommage

Les fichiers attendus sont donnés par chaque module du site (`exercices/05-tableaux/stats.c`,
etc.). Garde ces noms : les modules suivants y renvoient (le carnet du module 8 devient le
carnet CSV du module 9, puis le projet multi-fichiers du module 10).

`bin/` contient les exécutables produits — jamais versionné (cf. `.gitignore`).
