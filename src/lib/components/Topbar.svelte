<script lang="ts">
	import House from '@lucide/svelte/icons/house';
	import Compass from '@lucide/svelte/icons/compass';
	import { Badge } from './ui/badge';
	import { progression } from '$lib/progress.svelte';
	import { MODULES } from '$lib/data/curriculum';

	interface Props {
		active?: string;
		right?: import('svelte').Snippet;
	}

	const { active, right }: Props = $props();

	type Item = { id: string; label: string; href: string; icon: typeof House };

	const items: Item[] = [
		{ id: 'parcours', label: 'Parcours', href: '/', icon: House },
		{ id: 'methode', label: 'Méthode', href: '/methode', icon: Compass }
	];
</script>

<header class="topbar">
	<div class="navbar">
		<a class="brand" href="/" aria-label="Accueil — Apprendre le C">
			<span class="brand-mark" aria-hidden="true">C</span>
			<span class="brand-copy">
				<strong class="brand-name">APPRENDRE LE C</strong>
				<small>Parcours débutant, de zéro au projet</small>
			</span>
		</a>

		<nav class="nav-links" aria-label="Navigation principale">
			{#each items as item (item.id)}
				{@const isActive = active === item.id}
				{@const Icon = item.icon}
				<a
					class="nav-link"
					class:active={isActive}
					href={item.href}
					aria-current={isActive ? 'page' : undefined}
				>
					<Icon size={16} />
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>

		<div class="spacer"></div>

		<div class="right">
			{@render right?.()}
			<!-- La progression reste visible sur TOUTES les pages : c'est le seul repère de
			     position dans un parcours de plusieurs mois. -->
			<Badge variant={progression.pourcentage === 100 ? 'vert' : 'bleu'}>
				{progression.modulesTermines}/{MODULES.length} modules · {progression.pourcentage} %
			</Badge>
		</div>
	</div>
</header>

<style>
	.topbar {
		position: sticky;
		top: 0;
		z-index: 30;
		flex-shrink: 0;
		background: #fff;
		border-bottom: 1px solid var(--color-on-surface);
	}

	.navbar {
		display: flex;
		align-items: center;
		gap: 12px;
		min-height: 64px;
		padding: 0 24px;
	}

	.brand {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		gap: 10px;
		color: inherit;
		text-decoration: none;
	}

	.brand-mark {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		flex-shrink: 0;
		border-radius: 8px;
		background: var(--color-primary-500);
		color: #fff;
		font-family: var(--font-mono);
		font-size: 18px;
		font-weight: 600;
	}

	.brand-copy {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
	}

	.brand-name {
		font-size: 15px;
		letter-spacing: 0.02em;
	}

	.brand-copy small {
		margin-top: 2px;
		color: var(--color-on-surface-muted);
		font-size: 11px;
		white-space: nowrap;
	}

	.nav-links {
		display: flex;
		align-self: stretch;
		align-items: center;
		min-width: 0;
		margin-left: 12px;
		overflow-x: auto;
		scrollbar-width: thin;
	}

	.nav-link {
		position: relative;
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		gap: 7px;
		height: 100%;
		padding: 0 12px;
		color: var(--color-on-surface-muted);
		font-size: 13px;
		font-weight: 500;
		text-decoration: none;
		white-space: nowrap;
	}

	.nav-link::after {
		position: absolute;
		right: 4px;
		bottom: 8px;
		left: 4px;
		height: 3px;
		border-radius: 3px 3px 0 0;
		background: transparent;
		content: '';
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--color-primary-700);
	}

	.nav-link.active::after {
		background: var(--color-primary-500);
	}

	.spacer {
		flex: 1;
	}

	.right {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 10px;
	}

	/* Tablette et en dessous : le sous-titre de marque part en premier, il est décoratif. */
	@media (max-width: 900px) {
		.brand-copy small {
			display: none;
		}

		.navbar {
			padding: 0 12px;
		}
	}
</style>
