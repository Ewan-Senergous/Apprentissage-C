import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Site 100 % statique : aucune donnée serveur, la progression vit dans le localStorage
		// du navigateur. `pnpm build` produit un dossier `build/` ouvrable tel quel.
		adapter: adapter({ fallback: '404.html' }),
		alias: {
			$lib: 'src/lib'
		}
	}
};

export default config;
