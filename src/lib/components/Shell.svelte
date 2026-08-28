<script lang="ts">
	import Topbar from './Topbar.svelte';

	interface Props {
		active?: string;
		title: string;
		breadcrumb?: string[];
		topRight?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
	}

	const { active, title, breadcrumb, topRight, children }: Props = $props();
</script>

<svelte:head>
	<title>{title} · Apprendre le C</title>
</svelte:head>

<div class="shell">
	<Topbar {active} right={topRight} />

	<main aria-label={title} class="main">
		{#if breadcrumb && breadcrumb.length > 0}
			<nav class="breadcrumb" aria-label="Fil d'Ariane">
				{#each breadcrumb as etape, i (etape)}
					{#if i > 0}<span aria-hidden="true">/</span>{/if}
					<span>{etape}</span>
				{/each}
			</nav>
		{/if}

		{@render children?.()}
	</main>
</div>

<style>
	.shell {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: var(--color-bg);
		font-family: var(--font-sans);
		color: var(--color-on-surface);
	}

	.main {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 24px;
		width: 100%;
		max-width: 1280px;
		min-height: 0;
		margin: 0 auto;
		padding: 24px;
	}

	.breadcrumb {
		display: flex;
		gap: 8px;
		margin-bottom: -8px;
		color: var(--color-on-surface-muted);
		font-size: 12px;
	}
</style>
