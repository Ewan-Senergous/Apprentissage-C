/**
 * La MÉTHODE, séparée du CONTENU (`curriculum.ts`) : ce fichier ne dit pas quoi apprendre mais
 * comment. C'est la moitié qu'on saute d'habitude, et c'est celle qui fait la différence entre
 * « j'ai lu un cours de C » et « je code en C ».
 *
 * Tout ce qui est ici est appliqué au parcours : la séance type produit les exercices des
 * modules, les révisions espacées portent sur les checkpoints, la règle des 20 minutes encadre
 * l'usage de l'assistant (voir CLAUDE.md, section « Rôle de tuteur »).
 */

export type Principe = {
	id: string;
	titre: string;
	regle: string;
	pourquoi: string;
	enPratique: string[];
};

export type Etape = {
	minutes: number;
	titre: string;
	detail: string;
};

/** Séance type de 60 min. Le ratio compte plus que la durée : ~20 % lecture, ~65 % clavier. */
export const SEANCE: Etape[] = [
	{
		minutes: 5,
		titre: 'Rappel actif',
		detail:
			"Sans rien ouvrir : redis à voix haute (ou écris) ce que tu as fait à la séance précédente. Si tu n'y arrives pas, c'est là qu'il faut relire — pas ailleurs."
	},
	{
		minutes: 10,
		titre: 'Lecture ciblée',
		detail:
			'Lis UNE notion du module en cours, pas le module entier. Objectif : pouvoir la reformuler en une phrase.'
	},
	{
		minutes: 35,
		titre: 'Clavier',
		detail:
			"L'exercice, tapé à la main, compilé, lancé, corrigé. C'est le seul moment qui fait progresser ; tout le reste le prépare."
	},
	{
		minutes: 10,
		titre: 'Trace écrite',
		detail:
			"Note dans ton journal : ce que tu as codé, l'erreur qui t'a le plus coûté, et sa cause réelle. Trois lignes suffisent."
	}
];

export const PRINCIPES: Principe[] = [
	{
		id: 'clavier',
		titre: 'Le clavier avant les yeux',
		regle: '2 h de code valent 10 h de vidéos. Aucun exercice ne se lit : il se tape.',
		pourquoi:
			"Lire du C donne l'illusion de comprendre : la syntaxe est courte, tout paraît évident. La difficulté du C n'est pas de LIRE une ligne, c'est de l'ÉCRIRE juste — et ça ne se révèle qu'au compilateur.",
		enPratique: [
			'Jamais de copier-coller depuis un cours, même pour un squelette de 5 lignes',
			'Un exercice compris mais non tapé compte comme non fait',
			'Retape les exemples des modules : la mémoire musculaire de la syntaxe existe'
		]
	},
	{
		id: 'warnings',
		titre: 'Le compilateur est ton premier prof',
		regle: 'gcc -Wall -Wextra -std=c17 -g, dès le premier "hello world", sans exception.',
		pourquoi:
			"En C, un programme faux compile très bien. Les warnings sont exactement la liste des endroits où le compilateur a repéré une incohérence sans avoir le droit de refuser. Les ignorer, c'est refuser la seule relecture gratuite que tu auras.",
		enPratique: [
			'Zéro warning toléré : un warning = on répare avant de continuer',
			'Lis la PREMIÈRE erreur, corrige, recompile. Jamais les 40 à la fois',
			'À partir du module 7, ajoute -fsanitize=address,undefined — sous WSL 2 uniquement : aucune chaîne Windows native ne fournit ces bibliothèques',
			'Un message que tu ne comprends pas : colle-le dans ton journal, puis cherche'
		]
	},
	{
		id: 'memoire',
		titre: 'Dessine la mémoire',
		regle: 'Avant de coder un exercice de pointeurs, dessine les cases et les flèches sur papier.',
		pourquoi:
			"Les pointeurs bloquent parce qu'on essaie de les tenir mentalement. Sur papier, une case = un nom + une valeur, une flèche = une adresse : le code devient une simple transcription du dessin. C'est la technique qui débloque le module 6 chez à peu près tout le monde.",
		enPratique: [
			'Une feuille A4 par exercice de pointeurs, gardée à côté du clavier',
			'Sépare visuellement la pile (variables locales) et le tas (malloc)',
			'Pour une liste chaînée, déplace ton doigt le long des flèches à chaque itération',
			'Si tu ne sais pas dessiner ce que tu veux coder, tu ne sais pas encore quoi coder'
		]
	},
	{
		id: 'espacement',
		titre: 'Revenir en arrière, exprès',
		regle: 'Chaque notion se revoit à J+1, J+3, J+7 — de mémoire, pas en relisant.',
		pourquoi:
			"L'oubli n'est pas un accident, c'est le fonctionnement normal. Ce qui grave une notion, c'est l'effort de la RETROUVER, pas celui de la relire. Une relecture est confortable et inefficace ; un rappel raté est inconfortable et utile.",
		enPratique: [
			"Le lendemain : refais l'exercice de la veille depuis une page blanche, sans regarder",
			'À J+3 : reprends un exercice du module précédent',
			'À J+7 : passe la checklist du module (les cases « je sais faire »)',
			'Une case décochée en révision, c’est normal : c’est le signal que la révision a servi'
		]
	},
	{
		id: 'vingt-minutes',
		titre: 'La règle des 20 minutes',
		regle: 'Bloqué ? 20 minutes seul, puis demande — mais demande une PISTE, pas la solution.',
		pourquoi:
			"Sous 20 minutes, tu te prives de l'effort qui fait apprendre. Au-delà, tu ne cherches plus, tu tournes en rond et tu t'épuises. Et recevoir un code tout fait supprime exactement la partie qui aurait servi.",
		enPratique: [
			'Minute 0-5 : relis ton code à voix haute, ligne par ligne',
			'Minute 5-10 : relis le message du compilateur EN ENTIER, et la ligne du dessus',
			'Minute 10-20 : réduis à 10 lignes qui reproduisent le problème',
			'Après 20 min : demande « pourquoi ça fait ça ? », jamais « donne-moi le code »'
		]
	},
	{
		id: 'petit-pas',
		titre: 'Compiler tôt, compiler souvent',
		regle: 'Jamais plus de 10 lignes écrites sans compiler.',
		pourquoi:
			"Une erreur trouvée dans 10 lignes se corrige en une minute ; la même dans 200 lignes prend une heure. Ce n'est pas une question de discipline mais de coût : tu choisis à quel prix tu veux payer tes fautes.",
		enPratique: [
			'Écris la fonction vide, compile. Ajoute le corps, compile. Ajoute le cas limite, compile',
			'git commit à chaque étape qui tourne — même minuscule',
			"Un programme qui tourne à moitié vaut mieux qu'un programme complet qui ne compile pas"
		]
	},
	{
		id: 'explique',
		titre: 'Explique-le à voix haute',
		regle: 'Si tu ne peux pas expliquer ton code ligne par ligne, tu ne le comprends pas.',
		pourquoi:
			"Verbaliser force à séquencer, et le trou dans le raisonnement apparaît tout seul. C'est aussi la méthode du canard en plastique : la moitié des bugs se résolvent avant la fin de l'explication.",
		enPratique: [
			'À chaque ligne de pointeur : « ici je manipule une ADRESSE ou une VALEUR ? »',
			'Explique un exercice fini à quelqu’un (ou à voix haute, seul, ça marche aussi)',
			'Le commentaire dit POURQUOI, pas quoi : « /* i++ incrémente i */ » ne sert à rien'
		]
	},
	{
		id: 'journal',
		titre: 'Tiens un journal',
		regle: 'Trois lignes par séance : fait / bloqué sur / compris.',
		pourquoi:
			"En C, les mêmes 15 erreurs reviennent en boucle (le & de scanf, le \\0, le free oublié). Les écrire crée un catalogue personnel qui, au bout d'un mois, vaut mieux que n'importe quel cours — parce que ce sont TES fautes.",
		enPratique: [
			'Un fichier JOURNAL.md à la racine, une entrée datée par séance',
			"Note le message d'erreur EXACT et sa cause réelle, pas « ça marchait pas »",
			'Relis ton journal chaque dimanche : les répétitions sont tes vrais points faibles'
		]
	}
];

/** Ce qui fait échouer les débutants en C, indépendamment du contenu appris. */
export const PIEGES_DE_PARCOURS = [
	{
		titre: 'Sauter les pointeurs « pour y revenir plus tard »',
		detail:
			"Tout ce qui suit en dépend : chaînes, malloc, structures de données, fichiers. Un module 6 bâclé rend les modules 7 à 11 incompréhensibles, et on croit alors être « nul en C » alors qu'il manque une seule brique."
	},
	{
		titre: 'Collectionner les tutoriels',
		detail:
			'Trois cours en parallèle donnent trois conventions différentes et zéro exercice terminé. Un seul parcours, suivi jusqu’au bout, et une seule référence de secours (la doc, un livre).'
	},
	{
		titre: 'Copier la solution après 5 minutes',
		detail:
			"Le code copié compile et donne le sentiment d'avancer ; il n'apprend rien. C'est précisément l'inconfort du blocage qui grave la notion."
	},
	{
		titre: 'Viser un gros projet trop tôt',
		detail:
			'Écrire un jeu 2D au module 4 se termine toujours pareil : abandon. Le projet final (module 13) arrive après les briques, pas avant.'
	},
	{
		titre: 'Apprendre par cœur la syntaxe',
		detail:
			'Personne ne retient les prototypes de string.h. On retient les CONCEPTS (une chaîne finit par \\0) et on consulte la doc pour le reste — `man strcpy` ou cppreference.'
	},
	{
		titre: 'Coder sans jamais lire de code',
		detail:
			'Une fois le module 8 passé, lis du vrai code C : les sources de programmes simples, ou la libc. Repérer ce qui est idiomatique accélère plus que dix exercices de plus.'
	}
];

/** Rythme réaliste pour quelqu'un qui travaille à côté. Le total du parcours est ~85-95 h. */
export const RYTHMES = [
	{
		nom: 'Soutenu',
		cadence: '1 h/jour, 6 jours sur 7',
		duree: '≈ 3,5 mois',
		note: 'Le meilleur rapport régularité/fatigue. La séance quotidienne bat les gros week-ends.'
	},
	{
		nom: 'Régulier',
		cadence: '4 séances de 1 h par semaine',
		duree: '≈ 5 mois',
		note: 'Tenable sur la durée avec un travail à côté. Ne descends pas sous 3 séances : en dessous, chaque séance sert à se rappeler la précédente.'
	},
	{
		nom: 'Intensif',
		cadence: '4 h/jour, 5 jours sur 7',
		duree: '≈ 6 semaines',
		note: 'Possible en période dédiée. Découpe en blocs de 50 min : au-delà, le taux de fautes explose et tu débogues ta propre fatigue.'
	}
];
