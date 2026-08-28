<script lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Target from '@lucide/svelte/icons/target';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import FileCode from '@lucide/svelte/icons/file-code';
	import { Shell, CodeBlock, Checklist, ProgressBar } from '$lib/components';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import { PHASES, type Niveau } from '$lib/data/curriculum';
	import { progression } from '$lib/progress.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	const module = $derived(data.module);
	const phase = $derived(PHASES.find((p) => p.id === module.phase)!);
	const valides = $derived(progression.valides(module.slug));
	const termine = $derived(valides === module.checkpoint.length);

	// Le niveau d'un exercice porte une couleur constante dans tout le parcours : guidé = on
	// t'accompagne, seul = tu produis, défi = tu dois chercher.
	const variantNiveau: Record<Niveau, 'vert' | 'bleu' | 'orange'> = {
		guidé: 'vert',
		seul: 'bleu',
		défi: 'orange'
	};
</script>

<Shell
	active="parcours"
	title="Module {module.num} — {module.titre}"
	breadcrumb={['Parcours', `Phase ${phase.id} · ${phase.titre}`, `Module ${module.num}`]}
>
	<header class="entete">
		<div class="entete-texte">
			<div class="ligne-badges">
				<span class="num" style="color: {phase.couleur}"
					>MODULE {String(module.num).padStart(2, '0')}</span
				>
				<Badge variant="noir">{module.duree}</Badge>
				{#if termine}<Badge variant="vert">terminé</Badge>{/if}
			</div>
			<h1>{module.titre}</h1>
			<p class="accroche">{module.accroche}</p>
		</div>

		<div class="entete-progres">
			<ProgressBar
				valeur={valides}
				total={module.checkpoint.length}
				couleur={phase.couleur}
				libelle="Critères validés"
			/>
		</div>
	</header>

	<Alert.Root variant="info">
		<Target size={16} aria-hidden="true" />
		<Alert.Title>Objectif du module</Alert.Title>
		<Alert.Description>{module.objectif}</Alert.Description>
	</Alert.Root>

	{#if module.snippet}
		<section>
			<h2>Le code de référence</h2>
			<CodeBlock
				code={module.snippet.code}
				titre={module.snippet.titre}
				note={module.snippet.note}
			/>
		</section>
	{/if}

	<section>
		<h2>Ce qu'il faut comprendre</h2>
		<dl class="notions">
			{#each module.notions as notion (notion.nom)}
				<div class="notion">
					<dt>{notion.nom}</dt>
					<dd>{notion.detail}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<section>
		<h2 class="avec-icone">
			<TriangleAlert size={17} aria-hidden="true" />
			Les pièges classiques
		</h2>
		<p class="sous">
			Chacun de ces pièges compile sans erreur. Lis-les AVANT de coder les exercices : c'est là que
			se perdent les heures.
		</p>
		<div class="pieges">
			{#each module.pieges as piege (piege.titre)}
				<div class="piege">
					<strong>{piege.titre}</strong>
					<p>{piege.detail}</p>
				</div>
			{/each}
		</div>
	</section>

	<section>
		<h2>Les exercices</h2>
		<p class="sous">
			À taper à la main, dans le fichier indiqué, compilés avec
			<code>-Wall -Wextra</code>. Un exercice compris mais non tapé compte comme non fait.
		</p>
		<div class="exercices">
			{#each module.exercices as exercice (exercice.titre)}
				<Card.Root>
					<Card.Header>
						<div class="ex-tete">
							<Card.Title>{exercice.titre}</Card.Title>
							<Badge variant={variantNiveau[exercice.niveau]}>{exercice.niveau}</Badge>
						</div>
					</Card.Header>
					<Card.Content>
						<p class="enonce">{exercice.enonce}</p>
						<div class="fichier">
							<FileCode size={13} aria-hidden="true" />
							<code>{exercice.fichier}</code>
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>

	<section>
		<h2>Critères de validation</h2>
		<p class="sous">
			Coche seulement ce que tu sais faire SANS regarder le module. Un critère coché à tort ne
			trompe que toi — et se paiera deux modules plus loin.
		</p>
		<Card.Root>
			<Card.Content>
				<Checklist slug={module.slug} items={module.checkpoint} />
			</Card.Content>
		</Card.Root>

		{#if termine}
			<Alert.Root variant="success" class="mt-3">
				<Alert.Title>Module validé</Alert.Title>
				<Alert.Description>
					Avant de passer au suivant : refais un exercice de ce module de mémoire dans 3 jours, puis
					dans une semaine. C'est le rappel espacé qui grave la notion, pas la relecture.
				</Alert.Description>
			</Alert.Root>
		{/if}
	</section>

	<nav class="navigation" aria-label="Modules voisins">
		{#if data.precedent}
			<Button href="/module/{data.precedent.slug}" variant="blanc" size="sm">
				<ArrowLeft size={15} />
				{data.precedent.num}. {data.precedent.titre}
			</Button>
		{:else}
			<span></span>
		{/if}

		{#if data.suivant}
			<Button href="/module/{data.suivant.slug}" variant="blanc" size="sm">
				{data.suivant.num}. {data.suivant.titre}
				<ArrowRight size={15} />
			</Button>
		{/if}
	</nav>
</Shell>

<style>
	.entete {
		display: grid;
		grid-template-columns: 1fr 260px;
		gap: 24px;
		align-items: end;
	}

	.entete-texte {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.ligne-badges {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.num {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.08em;
	}

	h1 {
		margin: 0;
		font-size: 27px;
		font-weight: 700;
		line-height: 1.15;
		letter-spacing: -0.01em;
	}

	.accroche {
		max-width: 65ch;
		margin: 0;
		color: var(--color-on-surface-muted);
		font-size: 14.5px;
		line-height: 1.55;
	}

	h2 {
		margin: 0 0 8px;
		font-size: 17px;
		font-weight: 600;
	}

	.avec-icone {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.sous {
		max-width: 78ch;
		margin: -4px 0 12px;
		color: var(--color-on-surface-muted);
		font-size: 13px;
		line-height: 1.55;
	}

	.sous code {
		padding: 1px 5px;
		border-radius: 4px;
		background: var(--color-surface-gray);
		font-family: var(--font-mono);
		font-size: 11.5px;
	}

	.notions {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 10px;
		margin: 0;
	}

	.notion {
		padding: 14px 16px;
		border: 1px solid var(--color-border);
		border-radius: 10px;
		background: var(--color-surface);
	}

	.notion dt {
		margin-bottom: 5px;
		font-size: 14px;
		font-weight: 600;
	}

	.notion dd {
		margin: 0;
		color: var(--color-on-surface-muted);
		font-size: 13.5px;
		line-height: 1.6;
	}

	.pieges {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	/* Filet jaune à gauche : le piège se repère au coin de l'œil en scrollant, sans le lire. */
	.piege {
		padding: 12px 14px;
		border: 1px solid var(--color-tint-jaune-border);
		border-left: 4px solid var(--color-action-yellow);
		border-radius: 8px;
		background: var(--color-tint-jaune-bg);
	}

	.piege strong {
		display: block;
		margin-bottom: 3px;
		color: var(--color-tint-jaune-text);
		font-size: 13.5px;
	}

	.piege p {
		margin: 0;
		color: var(--color-tint-jaune-text);
		font-size: 13px;
		line-height: 1.55;
		opacity: 0.92;
	}

	.exercices {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 12px;
	}

	.ex-tete {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 10px;
	}

	.enonce {
		margin: 0 0 10px;
		color: var(--color-on-surface-muted);
		font-size: 13.5px;
		line-height: 1.55;
	}

	.fichier {
		display: flex;
		align-items: center;
		gap: 6px;
		padding-top: 8px;
		border-top: 1px dashed var(--color-border);
		color: var(--color-on-surface-muted);
	}

	.fichier code {
		font-family: var(--font-mono);
		font-size: 11.5px;
		word-break: break-all;
	}

	.navigation {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		padding-top: 12px;
		border-top: 1px solid var(--color-border);
	}

	@media (max-width: 860px) {
		.entete {
			grid-template-columns: 1fr;
			align-items: start;
		}

		h1 {
			font-size: 22px;
		}
	}
</style>
