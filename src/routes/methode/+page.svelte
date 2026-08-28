<script lang="ts">
	import Bot from '@lucide/svelte/icons/bot';
	import CircleAlert from '@lucide/svelte/icons/circle-alert';
	import Clock from '@lucide/svelte/icons/clock';
	import { Shell } from '$lib/components';
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { PIEGES_DE_PARCOURS, PRINCIPES, SEANCE } from '$lib/data/methode';

	const totalMinutes = SEANCE.reduce((n, e) => n + e.minutes, 0);
</script>

<Shell active="methode" title="Méthode" breadcrumb={['Parcours', 'Méthode']}>
	<header class="entete">
		<h1>Comment apprendre efficacement</h1>
		<p>
			Le contenu du parcours est la moitié facile ; celle-ci décide du résultat. Huit principes,
			tous appliqués aux modules : la séance type produit les exercices, les rappels espacés portent
			sur les critères de validation, la règle des 20 minutes encadre l'usage de l'assistant.
		</p>
	</header>

	<section>
		<h2 class="avec-icone">
			<Clock size={17} aria-hidden="true" />
			La séance type ({totalMinutes} min)
		</h2>
		<p class="sous">
			Le ratio compte plus que la durée : environ 20 % de lecture, 65 % de clavier. Si tu n'as que
			30 minutes, garde les proportions — ne supprime pas le clavier.
		</p>

		<ol class="seance">
			{#each SEANCE as etape, i (etape.titre)}
				<li>
					<div class="minute">
						<span class="chiffre">{etape.minutes}</span>
						<span class="unite">min</span>
					</div>
					<div class="etape-corps">
						<strong>{i + 1}. {etape.titre}</strong>
						<p>{etape.detail}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>

	<section>
		<h2>Les huit principes</h2>
		<div class="principes">
			{#each PRINCIPES as principe (principe.id)}
				<Card.Root>
					<Card.Header>
						<Card.Title>{principe.titre}</Card.Title>
						<Card.Description class="regle">{principe.regle}</Card.Description>
					</Card.Header>
					<Card.Content>
						<p class="pourquoi"><span class="etiquette">Pourquoi</span>{principe.pourquoi}</p>
						<ul class="pratique">
							{#each principe.enPratique as ligne (ligne)}
								<li>{ligne}</li>
							{/each}
						</ul>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>

	<section>
		<h2 class="avec-icone">
			<Bot size={17} aria-hidden="true" />
			Utiliser un assistant IA sans saboter l'apprentissage
		</h2>
		<p class="sous">
			Le dépôt contient un <code>CLAUDE.md</code> qui met l'assistant en mode tuteur : il ne donne
			pas de code d'exercice, il pose des questions et signale la ligne à regarder — au besoin en te
			renvoyant la question « tu t'attendais à voir quoi, et qu'est-ce qui se passe à la place ? ».
			C'est volontaire, et ce n'est pas de la théorie : l'essai contrôlé de Harvard sur le tuteur
			PS2 Pal (Kestin & Miller,
			<em>Scientific Reports</em>, 2025) mesure un apprentissage ~2× plus rapide, précisément parce
			que le tuteur ne donnait jamais la réponse. Il finira par céder si tu insistes trois fois —
			c'est à toi de ne pas insister.
		</p>

		<div class="deux-colonnes">
			<div class="colonne oui">
				<h3>Demande ça</h3>
				<ul>
					<li>« Explique-moi ce message d'erreur, sans corriger mon code. »</li>
					<li>« Pourquoi mon programme affiche 5 alors que j'attendais 10 ? »</li>
					<li>« Quelle est la différence entre <code>p</code> et <code>*p</code> ici ? »</li>
					<li>« Donne-moi 3 exercices de plus sur les listes chaînées. »</li>
					<li>« Relis mon code et dis-moi ce qui est fragile, sans le réécrire. »</li>
					<li>« Interroge-moi sur le module 6. »</li>
				</ul>
			</div>
			<div class="colonne non">
				<h3>Évite ça</h3>
				<ul>
					<li>« Écris-moi la fonction qui inverse une liste chaînée. »</li>
					<li>« Corrige mon code. » (avant d'avoir cherché 20 minutes)</li>
					<li>« Fais l'exercice 3 du module 7. »</li>
					<li>« Refais ce programme en mieux. »</li>
					<li>Coller un code reçu sans pouvoir l'expliquer ligne par ligne.</li>
				</ul>
			</div>
		</div>

		<Alert.Root variant="warning" class="mt-3">
			<CircleAlert size={16} aria-hidden="true" />
			<Alert.Title>Le test de l'explication</Alert.Title>
			<Alert.Description>
				Avant de garder une ligne dans ton code — la tienne ou une reçue — demande-toi si tu peux
				dire ce qu'elle fait ET pourquoi elle est là. Si non, elle ne rentre pas.
			</Alert.Description>
		</Alert.Root>
	</section>

	<section>
		<h2>Ce qui fait échouer les débutants en C</h2>
		<p class="sous">
			Indépendamment du contenu appris. Cinq de ces six pièges concernent l'organisation, pas le
			langage.
		</p>
		<div class="pieges">
			{#each PIEGES_DE_PARCOURS as piege (piege.titre)}
				<div class="piege">
					<Badge variant="rouge">à éviter</Badge>
					<div>
						<strong>{piege.titre}</strong>
						<p>{piege.detail}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
</Shell>

<style>
	.entete {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	h1 {
		margin: 0;
		font-size: 28px;
		font-weight: 700;
		line-height: 1.15;
		letter-spacing: -0.01em;
	}

	.entete p {
		max-width: 72ch;
		margin: 0;
		color: var(--color-on-surface-muted);
		font-size: 14.5px;
		line-height: 1.6;
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

	.sous code,
	.colonne code {
		padding: 1px 5px;
		border-radius: 4px;
		background: var(--color-surface-gray);
		font-family: var(--font-mono);
		font-size: 11.5px;
	}

	.seance {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
		counter-reset: etape;
	}

	.seance li {
		display: flex;
		gap: 14px;
		align-items: flex-start;
		padding: 12px 14px;
		border: 1px solid var(--color-border);
		border-radius: 10px;
		background: var(--color-surface);
	}

	.minute {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 52px;
		padding: 6px 0;
		border-radius: 8px;
		background: var(--color-primary-50);
		color: var(--color-primary-700);
	}

	.chiffre {
		font-family: var(--font-mono);
		font-size: 18px;
		font-weight: 600;
		line-height: 1;
	}

	.unite {
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.etape-corps strong {
		display: block;
		margin-bottom: 3px;
		font-size: 14px;
	}

	.etape-corps p {
		max-width: 76ch;
		margin: 0;
		color: var(--color-on-surface-muted);
		font-size: 13.5px;
		line-height: 1.55;
	}

	.principes {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 12px;
	}

	.principes :global(.regle) {
		color: var(--color-on-surface);
		font-weight: 500;
	}

	.pourquoi {
		margin: 0 0 10px;
		color: var(--color-on-surface-muted);
		font-size: 13.5px;
		line-height: 1.6;
	}

	.etiquette {
		display: inline-block;
		margin-right: 8px;
		padding: 1px 6px;
		border-radius: 4px;
		background: var(--color-surface-gray);
		color: var(--color-on-surface);
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		vertical-align: 1px;
	}

	.pratique {
		margin: 0;
		padding-left: 18px;
		color: var(--color-on-surface);
		font-size: 13px;
		line-height: 1.65;
	}

	.deux-colonnes {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 12px;
	}

	.colonne {
		padding: 14px 16px;
		border: 1px solid var(--color-border);
		border-radius: 10px;
	}

	.colonne h3 {
		margin: 0 0 8px;
		font-size: 14px;
		font-weight: 600;
	}

	.colonne ul {
		margin: 0;
		padding-left: 18px;
		font-size: 13px;
		line-height: 1.7;
	}

	.oui {
		border-color: var(--color-tint-vert-border);
		background: var(--color-tint-vert-bg);
	}

	.oui h3 {
		color: var(--color-tint-vert-text);
	}

	.non {
		border-color: var(--color-tint-rouge-border);
		background: var(--color-tint-rouge-bg);
	}

	.non h3 {
		color: var(--color-tint-rouge-text);
	}

	.pieges {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.piege {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		padding: 12px 14px;
		border: 1px solid var(--color-border);
		border-radius: 10px;
		background: var(--color-surface);
	}

	.piege strong {
		display: block;
		margin-bottom: 3px;
		font-size: 13.5px;
	}

	.piege p {
		max-width: 76ch;
		margin: 0;
		color: var(--color-on-surface-muted);
		font-size: 13px;
		line-height: 1.55;
	}

	@media (max-width: 860px) {
		h1 {
			font-size: 23px;
		}
	}
</style>
