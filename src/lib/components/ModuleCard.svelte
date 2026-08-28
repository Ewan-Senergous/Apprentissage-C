<script lang="ts">
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import type { Module } from '$lib/data/curriculum';
	import { progression } from '$lib/progress.svelte';
	import { Badge } from './ui/badge';

	interface Props {
		module: Module;
		couleur: string;
		/** Module mis en avant sur la home = premier non terminé. */
		courant?: boolean;
	}

	const { module, couleur, courant = false }: Props = $props();

	const valides = $derived(progression.valides(module.slug));
	const termine = $derived(valides === module.checkpoint.length);
</script>

<a class="carte" class:termine class:courant href="/module/{module.slug}">
	<span class="filet" style="background: {couleur}" aria-hidden="true"></span>

	<div class="corps">
		<div class="tete">
			<span class="num" style="color: {couleur}">{String(module.num).padStart(2, '0')}</span>
			<span class="titre">{module.titre}</span>
			<ChevronRight size={16} class="fleche" aria-hidden="true" />
		</div>

		<p class="accroche">{module.accroche}</p>

		<div class="pied">
			<span class="duree">{module.duree}</span>
			<span class="sep" aria-hidden="true">·</span>
			<span>{module.exercices.length} exercices</span>
			{#if termine || courant}
				<span class="etat">
					{#if termine}
						<CircleCheck size={16} class="ok" aria-label="Module terminé" />
					{:else}
						<Badge variant="bleu">à faire</Badge>
					{/if}
				</span>
			{/if}
		</div>
	</div>
</a>

<style>
	.carte {
		display: flex;
		overflow: hidden;
		border: 1px solid var(--color-on-surface);
		border-radius: 12px;
		background: var(--color-surface);
		color: inherit;
		text-decoration: none;
		transition:
			background-color 140ms,
			border-color 140ms,
			transform 140ms;
	}

	.carte:hover {
		background: var(--color-surface-gray);
		transform: translateY(-1px);
	}

	/* Un module terminé garde son vert au survol : la teinte est son état, pas un effet. */
	.termine:hover {
		background: var(--color-tint-vert-bg);
	}

	.carte:focus-visible {
		outline: 3px solid var(--color-primary-300);
		outline-offset: 2px;
	}

	/* Le module courant est le SEUL à porter une bordure colorée : sur une grille de 13 cartes,
	   c'est le repère « reprends ici » qu'on doit trouver sans lire. */
	.courant {
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 1px var(--color-primary-500);
	}

	.termine {
		background: linear-gradient(0deg, var(--color-tint-vert-bg) 0%, #fff 45%);
	}

	.filet {
		width: 4px;
		flex-shrink: 0;
	}

	.corps {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 8px;
		min-width: 0;
		padding: 14px 16px;
	}

	.tete {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.num {
		flex-shrink: 0;
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}

	.titre {
		flex: 1;
		min-width: 0;
		font-size: 14.5px;
		font-weight: 600;
	}

	.carte :global(.ok) {
		flex-shrink: 0;
		color: var(--color-action-green);
	}

	.carte :global(.fleche) {
		flex-shrink: 0;
		color: var(--color-border-strong);
	}

	.carte:hover :global(.fleche) {
		color: var(--color-primary-500);
	}

	.accroche {
		margin: 0;
		color: var(--color-on-surface-muted);
		font-size: 13px;
		line-height: 1.5;
	}

	.pied {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--color-on-surface-muted);
		font-size: 11.5px;
	}

	/* L'état part à droite de la ligne : il se lit en balayant la colonne des cartes. */
	.etat {
		display: inline-flex;
		align-items: center;
		margin-left: auto;
	}

	.duree {
		font-family: var(--font-mono);
		font-size: 11px;
	}

	.sep {
		opacity: 0.5;
	}
</style>
