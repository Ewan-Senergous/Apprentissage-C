/**
 * SOURCE UNIQUE du parcours. Les pages (`/`, `/module/[slug]`) ne font que RENDRE ce fichier :
 * aucun contenu pédagogique n'est écrit en dur dans un `.svelte`. Ajouter/déplacer un module =
 * éditer ce tableau, la home, la progression et les pages de détail suivent automatiquement.
 *
 * Ordre = dépendances réelles, pas thématique : chaque module ne suppose acquis QUE les
 * précédents. C'est pourquoi les pointeurs (M6) arrivent après les tableaux (M5) — on ne peut
 * pas expliquer `tab[i] == *(tab + i)` avant d'avoir manipulé un tableau.
 */

export type PhaseId = 1 | 2 | 3;

export type Phase = {
	id: PhaseId;
	titre: string;
	sousTitre: string;
	but: string;
	couleur: string;
};

export type Niveau = 'guidé' | 'seul' | 'défi';

export type Exercice = {
	titre: string;
	enonce: string;
	niveau: Niveau;
	fichier: string;
};

export type Module = {
	slug: string;
	num: number;
	phase: PhaseId;
	titre: string;
	accroche: string;
	duree: string;
	objectif: string;
	notions: { nom: string; detail: string }[];
	pieges: { titre: string; detail: string }[];
	exercices: Exercice[];
	checkpoint: string[];
	snippet?: { titre: string; code: string; note?: string };
};

export const PHASES: Phase[] = [
	{
		id: 1,
		titre: 'Fondations',
		sousTitre: 'Modules 1 à 4',
		but: "Écrire, compiler et faire tourner un programme qui calcule quelque chose. Rien d'exotique : c'est la base commune à tous les langages, apprise avec la rigueur du C.",
		couleur: 'var(--color-phase-1)'
	},
	{
		id: 2,
		titre: 'Le cœur du C',
		sousTitre: 'Modules 5 à 8',
		but: "La mémoire. C'est CE qui distingue le C des autres langages, et la seule partie où il faut vraiment ralentir. Un mois passé ici vaut mieux que trois mois de survol.",
		couleur: 'var(--color-phase-2)'
	},
	{
		id: 3,
		titre: 'Programmes réels',
		sousTitre: 'Modules 9 à 13',
		but: 'Sortir du fichier unique : fichiers, compilation séparée, structures de données, débogage. À la fin, un vrai projet livrable.',
		couleur: 'var(--color-phase-3)'
	}
];

export const MODULES: Module[] = [
	{
		slug: 'chaine-de-compilation',
		num: 1,
		phase: 1,
		titre: 'Compiler son premier programme',
		accroche: 'Comprendre ce qui se passe entre ton .c et l\u2019exécutable.',
		duree: '3 jours · ~4 h',
		objectif:
			'Tu écris un programme dans un fichier, tu le compiles en ligne de commande, tu le lances, et tu sais lire une erreur de compilation sans paniquer.',
		notions: [
			{
				nom: 'Le C est compilé, pas interprété',
				detail:
					"Contrairement à Python ou JS, ton code n'est pas exécuté tel quel : gcc le traduit en instructions machine une fois pour toutes. Le prix : la moindre faute bloque AVANT l'exécution. L'avantage : le compilateur attrape des bugs à ta place — d'où l'obsession des warnings ci-dessous."
			},
			{
				nom: 'Les 4 étapes de gcc',
				detail:
					"Préprocesseur (colle les #include, remplace les #define) → compilation (.c → assembleur) → assemblage (→ .o, code machine) → édition de liens (colle tes .o + la bibliothèque standard → .exe). Savoir ça sert VRAIMENT : « undefined reference to printf » n'est pas une erreur de syntaxe, c'est l'éditeur de liens."
			},
			{
				nom: 'La structure minimale',
				detail:
					"#include <stdio.h> déclare printf ; int main(void) est le point d'entrée, c'est CETTE fonction que le système appelle ; return 0 signale que tout s'est bien passé, et le shell peut lire ce code."
			},
			{
				nom: 'Les warnings ne sont pas optionnels',
				detail:
					"Compile TOUJOURS avec -Wall -Wextra. En C, un programme qui compile sans erreur peut être totalement faux ; les warnings sont l'endroit où le compilateur te dit « ça va mal finir ». Traite-les comme des erreurs."
			}
		],
		pieges: [
			{
				titre: 'Le point-virgule manquant est signalé à la ligne SUIVANTE',
				detail:
					"gcc indique où il a compris qu'il y avait un problème, pas où tu l'as fait. Erreur à la ligne 12 ? Regarde la 11 d'abord."
			},
			{
				titre: 'Lire la PREMIÈRE erreur, pas la dernière',
				detail:
					'Une faute en cascade en produit 40. Corrige la première, recompile. Ne lis jamais les 40.'
			},
			{
				titre: '#include <stdio.h> oublié',
				detail:
					"Le programme peut compiler quand même, avec un warning « implicit declaration of function printf », et marcher par chance. Ce n'est pas une chance sur laquelle bâtir."
			}
		],
		snippet: {
			titre: 'Le squelette, à taper de mémoire chaque jour de la semaine',
			code: `#include <stdio.h>

int main(void)
{
    printf("Bonjour, C.\\n");
    return 0;
}`,
			note: 'Compilation : gcc -Wall -Wextra -std=c17 -g hello.c -o hello.exe puis ./hello.exe'
		},
		exercices: [
			{
				titre: 'Hello, compilé à la main',
				enonce:
					"Tape le squelette ci-dessus SANS copier-coller, compile-le, lance-le. Puis casse-le volontairement de 3 façons (enlève le point-virgule, enlève l'include, écris Main au lieu de main) et NOTE le message d'erreur exact de chacune dans ton carnet.",
				niveau: 'guidé',
				fichier: 'exercices/01-compilation/hello.c'
			},
			{
				titre: 'Carte de visite',
				enonce:
					'Un programme qui affiche ton nom, ton objectif et la date du jour sur 3 lignes, avec un cadre en caractères ASCII autour.',
				niveau: 'seul',
				fichier: 'exercices/01-compilation/carte.c'
			},
			{
				titre: 'Lire le code de retour',
				enonce:
					'Fais renvoyer 3 par main. Lance le programme puis affiche son code de sortie ($LASTEXITCODE en PowerShell, echo $? en bash). Explique par écrit à quoi ça sert.',
				niveau: 'défi',
				fichier: 'exercices/01-compilation/retour.c'
			}
		],
		checkpoint: [
			'Je tape le squelette complet de mémoire, sans modèle',
			'Je compile avec -Wall -Wextra sans réfléchir à la commande',
			'Je sais dire ce que fait #include et ce que fait return 0',
			'Devant une erreur, je regarde la PREMIÈRE et la ligne du dessus'
		]
	},
	{
		slug: 'types-et-entrees-sorties',
		num: 2,
		phase: 1,
		titre: 'Variables, types et affichage',
		accroche: 'En C, une variable a une taille en octets. Tout part de là.',
		duree: '4 jours · ~5 h',
		objectif:
			'Tu déclares le bon type pour une donnée, tu affiches proprement avec printf, tu lis une saisie utilisateur, et tu sais pourquoi 7 / 2 vaut 3.',
		notions: [
			{
				nom: 'Les types de base et leur TAILLE',
				detail:
					"char (1 octet), int (4 en pratique), long, float (4), double (8). Écris un programme qui affiche sizeof(int) et compagnie : en C la taille n'est pas un détail théorique, elle détermine ce qui rentre dans la variable."
			},
			{
				nom: 'printf et ses formats',
				detail:
					'%d int · %f float/double · %c char · %s chaîne · %p adresse · %zu sizeof. Le format doit correspondre au type : printf("%d", 3.5) n\u2019affiche pas 3.5, il affiche n\u2019importe quoi. C\u2019est un des rares endroits où le compilateur t\u2019aide, à condition d\u2019avoir mis -Wall.'
			},
			{
				nom: 'Division entière et conversions',
				detail:
					"7 / 2 vaut 3 parce que les deux opérandes sont des int : le C ne devine pas que tu voulais un réel. 7 / 2.0 vaut 3.5, (float)7 / 2 aussi. Le modulo % ne marche qu'entre entiers."
			},
			{
				nom: 'Débordement (overflow)',
				detail:
					'Un int monte à ~2,1 milliards. Au-delà il ne plante pas : il repart en négatif, sans aucun message. À connaître avant de calculer des factorielles.'
			},
			{
				nom: 'scanf et ses pièges',
				detail:
					'scanf("%d", &age) — le & est obligatoire : on donne l\u2019ADRESSE où écrire. C\u2019est ton premier contact avec les pointeurs (module 6). Vérifie toujours la valeur de retour : if (scanf("%d", &age) != 1) { /* saisie invalide */ }.'
			}
		],
		pieges: [
			{
				titre: 'Variable non initialisée',
				detail:
					'int x; puis printf("%d", x) n\u2019affiche pas 0 : il affiche ce qui traînait dans cette case mémoire. Initialise TOUJOURS à la déclaration : int x = 0;.'
			},
			{
				titre: 'Le & oublié dans scanf',
				detail:
					'scanf("%d", age) compile (avec un warning) et corrompt la mémoire à l\u2019exécution. C\u2019est le crash n°1 du débutant.'
			},
			{
				titre: 'Comparer des float avec ==',
				detail:
					'0.1 + 0.2 == 0.3 est faux en C comme partout ailleurs. Compare une différence absolue à un epsilon.'
			}
		],
		snippet: {
			titre: 'Ce que « tout est une taille » veut dire',
			code: `#include <stdio.h>

int main(void)
{
    int    n = 7;
    double x = 7.0;

    printf("int    : %zu octets, 7/2 = %d\\n", sizeof(int), n / 2);
    printf("double : %zu octets, 7/2 = %f\\n", sizeof(double), x / 2);
    return 0;
}`,
			note: 'Sortie : 3 côté int, 3.500000 côté double. Le type décide du résultat.'
		},
		exercices: [
			{
				titre: 'Inventaire des types',
				enonce:
					'Affiche la taille (sizeof) de char, int, long, float, double, et la valeur maximale d\u2019un int (INT_MAX, dans <limits.h>). Puis ajoute 1 à INT_MAX et observe.',
				niveau: 'guidé',
				fichier: 'exercices/02-types/tailles.c'
			},
			{
				titre: 'Convertisseur',
				enonce:
					"Demande une température en Celsius (float) et affiche la conversion en Fahrenheit avec 1 décimale (%.1f). Gère le cas où l'utilisateur tape autre chose qu'un nombre.",
				niveau: 'seul',
				fichier: 'exercices/02-types/temperature.c'
			},
			{
				titre: 'Décomposition en monnaie',
				enonce:
					'Saisis un montant en centimes (int) et affiche le nombre de billets/pièces de 500, 200, 100, 50, 20, 10, 5, 2, 1. Uniquement avec / et %.',
				niveau: 'défi',
				fichier: 'exercices/02-types/monnaie.c'
			}
		],
		checkpoint: [
			'Je choisis int / double / char sans hésiter selon la donnée',
			'Je connais %d %f %c %s %zu de tête',
			'Je sais expliquer pourquoi 7/2 = 3 et comment obtenir 3.5',
			'Je vérifie le retour de scanf'
		]
	},
	{
		slug: 'conditions-et-boucles',
		num: 3,
		phase: 1,
		titre: 'Conditions et boucles',
		accroche: 'Le contrôle du flux : peu de syntaxe, beaucoup de rigueur.',
		duree: '4 jours · ~5 h',
		objectif:
			'Tu traduis un énoncé en conditions et en boucles justes, y compris sur les bornes (le fameux décalage de 1).',
		notions: [
			{
				nom: 'if / else if / else',
				detail:
					"Rien d'exotique. Attention : le C n'a pas de type booléen d'origine — 0 est faux, TOUT le reste est vrai. if (x) se lit « si x est non nul »."
			},
			{
				nom: 'Opérateurs logiques et court-circuit',
				detail:
					"&&, ||, !. Le court-circuit n'est pas une optimisation, c'est une garantie du langage : dans if (p != NULL && p->valeur > 0), la partie droite n'est PAS évaluée si p vaut NULL. Tu t'en serviras massivement au module 6."
			},
			{
				nom: 'while, do…while, for',
				detail:
					'for (int i = 0; i < n; i++) est la forme canonique : initialisation ; condition ; incrément. do…while teste APRÈS : le corps s\u2019exécute au moins une fois, idéal pour un menu.'
			},
			{
				nom: 'switch',
				detail:
					"Pour un aiguillage sur des valeurs entières ou char discrètes. Le break est obligatoire à chaque cas, sinon l'exécution tombe dans le cas suivant (fall-through). Ce n'est pas un bug du langage, c'est parfois voulu — mais chez toi ce sera un oubli."
			},
			{
				nom: 'break et continue',
				detail:
					"break sort de la boucle, continue passe à l'itération suivante. Utiles, mais une boucle avec 4 break est une boucle mal écrite."
			}
		],
		pieges: [
			{
				titre: '= au lieu de ==',
				detail:
					'if (x = 5) AFFECTE 5 à x et vaut toujours vrai. Le compilateur le signale avec -Wall (« suggest parentheses around assignment »). Encore une raison de compiler avec les warnings.'
			},
			{
				titre: 'Le point-virgule fantôme',
				detail:
					'for (int i = 0; i < 10; i++); — le ; final termine la boucle. Le bloc suivant s\u2019exécute UNE fois. Compile sans erreur.'
			},
			{
				titre: 'Erreur de bornes (off-by-one)',
				detail:
					'i <= n au lieu de i < n sur un tableau de n cases = lecture hors limites. À partir du module 5, cette faute ne provoque plus un affichage bizarre mais un crash — ou pire, pas de crash.'
			}
		],
		snippet: {
			titre: 'La forme canonique à ancrer',
			code: `for (int i = 0; i < n; i++) {
    /* i va de 0 à n-1 : exactement n tours */
}`,
			note: "En C on compte à partir de 0 et on s'arrête AVANT n. Toute autre forme doit se justifier."
		},
		exercices: [
			{
				titre: 'Table de multiplication',
				enonce:
					'Affiche la table de 1 à 10 sous forme de grille alignée (utilise %4d). Boucles imbriquées.',
				niveau: 'guidé',
				fichier: 'exercices/03-controle/table.c'
			},
			{
				titre: 'Devine le nombre',
				enonce:
					"Le programme tire un nombre entre 1 et 100 (rand() + srand(time(NULL))), l'utilisateur devine, le programme répond « plus grand / plus petit ». Compte les essais. do…while.",
				niveau: 'seul',
				fichier: 'exercices/03-controle/devine.c'
			},
			{
				titre: 'FizzBuzz + nombres premiers',
				enonce:
					'FizzBuzz de 1 à 100, puis affiche tous les nombres premiers inférieurs à 200 (double boucle, %). Sans tableau.',
				niveau: 'défi',
				fichier: 'exercices/03-controle/fizzbuzz.c'
			}
		],
		checkpoint: [
			"Une boucle for de 0 à n-1 sort sans que j'y pense",
			'Je sais quand choisir while, do…while ou for',
			'Je repère un = au lieu de == en relisant',
			"Je sais ce qu'est un fall-through de switch"
		]
	},
	{
		slug: 'fonctions',
		num: 4,
		phase: 1,
		titre: 'Fonctions et portée',
		accroche: 'Découper un programme, et comprendre que le C copie tout.',
		duree: '4 jours · ~5 h',
		objectif:
			"Tu écris des fonctions courtes avec prototype, tu sais ce qu'est le passage par valeur, et tu comprends pourquoi une fonction ne peut PAS encore modifier son argument.",
		notions: [
			{
				nom: 'Déclaration vs définition (le prototype)',
				detail:
					"Le compilateur lit ton fichier de haut en bas : il doit connaître une fonction AVANT son appel. Soit tu la définis plus haut, soit tu poses son prototype en haut du fichier : int somme(int a, int b);. C'est le fondement des fichiers .h du module 10."
			},
			{
				nom: 'Passage par valeur — TOUJOURS',
				detail:
					"En C, un argument est COPIÉ dans la fonction. Modifier a dans la fonction ne change rien chez l'appelant. Il n'y a aucune exception : les « passages par référence » du module 6 sont en réalité des copies… d'adresses."
			},
			{
				nom: 'Portée et durée de vie',
				detail:
					"Une variable déclarée dans un bloc { } n'existe que dedans et disparaît à la sortie. Une variable globale existe partout et tout le temps — et c'est presque toujours une mauvaise idée : deux fonctions qui la modifient donnent un bug impossible à situer."
			},
			{
				nom: 'void et le retour',
				detail:
					"void f(void) ne renvoie rien et ne prend rien. Écrire f() sans le void en paramètre a un sens différent en C historique (nombre d'arguments non spécifié) : prends l'habitude de (void)."
			},
			{
				nom: 'Récursion',
				detail:
					"Une fonction qui s'appelle elle-même. Il FAUT un cas d'arrêt, sinon la pile déborde. Utile pour comprendre la pile d'appels — que tu visualiseras au module 12 avec gdb."
			}
		],
		pieges: [
			{
				titre: "Croire qu'on a modifié le paramètre",
				detail:
					"void doubler(int x) { x = x * 2; } ne double rien. C'est LA source d'incompréhension avant les pointeurs. Écris cet exemple, observe, note-le."
			},
			{
				titre: "Renvoyer l'adresse d'une variable locale",
				detail:
					"La variable meurt à la sortie de la fonction ; l'adresse renvoyée pointe sur du vide. Le compilateur prévient (« function returns address of local variable ») — écoute-le. À revoir au module 7."
			},
			{
				titre: 'Fonctions fourre-tout',
				detail:
					"Une fonction = une responsabilité, idéalement moins de 30 lignes. Ce n'est pas de l'esthétique : une fonction courte se teste et se débogue, une fonction de 200 lignes non."
			}
		],
		snippet: {
			titre: 'La démonstration qui prépare le module 6',
			code: `#include <stdio.h>

void doubler(int x)      /* x est une COPIE */
{
    x = x * 2;
}

int main(void)
{
    int n = 5;
    doubler(n);
    printf("%d\\n", n);   /* affiche 5, pas 10 */
    return 0;
}`,
			note: 'Tant que ce 5 te surprend, ne passe pas au module suivant. Quand il te paraît évident, tu es prêt pour les pointeurs.'
		},
		exercices: [
			{
				titre: 'Boîte à outils',
				enonce:
					'Écris et teste int max(int a, int b), int pgcd(int a, int b), int est_premier(int n), double moyenne(int a, int b). Prototypes en haut, définitions en bas, appels dans main.',
				niveau: 'guidé',
				fichier: 'exercices/04-fonctions/outils.c'
			},
			{
				titre: 'Menu interactif',
				enonce:
					'Un do…while qui affiche un menu (1 = calculer, 2 = aide, 0 = quitter) et appelle une fonction différente selon le choix. Chaque entrée du menu = une fonction.',
				niveau: 'seul',
				fichier: 'exercices/04-fonctions/menu.c'
			},
			{
				titre: 'Récursif vs itératif',
				enonce:
					'Écris factorielle et fibonacci en version récursive ET itérative. Chronomètre fibonacci(40) dans les deux versions et explique l\u2019écart par écrit.',
				niveau: 'défi',
				fichier: 'exercices/04-fonctions/recursion.c'
			}
		],
		checkpoint: [
			'Je pose mes prototypes en haut du fichier',
			'Je sais expliquer pourquoi doubler(n) ne modifie pas n',
			'Mes fonctions font une seule chose',
			"Je sais reconnaître un cas d'arrêt manquant en récursion"
		]
	},
	{
		slug: 'tableaux-et-chaines',
		num: 5,
		phase: 2,
		titre: 'Tableaux et chaînes de caractères',
		accroche: "Une chaîne en C n'existe pas. C'est un tableau de char qui finit par un zéro.",
		duree: '1 semaine · ~7 h',
		objectif:
			"Tu manipules des tableaux 1D et 2D, tu comprends qu'une chaîne C est un tableau terminé par \\0, et tu utilises string.h sans déborder.",
		notions: [
			{
				nom: 'Tableau à taille fixe',
				detail:
					"int tab[10]; réserve 10 int consécutifs en mémoire. Les indices vont de 0 à 9. Le C ne vérifie AUCUNE borne à l'exécution : tab[42] compile et lit la mémoire du voisin."
			},
			{
				nom: "Le tableau n'est pas une valeur",
				detail:
					'On ne peut ni le copier (tab2 = tab1 est refusé), ni le comparer (tab1 == tab2 compare des adresses), ni le renvoyer. Une fonction qui reçoit un tableau reçoit en fait son adresse — seule entorse apparente au « tout est copié » du module 4, que le module 6 expliquera.'
			},
			{
				nom: 'La taille se perd',
				detail:
					'sizeof(tab) donne la taille totale DANS la fonction où le tableau est déclaré, mais pas dans une fonction qui le reçoit. Il faut donc TOUJOURS passer la taille en second paramètre : void afficher(int tab[], int n).'
			},
			{
				nom: 'La chaîne = tableau de char + \\0',
				detail:
					'char mot[] = "salut"; occupe 6 octets, pas 5 : le \\0 final marque la fin. Toutes les fonctions de <string.h> s\'arrêtent à ce zéro. Sans lui, elles lisent jusqu\'au crash.'
			},
			{
				nom: 'string.h',
				detail:
					'strlen (longueur SANS le \\0), strcpy, strcmp (0 = égales !), strcat, strchr. Préfère snprintf et les variantes bornées quand tu as le choix : les versions non bornées écrivent au-delà de ta case si la source est trop longue.'
			},
			{
				nom: 'Lire une ligne',
				detail:
					'Utilise fgets(buffer, sizeof buffer, stdin) — jamais gets, retiré du langage car faille de sécurité par construction. fgets garde le \\n : à retirer à la main.'
			}
		],
		pieges: [
			{
				titre: 'Le débordement de tampon',
				detail:
					"Écrire 20 caractères dans char buf[10] n'affiche aucune erreur : ça écrase ce qui suit en mémoire. Le programme peut planter 300 lignes plus loin, dans une fonction sans rapport. C'est la faute la plus coûteuse du C."
			},
			{
				titre: 'strlen vs sizeof',
				detail:
					'Sur char mot[20] = "salut" : sizeof(mot) = 20 (la boîte), strlen(mot) = 5 (le contenu). Confondre les deux, c\u2019est déborder.'
			},
			{
				titre: 'Comparer des chaînes avec ==',
				detail:
					'if (nom == "Ewan") compare deux ADRESSES et sera faux. Il faut strcmp(nom, "Ewan") == 0 — et note bien : strcmp renvoie 0 quand c\u2019est ÉGAL.'
			}
		],
		snippet: {
			titre: 'Le \\0 rendu visible',
			code: `#include <stdio.h>
#include <string.h>

int main(void)
{
    char mot[20] = "salut";

    printf("sizeof = %zu\\n", sizeof(mot));  /* 20 : la boite  */
    printf("strlen = %zu\\n", strlen(mot));  /*  5 : le contenu */

    for (size_t i = 0; i < 7; i++)
        printf("[%zu] = %d\\n", i, mot[i]);  /* mot[5] vaut 0   */

    return 0;
}`,
			note: "Fais tourner ça. Le 0 à l'indice 5, c'est toute la définition d'une chaîne en C."
		},
		exercices: [
			{
				titre: "Statistiques d'un tableau",
				enonce:
					"Un tableau de 10 int rempli en dur : calcule min, max, moyenne, et affiche-le à l'envers. Chaque calcul dans sa propre fonction prenant (int tab[], int n).",
				niveau: 'guidé',
				fichier: 'exercices/05-tableaux/stats.c'
			},
			{
				titre: 'Ma propre string.h',
				enonce:
					'Réécris mon_strlen, mon_strcpy, mon_strcmp, mon_strrev sans utiliser string.h. Compare tes résultats à ceux des vraies fonctions.',
				niveau: 'seul',
				fichier: 'exercices/05-tableaux/mes_chaines.c'
			},
			{
				titre: 'Palindrome et morpion',
				enonce:
					'1) Teste si une phrase saisie au clavier est un palindrome (ignore espaces et casse). 2) Une grille de morpion char grille[3][3] avec affichage et détection de victoire.',
				niveau: 'défi',
				fichier: 'exercices/05-tableaux/palindrome.c'
			}
		],
		checkpoint: [
			'Je passe systématiquement la taille avec le tableau',
			'Je sais dessiner « salut » en mémoire, case par case, avec le \\0',
			"J'utilise strcmp (== 0) et jamais == pour comparer des chaînes",
			'Je sais pourquoi fgets est préférable à scanf pour lire une ligne'
		]
	},
	{
		slug: 'pointeurs',
		num: 6,
		phase: 2,
		titre: 'Pointeurs',
		accroche: 'Le module pivot. Prends deux fois le temps prévu, ça reste rentable.',
		duree: '2 semaines · ~14 h',
		objectif:
			"Tu lis et écris n'importe quelle déclaration de pointeur simple, tu modifies une variable depuis une fonction, et tu vois le lien tableau ↔ pointeur.",
		notions: [
			{
				nom: 'Une variable a une adresse',
				detail:
					"Chaque variable occupe des octets à un endroit précis de la mémoire. &x donne cette adresse ; affiche-la avec %p. Tant que tu n'as pas VU des adresses s'afficher, les pointeurs restent abstraits."
			},
			{
				nom: 'Déclarer et déréférencer',
				detail:
					"int *p = &x; — p contient l'adresse de x. *p désigne LA VALEUR à cette adresse : lire *p lit x, écrire *p = 10 écrit dans x. L'étoile a deux rôles distincts (déclaration / déréférencement), et c'est la principale source de confusion."
			},
			{
				nom: 'Modifier depuis une fonction',
				detail:
					'Le C copie toujours. Mais si on lui copie une ADRESSE, la fonction peut atteindre l\u2019original : void doubler(int *x) { *x = *x * 2; } appelée avec doubler(&n). C\u2019est exactement ce que fait scanf("%d", &age) depuis le module 2.'
			},
			{
				nom: 'NULL',
				detail:
					"NULL veut dire « ne pointe sur rien ». Initialise tes pointeurs à NULL et teste avant de déréférencer : if (p != NULL). Déréférencer NULL provoque un crash immédiat (segmentation fault) — ce qui est la BONNE nouvelle : un crash franc vaut mieux qu'un pointeur pourri silencieux."
			},
			{
				nom: 'Tableau ↔ pointeur',
				detail:
					"Le nom d'un tableau s'utilise comme l'adresse de sa première case : tab[i] et *(tab + i) sont strictement équivalents. tab + 1 ne saute pas 1 octet mais sizeof(élément) octets : l'arithmétique de pointeurs est typée."
			},
			{
				nom: 'Lire une déclaration',
				detail:
					"const char *p (pointeur vers du char constant) n'est pas char * const p (pointeur constant vers du char). Règle de lecture : de l'intérieur vers l'extérieur, en partant du nom."
			}
		],
		pieges: [
			{
				titre: 'Le pointeur non initialisé',
				detail:
					'int *p; puis *p = 5; écrit à une adresse aléatoire. Parfois ça crashe, parfois ça corrompt silencieusement. Initialise à NULL, toujours.'
			},
			{
				titre: 'Confondre p et *p',
				detail:
					"p = 5 met 5 dans l'ADRESSE (catastrophe). *p = 5 met 5 dans la VALEUR pointée (ce que tu voulais). Relis chaque ligne en te demandant « adresse ou valeur ? »."
			},
			{
				titre: 'Croire que sizeof(pointeur) donne la taille du tableau',
				detail:
					"sizeof(p) vaut 8 — la taille d'une adresse sur un système 64 bits — quel que soit ce qui est pointé. D'où l'obligation, toujours, de transporter la taille séparément."
			}
		],
		snippet: {
			titre: 'Le module 4 réparé',
			code: `#include <stdio.h>

void doubler(int *x)      /* on copie l'ADRESSE */
{
    *x = *x * 2;          /* on ecrit a travers elle */
}

int main(void)
{
    int n = 5;
    printf("n vaut %d, il est en %p\\n", n, (void *)&n);
    doubler(&n);
    printf("n vaut %d\\n", n);   /* 10 */
    return 0;
}`,
			note: 'Dessine ça sur papier : une case « n » contenant 5, une case « x » contenant la flèche. Refais le dessin pour chaque exercice de ce module.'
		},
		exercices: [
			{
				titre: 'Voir la mémoire',
				enonce:
					"Déclare un int, un double, un char et un tableau de 5 int. Affiche l'adresse de chacun (%p) et l'adresse de chaque case du tableau. Vérifie l'écart entre deux cases consécutives et explique-le.",
				niveau: 'guidé',
				fichier: 'exercices/06-pointeurs/adresses.c'
			},
			{
				titre: 'Échange et retours multiples',
				enonce:
					'void echanger(int *a, int *b) qui permute deux variables. Puis void min_max(int tab[], int n, int *min, int *max) qui « renvoie » deux valeurs via des pointeurs de sortie.',
				niveau: 'seul',
				fichier: 'exercices/06-pointeurs/echange.c'
			},
			{
				titre: 'Parcours sans crochets',
				enonce:
					'Réécris tes fonctions de stats du module 5 sans AUCUN [] : uniquement *(p + i) ou un pointeur qu\u2019on incrémente. Puis mon_strlen avec un pointeur qui avance jusqu\u2019au \\0.',
				niveau: 'défi',
				fichier: 'exercices/06-pointeurs/arithmetique.c'
			}
		],
		checkpoint: [
			'Je dessine la mémoire (case, valeur, flèche) avant de coder',
			'Je sais dire, pour chaque ligne, si je manipule une adresse ou une valeur',
			'J\u2019écris une fonction qui modifie son argument sans hésiter',
			'tab[i] et *(tab + i) me semblent la même chose'
		]
	},
	{
		slug: 'memoire-dynamique',
		num: 7,
		phase: 2,
		titre: 'Mémoire dynamique',
		accroche: 'Demander de la mémoire, et surtout la rendre.',
		duree: '1 semaine · ~8 h',
		objectif:
			"Tu alloues un tableau dont la taille n'est connue qu'à l'exécution, tu libères tout ce que tu alloues, et tu détectes une fuite avec un outil.",
		notions: [
			{
				nom: 'Pile vs tas',
				detail:
					"La PILE : variables locales, taille connue à la compilation, libérées automatiquement à la sortie de la fonction, quelques Mo au total. Le TAS : malloc, taille libre décidée à l'exécution, vit jusqu'à ton free. Sache toujours où vit chacune de tes données."
			},
			{
				nom: 'malloc / free',
				detail:
					"int *tab = malloc(n * sizeof *tab); réserve n int et renvoie l'adresse du bloc. free(tab); le rend. Un malloc = un free, exactement un. Après free, mets tab = NULL : ça transforme un usage après libération (invisible) en crash franc (visible)."
			},
			{
				nom: 'Tester le retour de malloc',
				detail:
					"malloc renvoie NULL s'il n'y a plus de mémoire. if (tab == NULL) { return 1; } — deux lignes qui évitent un crash inexplicable."
			},
			{
				nom: 'calloc et realloc',
				detail:
					'calloc(n, taille) alloue ET met à zéro. realloc(p, nouvelle_taille) redimensionne — attention, il peut DÉPLACER le bloc : il faut réaffecter, et passer par une variable temporaire pour ne pas perdre l\u2019ancien pointeur si realloc échoue.'
			},
			{
				nom: 'Les trois fautes mortelles',
				detail:
					"Fuite (allouer sans libérer) · double free (libérer deux fois) · use-after-free (utiliser après libération). Les deux dernières corrompent l'allocateur et plantent AILLEURS que là où est le bug. D'où l'outillage ci-dessous, non négociable."
			},
			{
				nom: 'Les sanitizers, dès maintenant',
				detail:
					"Compilé avec -fsanitize=address,undefined -g, le programme t'annonce la fuite ou le débordement avec le numéro de ligne exact. C'est l'outil le plus rentable du parcours — mais ⚠ le gcc de MSYS2 ne le fournit PAS : les bibliothèques libasan/libubsan ne sont pas livrées avec MinGW-w64, et l'édition de liens échoue sur « cannot find -lasan ». Pour en disposer : WSL 2 + Ubuntu, qui donne gcc complet ET valgrind. Ni le clang de MSYS2 ni w64devkit n'y changent rien — la bibliothèque n'est portée sur aucune chaîne Windows de type GNU. Sur cette machine c'est déjà en place : `compile.ps1 -Wsl` compile et lance l'exercice sous Ubuntu avec les sanitizers actifs, sans quitter ton terminal. Sans sanitizer, ce module reste faisable — il demande juste d'apparier tes malloc/free à l'œil, ce que le module 12 (gdb) complète."
			}
		],
		pieges: [
			{
				titre: 'Oublier sizeof dans malloc',
				detail:
					'malloc(n) alloue n OCTETS, pas n entiers. Pour n int : malloc(n * sizeof(int)). La forme la plus sûre est malloc(n * sizeof *tab) — elle reste juste même si tu changes le type de tab.'
			},
			{
				titre: 'Renvoyer un pointeur vers la pile',
				detail:
					"Une fonction qui renvoie l'adresse d'un tableau local renvoie une adresse morte. Si une fonction doit fournir un bloc qui lui survit, il doit venir de malloc — et la doc doit dire QUI le libérera."
			},
			{
				titre: 'Perdre le pointeur original',
				detail:
					'tab = tab + 1; puis free(tab) ne libère pas ce que tu as alloué. Garde toujours le pointeur de départ intact et parcours avec une copie.'
			}
		],
		snippet: {
			titre: 'Le cycle complet, à ne jamais casser',
			code: `#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 1;

    int *tab = malloc(n * sizeof *tab);   /* 1. demander    */
    if (tab == NULL) return 1;            /* 2. verifier    */

    for (int i = 0; i < n; i++) tab[i] = i * i;
    for (int i = 0; i < n; i++) printf("%d ", tab[i]);

    free(tab);                            /* 3. rendre      */
    tab = NULL;                           /* 4. neutraliser */
    return 0;
}`,
			note: 'compile.ps1 -Wsl 07-memoire/tableau_dyn.c — puis retire le free et relance pour lire le rapport de fuite.'
		},
		exercices: [
			{
				titre: 'Tableau à taille saisie',
				enonce:
					'Demande n, alloue un tableau de n int, remplis-le, affiche min/max/moyenne, libère. Puis retire volontairement le free et lance sous sanitizer pour lire le rapport de fuite.',
				niveau: 'guidé',
				fichier: 'exercices/07-memoire/tableau_dyn.c'
			},
			{
				titre: 'Tableau qui grandit',
				enonce:
					"Lis des entiers jusqu'à ce que l'utilisateur tape 0, sans connaître leur nombre à l'avance : commence à 4 cases et double la capacité avec realloc quand c'est plein.",
				niveau: 'seul',
				fichier: 'exercices/07-memoire/tableau_croissant.c'
			},
			{
				titre: 'Tableau de chaînes',
				enonce:
					'Alloue un char ** de n chaînes, chacune allouée à la bonne longueur avec strlen + 1. Trie-les alphabétiquement en échangeant les POINTEURS (pas les copies), affiche, libère tout dans le bon ordre.',
				niveau: 'défi',
				fichier: 'exercices/07-memoire/tableau_chaines.c'
			}
		],
		checkpoint: [
			'Je sais dire pour chaque donnée si elle est sur la pile ou sur le tas',
			'Chaque malloc de mon code a son free, je peux les apparier des yeux',
			'Je teste le retour de malloc',
			'Je sais faire tourner un sanitizer sous WSL 2 et lire son rapport — ou, à défaut, apparier mes malloc/free ligne à ligne'
		]
	},
	{
		slug: 'structures',
		num: 8,
		phase: 2,
		titre: 'Structures, enum, typedef',
		accroche: 'Créer ses propres types, au lieu de trimballer 6 variables parallèles.',
		duree: '5 jours · ~6 h',
		objectif:
			'Tu modélises une entité métier avec une struct, tu la passes efficacement à des fonctions, et tu utilises enum plutôt que des nombres magiques.',
		notions: [
			{
				nom: 'struct',
				detail:
					'Regroupe des champs de types différents sous un nom : struct Contact { char nom[50]; int age; };. Accès avec . sur une valeur, avec -> sur un pointeur (c->age est un raccourci pour (*c).age).'
			},
			{
				nom: 'typedef',
				detail:
					"typedef struct Contact Contact; évite de réécrire struct partout. Convention courante : le type en PascalCase. Ne typedef PAS un pointeur (typedef Contact *ContactPtr) : ça cache l'étoile, donc l'indirection."
			},
			{
				nom: 'Passer une struct : par pointeur',
				detail:
					"Passer une struct par valeur la COPIE entièrement — une struct de 200 octets, c'est 200 octets copiés à chaque appel. Passe const Contact *c en lecture, Contact *c en écriture. Le const documente l'intention ET fait vérifier par le compilateur."
			},
			{
				nom: 'enum',
				detail:
					'typedef enum { EN_COURS, TERMINE, ANNULE } Statut; — des constantes entières nommées. Un switch sur un enum fait signaler par -Wall les cas oubliés : tu ajoutes une valeur, le compilateur te montre tous les endroits à mettre à jour.'
			},
			{
				nom: 'Tableau de structs',
				detail:
					"Contact carnet[100]; ou, mieux dès qu'on sait allouer, Contact *carnet = malloc(n * sizeof *carnet);. C'est la base du projet final."
			},
			{
				nom: 'union (culture générale)',
				detail:
					'Plusieurs champs qui partagent le MÊME espace mémoire : un seul est valide à la fois. Rare en application, courant en embarqué et dans les parseurs. Il suffit de savoir que ça existe.'
			}
		],
		pieges: [
			{
				titre: "Le point-virgule après l'accolade",
				detail:
					"struct Contact { ... }; — ce ; final est obligatoire. L'oublier produit une cascade d'erreurs incompréhensibles sur les lignes SUIVANTES."
			},
			{
				titre: 'Copier une struct qui contient un pointeur',
				detail:
					"b = a; copie le pointeur, pas ce qu'il pointe : les deux structs partagent alors la même zone, et le premier free casse la seconde. C'est le problème de la copie superficielle."
			},
			{
				titre: 'Comparer deux structs avec ==',
				detail:
					"Interdit par le langage. Il faut comparer champ par champ — et memcmp n'est pas fiable, à cause des octets de bourrage insérés par le compilateur pour l'alignement."
			}
		],
		snippet: {
			titre: 'Un type métier, comme dans un vrai programme',
			code: `#include <stdio.h>

typedef enum { ACTIF, ARCHIVE } Statut;

typedef struct {
    char   nom[50];
    int    age;
    Statut statut;
} Contact;

/* const : lecture seule, garantie par le compilateur */
void afficher(const Contact *c)
{
    printf("%-20s %3d  %s\\n", c->nom, c->age,
           c->statut == ACTIF ? "actif" : "archive");
}

int main(void)
{
    Contact c = { .nom = "Ewan", .age = 25, .statut = ACTIF };
    afficher(&c);
    return 0;
}`,
			note: 'La syntaxe .nom = ... (initialisation désignée) est lisible et résiste à un réordonnancement des champs.'
		},
		exercices: [
			{
				titre: 'Fiche produit',
				enonce:
					'Une struct Produit (nom, référence, prix, quantité). Écris afficher, valeur_stock (prix × quantité) et appliquer_remise(Produit *p, double pct).',
				niveau: 'guidé',
				fichier: 'exercices/08-structures/produit.c'
			},
			{
				titre: 'Carnet en mémoire',
				enonce:
					'Un tableau dynamique de Contact avec ajout, suppression par index, recherche par nom (strcmp) et tri par âge. Toutes les fonctions prennent (Contact *carnet, int n, ...).',
				niveau: 'seul',
				fichier: 'exercices/08-structures/carnet.c'
			},
			{
				titre: 'Machine à états',
				enonce:
					'Un enum Statut à 4 valeurs et une fonction de transition qui valide les changements autorisés, écrite avec un switch SANS default — pour que le compilateur te signale tout cas manquant.',
				niveau: 'défi',
				fichier: 'exercices/08-structures/etats.c'
			}
		],
		checkpoint: [
			"J'utilise -> sur un pointeur et . sur une valeur sans y penser",
			'Je passe mes structs par pointeur, avec const en lecture',
			'Je remplace mes nombres magiques par des enum',
			'Je sais ce qui se passe quand on copie une struct contenant un pointeur'
		]
	},
	{
		slug: 'fichiers-et-arguments',
		num: 9,
		phase: 3,
		titre: 'Fichiers et arguments de ligne de commande',
		accroche: 'Un programme qui survit à sa propre fermeture.',
		duree: '5 jours · ~6 h',
		objectif:
			"Tu lis et écris des fichiers texte ligne par ligne, tu gères les erreurs d'ouverture, et ton programme prend ses paramètres en ligne de commande.",
		notions: [
			{
				nom: 'FILE *, fopen, fclose',
				detail:
					'FILE *f = fopen("data.txt", "r"); — modes r (lire), w (écrire, ÉCRASE), a (ajouter), r+. Vérifie toujours if (f == NULL) : le fichier peut être absent ou verrouillé. Et ferme systématiquement, y compris sur les chemins d\u2019erreur.'
			},
			{
				nom: 'Lire ligne par ligne',
				detail:
					'while (fgets(ligne, sizeof ligne, f) != NULL) { ... } est la boucle canonique ; fgets renvoie NULL en fin de fichier. Elle conserve le \\n : ligne[strcspn(ligne, "\\n")] = \'\\0\'; le retire proprement.'
			},
			{
				nom: 'Écrire',
				detail:
					"fprintf(f, \"%s;%d\\n\", nom, age) s'utilise exactement comme printf, avec le flux en premier argument. printf(...) n'est rien d'autre que fprintf(stdout, ...)."
			},
			{
				nom: 'Découper une ligne',
				detail:
					'Pour un format CSV : strtok (simple, mais modifie la chaîne source et ignore les champs vides) ou sscanf(ligne, "%49[^;];%d", nom, &age). Choisis-en un et comprends ses limites.'
			},
			{
				nom: 'argc / argv',
				detail:
					'int main(int argc, char *argv[]) : argv[0] est le nom du programme, argv[1] le premier argument, et argc compte tout, argv[0] inclus. Vérifie TOUJOURS argc avant de lire argv[1].'
			},
			{
				nom: 'Texte vs binaire',
				detail:
					'fread/fwrite écrivent la représentation mémoire brute : plus rapide et compact, mais illisible dans un éditeur et non portable entre machines. Pour ce parcours : reste en texte, sache que le binaire existe.'
			}
		],
		pieges: [
			{
				titre: 'Le mode "w" écrase sans prévenir',
				detail:
					'Ouvrir en "w" vide le fichier immédiatement, avant même la première écriture. Une confusion w/a détruit un fichier de données en une exécution.'
			},
			{
				titre: 'Oublier fclose',
				detail:
					'Les écritures sont mises en tampon : sans fclose (ou fflush), les dernières lignes peuvent ne jamais atteindre le disque. Le fichier paraît tronqué, sans aucune erreur.'
			},
			{
				titre: 'Chemin relatif',
				detail:
					'fopen("data.txt") cherche dans le RÉPERTOIRE COURANT, pas à côté de l\'exécutable. Lancé depuis un autre dossier, ton programme ne trouve plus rien.'
			}
		],
		snippet: {
			titre: 'La boucle de lecture à connaître par cœur',
			code: `#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[])
{
    if (argc < 2) {
        fprintf(stderr, "usage: %s <fichier>\\n", argv[0]);
        return 1;
    }

    FILE *f = fopen(argv[1], "r");
    if (f == NULL) {
        perror(argv[1]);          /* message systeme precis */
        return 1;
    }

    char ligne[256];
    int  n = 0;
    while (fgets(ligne, sizeof ligne, f) != NULL) {
        ligne[strcspn(ligne, "\\n")] = '\\0';
        printf("%3d | %s\\n", ++n, ligne);
    }

    fclose(f);
    return 0;
}`,
			note: "Les messages d'erreur vont sur stderr, pas stdout : ils restent visibles même si la sortie est redirigée."
		},
		exercices: [
			{
				titre: 'cat maison',
				enonce:
					"Affiche le contenu d'un fichier passé en argument, avec les numéros de ligne. Gère l'argument manquant et le fichier inexistant.",
				niveau: 'guidé',
				fichier: 'exercices/09-fichiers/moncat.c'
			},
			{
				titre: 'Compteur de mots',
				enonce:
					"Compte lignes, mots et caractères d'un fichier (un wc simplifié). Ajoute une option -l pour n'afficher que les lignes.",
				niveau: 'seul',
				fichier: 'exercices/09-fichiers/moncompteur.c'
			},
			{
				titre: 'Carnet persistant',
				enonce:
					'Reprends le carnet du module 8 : charge les contacts depuis un CSV au démarrage, sauvegarde à la sortie. Le fichier doit survivre à la fermeture du programme.',
				niveau: 'défi',
				fichier: 'exercices/09-fichiers/carnet_csv.c'
			}
		],
		checkpoint: [
			'Je teste le retour de fopen à chaque fois',
			"Je ferme mes fichiers, y compris sur les chemins d'erreur",
			'La boucle fgets s\u2019écrit sans modèle',
			"Mon programme affiche son usage quand on l'appelle mal"
		]
	},
	{
		slug: 'projet-multi-fichiers',
		num: 10,
		phase: 3,
		titre: 'Projet multi-fichiers et Makefile',
		accroche: 'Passer de « un fichier » à « un programme ».',
		duree: '4 jours · ~5 h',
		objectif:
			'Tu découpes un programme en .h/.c cohérents, tu compiles séparément, et tu automatises le tout avec un Makefile.',
		notions: [
			{
				nom: 'Le couple .h / .c',
				detail:
					"Le .h est le CONTRAT (prototypes, types, constantes) : ce que les autres fichiers ont le droit d'utiliser. Le .c est l'implémentation. On inclut le .h, jamais le .c."
			},
			{
				nom: "Les gardes d'inclusion",
				detail:
					'#ifndef CARNET_H / #define CARNET_H / … / #endif en tête de chaque .h : sans ça, un .h inclus deux fois redéfinit ses types et la compilation échoue. Systématique, sans exception.'
			},
			{
				nom: 'Compilation séparée',
				detail:
					"gcc -c carnet.c produit carnet.o ; gcc main.o carnet.o -o prog fait l'édition de liens. Intérêt : modifier un seul .c ne recompile que celui-là. C'est aussi ici que les erreurs « undefined reference » du module 1 prennent leur sens."
			},
			{
				nom: 'static au niveau fichier',
				detail:
					"Une fonction ou une variable static hors fonction n'est visible que dans SON fichier. C'est l'équivalent C du « privé » : tout ce qui n'est pas dans le .h devrait être static."
			},
			{
				nom: 'Le Makefile',
				detail:
					'Une règle, c\u2019est cible: dépendances, puis sur la ligne suivante indentée par une TABULATION, la commande. make ne reconstruit que ce dont les dépendances ont changé. Cibles utiles : all, clean, run.'
			},
			{
				nom: 'Organiser le dépôt',
				detail:
					'src/ pour les .c, include/ pour les .h, bin/ pour les binaires — et bin/ dans le .gitignore : on ne versionne jamais un exécutable.'
			}
		],
		pieges: [
			{
				titre: "Espaces au lieu d'une tabulation dans le Makefile",
				detail:
					'make exige une VRAIE tabulation avant chaque commande. Avec des espaces : « missing separator ». Configure ton éditeur pour ne pas convertir les tabulations dans les Makefile.'
			},
			{
				titre: 'Définir une variable dans un .h',
				detail:
					"Un int compteur = 0; dans un .h inclus par deux .c crée deux définitions → « multiple definition » à l'édition de liens. Dans le .h : extern int compteur; et la définition va dans UN seul .c."
			},
			{
				titre: "Oublier d'ajouter le nouveau .c au Makefile",
				detail:
					"Symptôme : « undefined reference to ma_fonction » alors que la fonction existe. Le fichier n'a simplement pas été compilé ni lié."
			}
		],
		snippet: {
			titre: 'Makefile minimal qui couvre tout le parcours',
			code: `CC      = gcc
CFLAGS  = -Wall -Wextra -std=c17 -g
SRC     = $(wildcard src/*.c)
OBJ     = $(SRC:.c=.o)
BIN     = bin/prog.exe

all: $(BIN)

$(BIN): $(OBJ)
	@mkdir -p bin
	$(CC) $(OBJ) -o $@

%.o: %.c
	$(CC) $(CFLAGS) -Iinclude -c $< -o $@

run: all
	./$(BIN)

clean:
	rm -f src/*.o $(BIN)

.PHONY: all run clean`,
			note: 'Les lignes de commandes commencent par une TABULATION. Copie ce fichier tel quel, puis lis-le ligne par ligne.'
		},
		exercices: [
			{
				titre: 'Découpage',
				enonce:
					'Reprends ton carnet du module 9 et sépare-le : carnet.h (types + prototypes), carnet.c (implémentation), main.c (interface utilisateur). Compile à la main en 3 commandes.',
				niveau: 'guidé',
				fichier: 'exercices/10-multi-fichiers/'
			},
			{
				titre: 'Makefile',
				enonce:
					"Écris le Makefile du projet précédent avec les cibles all, run, clean. Vérifie qu'après modification d'un seul .c, make ne recompile que celui-là.",
				niveau: 'seul',
				fichier: 'exercices/10-multi-fichiers/Makefile'
			},
			{
				titre: 'Module réutilisable',
				enonce:
					"Écris un module chaines.h/chaines.c (trim, majuscules, découpage) totalement indépendant du carnet, et utilise-le depuis deux programmes différents. Tout ce qui n'est pas dans le .h doit être static.",
				niveau: 'défi',
				fichier: 'exercices/10-multi-fichiers/chaines.c'
			}
		],
		checkpoint: [
			"Chacun de mes .h a ses gardes d'inclusion",
			'Je sais dire ce qui va dans le .h et ce qui reste dans le .c',
			'Je lance make et make clean sur mon projet',
			'Je sais lire une erreur « undefined reference »'
		]
	},
	{
		slug: 'structures-de-donnees',
		num: 11,
		phase: 3,
		titre: 'Structures de données',
		accroche: 'Là où pointeurs, malloc et structs se rejoignent enfin.',
		duree: '2 semaines · ~12 h',
		objectif:
			'Tu implémentes une liste chaînée, une pile et une file de zéro, sans modèle, et tu sais choisir entre tableau et liste.',
		notions: [
			{
				nom: 'La liste chaînée simple',
				detail:
					"typedef struct Noeud { int valeur; struct Noeud *suivant; } Noeud; — la struct se référence elle-même, d'où le struct Noeud * à l'intérieur, avant que le typedef n'existe. Chaque nœud est un malloc, le dernier pointe sur NULL."
			},
			{
				nom: 'Les 4 opérations',
				detail:
					"Insertion en tête (immédiate), insertion en queue, suppression d'un nœud (le piège : garder le précédent), libération complète (sauvegarder suivant AVANT de free le nœud courant)."
			},
			{
				nom: 'Tableau ou liste ?',
				detail:
					"Tableau : accès direct par index, données contiguës donc rapides en cache, mais insertion au milieu coûteuse. Liste : insertion et suppression immédiates si on a le pointeur, mais aucun accès par index et un malloc par élément. En pratique, le tableau gagne plus souvent qu'on ne le croit."
			},
			{
				nom: 'Pile (LIFO) et file (FIFO)',
				detail:
					'La pile : push/pop en tête de liste, 10 lignes. La file : ajout en queue, retrait en tête — garde un pointeur de queue, sinon chaque ajout reparcourt tout.'
			},
			{
				nom: 'Arbre binaire de recherche',
				detail:
					"Deux pointeurs par nœud (gauche/droite), insertion et recherche récursives, parcours infixe qui ressort les valeurs triées. C'est le meilleur exercice de récursion + pointeurs du parcours."
			},
			{
				nom: 'Le pointeur de pointeur',
				detail:
					"Pour qu'une fonction modifie la TÊTE de liste, il lui faut Noeud **tete : la tête est elle-même un pointeur qu'on veut changer. C'est le sommet de la difficulté syntaxique du C — et après ça, plus rien ne surprend."
			}
		],
		pieges: [
			{
				titre: 'Perdre le reste de la liste',
				detail:
					'free(courant); courant = courant->suivant; lit un nœud déjà libéré. Il faut Noeud *suiv = courant->suivant; free(courant); courant = suiv;.'
			},
			{
				titre: 'La fuite silencieuse',
				detail:
					'Une liste de 1000 nœuds, c\u2019est 1000 free. Une seule fonction de destruction, appelée sur tous les chemins de sortie. Vérifie sous sanitizer, toujours.'
			},
			{
				titre: 'Ne pas traiter la liste vide',
				detail:
					'Chaque opération doit marcher quand tete == NULL et quand la liste a UN seul élément. Ce sont les deux cas où tout le monde plante : teste-les en premier, pas en dernier.'
			}
		],
		snippet: {
			titre: 'Le parcours et la libération, les deux gestes de base',
			code: `void afficher(const Noeud *tete)
{
    for (const Noeud *p = tete; p != NULL; p = p->suivant)
        printf("%d -> ", p->valeur);
    printf("NULL\\n");
}

void detruire(Noeud *tete)
{
    while (tete != NULL) {
        Noeud *suiv = tete->suivant;   /* AVANT le free */
        free(tete);
        tete = suiv;
    }
}`,
			note: 'Dessine la liste et déplace ton doigt à chaque itération. Cet exercice au crayon vaut trois heures de débogage.'
		},
		exercices: [
			{
				titre: 'Liste chaînée complète',
				enonce:
					'Implémente : créer, insérer en tête, insérer en queue, chercher, supprimer une valeur, afficher, détruire, compter. Teste sur liste vide et liste à 1 élément.',
				niveau: 'guidé',
				fichier: 'exercices/11-structures-donnees/liste.c'
			},
			{
				titre: 'Pile et file',
				enonce:
					'Une pile (push/pop/peek/est_vide) puis, avec elle, un vérificateur de parenthèses équilibrées sur une expression saisie. Puis une file avec pointeur de queue.',
				niveau: 'seul',
				fichier: 'exercices/11-structures-donnees/pile.c'
			},
			{
				titre: 'Arbre binaire de recherche',
				enonce:
					"Insertion, recherche, parcours infixe (doit sortir trié), hauteur, destruction récursive. Puis compte l'occurrence de chaque mot d'un fichier texte avec cet arbre.",
				niveau: 'défi',
				fichier: 'exercices/11-structures-donnees/arbre.c'
			}
		],
		checkpoint: [
			"J'écris une liste chaînée de zéro, sans modèle",
			'Je sauvegarde le suivant avant chaque free',
			'Je teste systématiquement le cas vide et le cas à 1 élément',
			"Je sais dire quand un tableau est meilleur qu'une liste"
		]
	},
	{
		slug: 'debogage-et-qualite',
		num: 12,
		phase: 3,
		titre: 'Débogage, sanitizers et qualité',
		accroche: 'Le module qui rend autonome. À lire tôt, à pratiquer tout du long.',
		duree: '4 jours · ~5 h',
		objectif:
			'Devant un crash, tu sais localiser la ligne fautive en quelques minutes avec gdb ou un sanitizer, au lieu de semer des printf au hasard.',
		notions: [
			{
				nom: 'gdb, les 6 commandes qui suffisent',
				detail:
					"Compile avec -g. gdb ./prog puis : run (lancer) · bt (backtrace : la pile d'appels au moment du crash) · break fichier:ligne · next / step · print variable. bt tout seul résout déjà la moitié des segfaults."
			},
			{
				nom: 'Les sanitizers',
				detail:
					"-fsanitize=address attrape débordements, use-after-free et fuites ; -fsanitize=undefined attrape débordements d'entiers, décalages invalides et déréférencements de NULL. Ils ralentissent le programme : en développement, jamais en production. ⚠ Indisponibles sur toute chaîne Windows de type GNU (MinGW-w64, w64devkit, clang de MSYS2) : la bibliothèque d'exécution n'y est pas portée. Il faut WSL 2 — ou MSVC, qui a la sienne. gdb, lui, marche partout."
			},
			{
				nom: 'Comportement indéfini (UB)',
				detail:
					"Débordement d'entier signé, lecture hors limites, variable non initialisée, déréférencement de NULL : le standard n'impose RIEN. Le programme peut marcher aujourd'hui et casser après recompilation. « Ça marche chez moi » n'est pas une preuve d'absence d'UB — seul l'outillage l'est."
			},
			{
				nom: 'assert',
				detail:
					"assert(n > 0); (dans <assert.h>) stoppe net avec fichier et ligne si l'invariant est faux. Pose des assertions sur ce que tu crois vrai à l'entrée de tes fonctions : ce sont des tests qui vivent dans le code."
			},
			{
				nom: 'Tester sans framework',
				detail:
					'Un fichier tests.c avec un main qui appelle tes fonctions sur des cas connus et compare : if (somme(2,3) != 5) printf("ECHEC somme\\n");. Ajoute une cible make test. Ça suffit largement à ce stade.'
			},
			{
				nom: 'Style et lisibilité',
				detail:
					'Indentation constante (4 espaces), accolades même pour une ligne, noms explicites, fonctions courtes, et un commentaire qui explique le POURQUOI, jamais le quoi. clang-format peut automatiser la mise en forme.'
			}
		],
		pieges: [
			{
				titre: 'Déboguer par printf uniquement',
				detail:
					'Ça marche pour un affichage faux, pas pour une corruption mémoire — le printf peut lui-même déplacer le bug. Apprends bt, tu gagneras des heures dès le module 11.'
			},
			{
				titre: 'Ignorer un warning « juste pour cette fois »',
				detail:
					'Chaque warning ignoré est un bug qui reviendra plus tard, plus cher. Vise zéro warning avec -Wall -Wextra, en permanence.'
			},
			{
				titre: 'Compiler avec -O2 pour déboguer',
				detail:
					"L'optimisation réorganise le code : les lignes affichées par gdb ne correspondent plus. Débogue en -g -O0."
			}
		],
		snippet: {
			titre: "Les deux commandes à mettre dans ton Makefile dès aujourd'hui",
			code: `# developpement : tout est verifie
gcc -Wall -Wextra -std=c17 -g -O0 -fsanitize=address,undefined prog.c -o prog.exe

# session gdb type
gdb ./prog.exe
(gdb) run
(gdb) bt              # ou ca a casse, et par quel chemin on y est arrive
(gdb) print ma_var    # que valait la variable a cet instant`,
			note: "La ligne du haut suppose WSL 2. Sur la chaîne MSYS2, gdb + bt couvrent l'essentiel."
		},
		exercices: [
			{
				titre: 'Chasse au bug guidée',
				enonce:
					"Écris volontairement 4 programmes fautifs (débordement de tableau, use-after-free, fuite, déréférencement de NULL). Pour chacun : observe le comportement SANS outil, puis relance sous sanitizer et sous gdb. Note ce que chaque outil t'a dit.",
				niveau: 'guidé',
				fichier: 'exercices/12-debogage/bugs.c'
			},
			{
				titre: 'Tests de ton carnet',
				enonce:
					'Écris tests.c pour le module carnet : ajout, suppression, recherche introuvable, carnet vide. Ajoute la cible make test.',
				niveau: 'seul',
				fichier: 'exercices/12-debogage/tests.c'
			},
			{
				titre: 'Audit de ton propre code',
				enonce:
					'Reprends tous tes exercices des modules 5 à 11, recompile-les avec -Wall -Wextra -fsanitize=address,undefined et corrige tout ce qui sort. Compte les problèmes trouvés.',
				niveau: 'défi',
				fichier: 'exercices/12-debogage/'
			}
		],
		checkpoint: [
			'Devant un segfault, mon premier réflexe est gdb + bt',
			'Je connais les deux outils et leur périmètre : gdb partout, sanitizers sous WSL 2',
			'Je sais citer 4 comportements indéfinis classiques',
			'Mon code sort sans aucun warning'
		]
	},
	{
		slug: 'projet-final',
		num: 13,
		phase: 3,
		titre: 'Projet final',
		accroche: 'Le seul livrable qui prouve que le parcours a servi.',
		duree: '2 semaines · ~15 h',
		objectif:
			'Tu livres un programme complet, multi-fichiers, avec persistance, Makefile, tests et README — écrit sans modèle.',
		notions: [
			{
				nom: 'Choisis UN sujet et va au bout',
				detail:
					'Gestionnaire de contacts en ligne de commande (CRUD + CSV) · analyseur de fichier log (statistiques, top N) · jeu du pendu avec dictionnaire en fichier · calculatrice en notation polonaise inverse, avec ta pile du module 11 · todo-list persistante. Un projet fini vaut mieux que trois commencés.'
			},
			{
				nom: 'Le cahier des charges minimal',
				detail:
					'Menu ou arguments en ligne de commande · au moins une struct métier · allocation dynamique · lecture ET écriture de fichier · découpage en 3 fichiers minimum · Makefile · gestion des erreurs sur tous les chemins.'
			},
			{
				nom: 'La méthode : par tranches verticales',
				detail:
					"N'écris pas tout le programme avant de le compiler. Fais marcher « ajouter un contact et l'afficher », commit. Puis la sauvegarde fichier, commit. Puis la suppression, commit. À chaque étape, un programme qui TOURNE."
			},
			{
				nom: 'Le README',
				detail:
					'Ce que fait le programme, comment le compiler, comment le lancer, un exemple de session. Cinq lignes suffisent, mais elles doivent être justes.'
			}
		],
		pieges: [
			{
				titre: 'Un sujet trop gros',
				detail:
					'Pas de réseau, pas d\u2019interface graphique, pas de multithread. Le but est de consolider, pas de découvrir trois technologies de plus.'
			},
			{
				titre: 'Coder 3 jours avant de compiler',
				detail:
					"Compile à chaque fonction terminée. 400 lignes jamais compilées produisent une avalanche d'erreurs qui décourage."
			},
			{
				titre: 'Reporter le nettoyage mémoire',
				detail:
					'Libère au moment où tu alloues : écris le free tout de suite, quitte à déplacer la ligne. Rattraper les fuites à la fin sur 600 lignes, c\u2019est un autre projet.'
			}
		],
		exercices: [
			{
				titre: 'Cadrage',
				enonce:
					'Rédige en 10 lignes : le sujet, les 5 fonctionnalités visées, le format du fichier de données, le découpage en fichiers. Fais-le AVANT la première ligne de code.',
				niveau: 'guidé',
				fichier: 'exercices/13-projet/CAHIER-DES-CHARGES.md'
			},
			{
				titre: 'Version 1 qui tourne',
				enonce:
					'La plus petite version utile : une seule fonctionnalité, de bout en bout, compilée par le Makefile. Commit.',
				niveau: 'seul',
				fichier: 'exercices/13-projet/'
			},
			{
				titre: 'Livraison',
				enonce:
					'Toutes les fonctionnalités, zéro warning, zéro fuite sous sanitizer, tests, README. Puis relis ton code du module 1 : mesure le chemin parcouru.',
				niveau: 'défi',
				fichier: 'exercices/13-projet/'
			}
		],
		checkpoint: [
			'Mon projet compile par un simple make',
			'Zéro warning avec -Wall -Wextra',
			'Zéro fuite sous -fsanitize=address',
			'Un inconnu peut le compiler et le lancer avec le seul README'
		]
	}
];

export const modulesParPhase = (phase: PhaseId) => MODULES.filter((m) => m.phase === phase);

export const moduleParSlug = (slug: string) => MODULES.find((m) => m.slug === slug);

export const moduleVoisin = (slug: string, direction: -1 | 1) => {
	const i = MODULES.findIndex((m) => m.slug === slug);
	if (i === -1) return undefined;
	return MODULES[i + direction];
};

/** Total des critères de validation, toutes phases confondues : dénominateur de la progression. */
export const TOTAL_CHECKPOINTS = MODULES.reduce((n, m) => n + m.checkpoint.length, 0);
