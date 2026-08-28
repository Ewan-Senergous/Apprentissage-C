// Site entièrement statique : SvelteKit prérend chaque page au build (adapter-static).
// Aucune donnée serveur, aucune requête — la progression vit dans le localStorage.
export const prerender = true;
export const ssr = true;
