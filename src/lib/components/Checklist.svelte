<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import { progression } from '$lib/progress.svelte';

	interface Props {
		slug: string;
		items: string[];
	}

	const { slug, items }: Props = $props();
</script>

<ul class="liste">
	{#each items as item, i (item)}
		{@const coche = progression.estCoche(slug, i)}
		<li>
			<label class="ligne" class:coche>
				<input
					type="checkbox"
					checked={coche}
					onchange={() => progression.basculer(slug, i)}
					class="natif"
				/>
				<span class="case" aria-hidden="true">
					{#if coche}<Check size={13} strokeWidth={3} />{/if}
				</span>
				<span class="texte">{item}</span>
			</label>
		</li>
	{/each}
</ul>

<style>
	.liste {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.ligne {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 8px 10px;
		border-radius: 8px;
		cursor: pointer;
		font-size: 14px;
		line-height: 1.45;
	}

	.ligne:hover {
		background: var(--color-surface-gray);
	}

	/* La case native reste dans le DOM (accessibilité clavier + lecteurs d'écran) mais est
	   masquée visuellement : le carré dessiné ci-dessous porte le rendu. */
	.natif {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}

	.case {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		margin-top: 1px;
		border: 1.5px solid var(--color-border-strong);
		border-radius: 5px;
		background: #fff;
		color: #fff;
		transition:
			background 120ms,
			border-color 120ms;
	}

	.natif:focus-visible + .case {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	.coche .case {
		border-color: var(--color-action-green);
		background: var(--color-action-green);
	}

	.coche .texte {
		color: var(--color-on-surface-muted);
	}
</style>
