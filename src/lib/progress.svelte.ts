import { browser } from '$app/environment';
import { MODULES, TOTAL_CHECKPOINTS } from '$lib/data/curriculum';

/**
 * Progression de l'apprenant : quels critères de validation sont cochés.
 *
 * Stockage = localStorage du navigateur, PAS de serveur — le site est prérendu statiquement et
 * n'a ni base ni compte. Conséquence assumée : la progression est locale à un navigateur, et
 * l'export/import JSON (`exporter()` / `importer()`) est le seul moyen de la déplacer.
 *
 * Clé d'un critère = `slug:index`. Le slug plutôt que le numéro de module : réordonner le
 * parcours dans `curriculum.ts` ne doit pas décaler la progression déjà acquise.
 */

const CLE = 'apprentissage-c:progression:v1';

function lire(): string[] {
	if (!browser) return [];
	try {
		const brut = localStorage.getItem(CLE);
		return brut ? (JSON.parse(brut) as string[]) : [];
	} catch {
		// localStorage indisponible (navigation privée, stockage bloqué) : on démarre à vide
		// plutôt que de casser la page.
		return [];
	}
}

class Progression {
	/** Tableau et non Set : `$state` suit les RÉAFFECTATIONS, et JSON.stringify le sérialise tel
	    quel pour le localStorage. Chaque écriture remplace donc le tableau, jamais ne le mute. */
	#coches = $state<string[]>(lire());

	get coches() {
		return this.#coches;
	}

	#sauver() {
		if (!browser) return;
		try {
			localStorage.setItem(CLE, JSON.stringify(this.#coches));
		} catch {
			// Quota plein ou stockage bloqué : on garde l'état en mémoire pour la session.
		}
	}

	cle(slug: string, index: number) {
		return `${slug}:${index}`;
	}

	estCoche(slug: string, index: number) {
		return this.#coches.includes(this.cle(slug, index));
	}

	basculer(slug: string, index: number) {
		const k = this.cle(slug, index);
		this.#coches = this.#coches.includes(k)
			? this.#coches.filter((c) => c !== k)
			: [...this.#coches, k];
		this.#sauver();
	}

	/** Nombre de critères validés pour un module donné. */
	valides(slug: string) {
		return this.#coches.filter((c) => c.startsWith(`${slug}:`)).length;
	}

	/** Un module est terminé quand TOUS ses critères sont cochés. */
	estTermine(slug: string) {
		const module = MODULES.find((m) => m.slug === slug);
		return module ? this.valides(slug) === module.checkpoint.length : false;
	}

	get total() {
		return this.#coches.length;
	}

	get pourcentage() {
		return TOTAL_CHECKPOINTS === 0
			? 0
			: Math.round((this.#coches.length / TOTAL_CHECKPOINTS) * 100);
	}

	get modulesTermines() {
		return MODULES.filter((m) => this.estTermine(m.slug)).length;
	}

	/** Premier module non terminé : c'est ce que la home met en avant comme « à faire ». */
	get moduleCourant() {
		return MODULES.find((m) => !this.estTermine(m.slug)) ?? MODULES[MODULES.length - 1];
	}

	reinitialiser() {
		this.#coches = [];
		this.#sauver();
	}

	exporter() {
		return JSON.stringify({ version: 1, coches: this.#coches }, null, 2);
	}

	importer(json: string) {
		try {
			const data = JSON.parse(json) as { coches?: unknown };
			if (!Array.isArray(data.coches)) return false;
			this.#coches = data.coches.filter((c): c is string => typeof c === 'string');
			this.#sauver();
			return true;
		} catch {
			return false;
		}
	}
}

export const progression = new Progression();
