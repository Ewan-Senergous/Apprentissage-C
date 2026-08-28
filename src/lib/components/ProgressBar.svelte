<script lang="ts">
	interface Props {
		valeur: number;
		total: number;
		couleur?: string;
		/** Libellé affiché au-dessus de la barre. Absent = barre seule (usage en carte). */
		libelle?: string;
		hauteur?: number;
	}

	const {
		valeur,
		total,
		couleur = 'var(--color-primary-500)',
		libelle,
		hauteur = 8
	}: Props = $props();

	const pct = $derived(total === 0 ? 0 : Math.round((valeur / total) * 100));
</script>

<div class="wrap">
	{#if libelle}
		<div class="tete">
			<span>{libelle}</span>
			<span class="chiffre">{valeur}/{total}</span>
		</div>
	{/if}

	<div
		class="piste"
		style="height: {hauteur}px"
		role="progressbar"
		aria-valuenow={valeur}
		aria-valuemin="0"
		aria-valuemax={total}
		aria-label={libelle ?? 'Progression'}
	>
		<div class="jauge" style="width: {pct}%; background: {couleur}"></div>
	</div>
</div>

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 100%;
	}

	.tete {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px;
		font-size: 12px;
		color: var(--color-on-surface-muted);
	}

	/* Chiffres en mono : les compteurs de plusieurs cartes s'alignent verticalement. */
	.chiffre {
		font-family: var(--font-mono);
		font-size: 11.5px;
		font-variant-numeric: tabular-nums;
	}

	.piste {
		width: 100%;
		overflow: hidden;
		border-radius: 999px;
		background: var(--color-surface-gray);
	}

	.jauge {
		height: 100%;
		border-radius: 999px;
		transition: width 180ms ease-out;
	}
</style>
