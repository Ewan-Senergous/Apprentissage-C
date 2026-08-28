import { error } from '@sveltejs/kit';
import { MODULES, moduleParSlug, moduleVoisin } from '$lib/data/curriculum';
import type { PageLoad } from './$types';

// Le site est prérendu : `entries` fournit à SvelteKit la liste des slugs à générer, sinon la
// route dynamique n'a aucune page produite au build.
export const entries = () => MODULES.map((m) => ({ slug: m.slug }));

export const load: PageLoad = ({ params }) => {
	const module = moduleParSlug(params.slug);
	if (!module) error(404, `Module inconnu : ${params.slug}`);

	return {
		module,
		precedent: moduleVoisin(params.slug, -1),
		suivant: moduleVoisin(params.slug, 1)
	};
};
