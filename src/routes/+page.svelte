<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import CircleArrowRight from '@lucide/svelte/icons/circle-arrow-right';
	import Compass from '@lucide/svelte/icons/compass';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import { Shell, ModuleCard, ProgressBar } from '$lib/components';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { PHASES, TOTAL_CHECKPOINTS, modulesParPhase } from '$lib/data/curriculum';
	import { RYTHMES } from '$lib/data/methode';
	import { progression } from '$lib/progress.svelte';

	const courant = $derived(progression.moduleCourant);

	function reinitialiser() {
		if (confirm('Décocher tous les critères de validation ? Cette action est irréversible.')) {
			progression.reinitialiser();
		}
	}
</script>

<Shell active="parcours" title="Parcours">
	<section class="hero">
		<div class="hero-texte">
			<Badge variant="noir">Débutant complet · aucun prérequis</Badge>
			<h1>Apprendre le C depuis zéro</h1>
			<p>
				13 modules, ~90 heures, dans un ordre imposé par les dépendances réelles du langage : chaque
				module ne suppose acquis que les précédents. Le contenu n'est pas un cours à lire — c'est
				une liste de choses à taper, avec les pièges signalés à l'avance et un critère de validation
				par notion.
			</p>
			<div class="hero-actions">
				<Button href="/module/{courant.slug}" variant="bleu">
					{progression.total === 0 ? 'Commencer le module 1' : `Reprendre au module ${courant.num}`}
					<CircleArrowRight size={18} />
				</Button>
				<Button href="/methode" variant="noir">
					<Compass size={16} />
					Comment apprendre efficacement
				</Button>
			</div>
		</div>

		<Card.Root class="hero-carte">
			<Card.Header>
				<Card.Title>Ta progression</Card.Title>
			</Card.Header>
			<Card.Content class="flex flex-col gap-4">
				<div class="stats">
					<div>
						<span class="stat-valeur">{progression.modulesTermines}</span>
						<span class="stat-libelle">modules terminés</span>
					</div>
					<div>
						<span class="stat-valeur">{progression.total}</span>
						<span class="stat-libelle">critères sur {TOTAL_CHECKPOINTS}</span>
					</div>
					<div>
						<span class="stat-valeur">{progression.pourcentage}<small>%</small></span>
						<span class="stat-libelle">du parcours</span>
					</div>
				</div>

				<ProgressBar
					valeur={progression.total}
					total={TOTAL_CHECKPOINTS}
					libelle="Critères validés"
				/>

				<div class="prochain">
					<span class="prochain-label">Prochaine étape</span>
					<a href="/module/{courant.slug}">
						Module {courant.num} — {courant.titre}
						<ArrowRight size={14} />
					</a>
				</div>

				{#if progression.total > 0}
					<button class="reset" onclick={reinitialiser}>
						<RotateCcw size={12} />
						Réinitialiser la progression
					</button>
				{/if}
			</Card.Content>
		</Card.Root>
	</section>

	{#each PHASES as phase (phase.id)}
		<section class="phase">
			<header class="phase-tete">
				<span class="phase-puce" style="background: {phase.couleur}" aria-hidden="true"></span>
				<h2>Phase {phase.id} — {phase.titre}</h2>
			</header>
			<div class="phase-but">
				{#each phase.but as ligne (ligne)}
					<p>{ligne}</p>
				{/each}
			</div>

			<div class="grille">
				{#each modulesParPhase(phase.id) as module (module.slug)}
					<ModuleCard
						{module}
						couleur={phase.couleur}
						courant={module.slug === courant.slug && progression.pourcentage < 100}
					/>
				{/each}
			</div>
		</section>
	{/each}

	<section class="rythmes">
		<h2>Quel rythme tenir</h2>
		<p class="sous">
			Le parcours complet représente ~90 h de travail effectif. La régularité pèse plus que le
			volume : trois séances d'une heure battent un week-end de dix.
		</p>
		<div class="grille-rythmes">
			{#each RYTHMES as rythme (rythme.nom)}
				<Card.Root variant="gris">
					<Card.Header>
						<Card.Title>{rythme.nom}</Card.Title>
						<Card.Description>{rythme.cadence}</Card.Description>
					</Card.Header>
					<Card.Content>
						<div class="duree-totale">{rythme.duree}</div>
						<p class="note">{rythme.note}</p>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>
</Shell>

<style>
	.hero {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 24px;
		/* Les deux colonnes commencent et finissent sur la même ligne, quelle que soit
		   celle qui est la plus haute. */
		align-items: stretch;
	}

	.hero-texte {
		display: flex;
		flex-direction: column;
		/* space-between répartit le rab de hauteur à parts égales entre les trois écarts :
		   la colonne remplit la hauteur de la carte sans qu'un bloc respire plus qu'un autre. */
		justify-content: space-between;
		gap: 12px;
	}

	h1 {
		margin: 0;
		font-size: 30px;
		font-weight: 700;
		line-height: 1.15;
		letter-spacing: -0.01em;
	}

	.hero-texte p {
		max-width: 60ch;
		margin: 0;
		color: var(--color-on-surface-muted);
		font-size: 14.5px;
		line-height: 1.6;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
	}

	.stats > div {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	/* Chiffres en mono tabulaire : les trois colonnes gardent la même chasse quand les valeurs
	   changent (cf. tokens repris de kmax). */
	.stat-valeur {
		font-family: var(--font-mono);
		font-size: 22px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}

	.stat-valeur small {
		font-size: 13px;
		font-weight: 500;
	}

	.stat-libelle {
		color: var(--color-on-surface-muted);
		font-size: 11px;
		line-height: 1.3;
	}

	.prochain {
		display: flex;
		flex-direction: column;
		gap: 3px;
		padding: 10px 12px;
		border: 1px solid var(--color-tint-blue-border);
		border-radius: 8px;
		background: var(--color-tint-blue-bg);
	}

	.prochain-label {
		color: var(--color-tint-blue-text);
		font-size: 10.5px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.prochain a {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--color-tint-blue-text);
		font-size: 13.5px;
		font-weight: 600;
		text-decoration: none;
	}

	.prochain a:hover {
		text-decoration: underline;
	}

	.reset {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		align-self: flex-start;
		padding: 0;
		border: 0;
		background: none;
		color: var(--color-on-surface-muted);
		font-size: 11.5px;
		text-decoration: underline;
	}

	.reset:hover {
		color: var(--color-action-red);
	}

	.phase {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.phase-tete {
		display: flex;
		/* stretch et non center : le filet couvre exactement le bloc titre + sous-titre, donc son
		   haut s'aligne sur la ligne du titre quel que soit le nombre de lignes. */
		align-items: stretch;
		gap: 10px;
	}

	.phase-puce {
		flex-shrink: 0;
		width: 4px;
		border-radius: 2px;
	}

	.phase h2,
	.rythmes h2 {
		margin: 0;
		font-size: 18px;
		font-weight: 600;
	}

	.phase-but {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.phase-but p,
	.sous {
		margin: 0;
		color: var(--color-on-surface-muted);
		font-size: 13.5px;
		line-height: 1.6;
	}

	.grille {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 12px;
		margin-top: 4px;
	}

	.rythmes {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.grille-rythmes {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 12px;
	}

	.duree-totale {
		font-family: var(--font-mono);
		font-size: 16px;
		font-weight: 600;
	}

	.note {
		margin: 6px 0 0;
		color: var(--color-on-surface-muted);
		font-size: 12.5px;
		line-height: 1.5;
	}

	@media (max-width: 860px) {
		.hero {
			grid-template-columns: 1fr;
		}

		h1 {
			font-size: 24px;
		}
	}
</style>
