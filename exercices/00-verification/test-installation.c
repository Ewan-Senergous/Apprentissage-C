/*
 * Le SEUL fichier C fourni du dépôt : il ne sert qu'à vérifier que la chaîne d'outils
 * fonctionne (cf. README, section Chaîne d'outils). Tous les autres exercices sont à
 * écrire soi-même —
 * le parcours ne fournit pas de solutions, c'est délibéré.
 *
 *   gcc -Wall -Wextra -std=c17 -g 00-verification/test-installation.c -o bin/test.exe
 *   ./bin/test.exe
 */

#include <stdio.h>
#include <limits.h>

int main(void)
{
    printf("Bonjour, C.\n");
    printf("Compilateur operationnel.\n\n");

    printf("sizeof(char)   = %zu octet\n",  sizeof(char));
    printf("sizeof(int)    = %zu octets\n", sizeof(int));
    printf("sizeof(double) = %zu octets\n", sizeof(double));
    printf("sizeof(void *) = %zu octets  (taille d'une adresse)\n", sizeof(void *));
    printf("INT_MAX        = %d\n", INT_MAX);

    return 0;
}
