<script lang="ts">
	import Keyboard from '@lucide/svelte/icons/keyboard';

	interface Props {
		code: string;
		titre?: string;
		note?: string;
		/** Langage affiché sur l'onglet. Purement informatif, aucune coloration syntaxique. */
		langage?: string;
		/** Rappel « à retaper » : vrai pour du code d'apprentissage, faux pour une commande
		    d'installation (là, copier est le geste normal). */
		retaper?: boolean;
	}

	const { code, titre, note, langage = 'C', retaper = true }: Props = $props();
</script>

<!-- Volontairement SANS bouton « copier » : le parcours repose sur le fait de retaper le code
     (cf. /methode, principe « le clavier avant les yeux »). Un bouton copier annulerait
     l'exercice d'un clic. -->
<figure class="bloc">
	{#if titre}
		<figcaption class="entete">
			<span class="titre">{titre}</span>
			<span class="langue">{langage}</span>
		</figcaption>
	{/if}

	<pre class="code"><code>{code}</code></pre>

	{#if retaper || note}
		<div class="pied">
			{#if retaper}
				<Keyboard size={13} aria-hidden="true" />
				<span>À retaper, pas à copier.</span>
			{/if}
			{#if note}<span class="note">{note}</span>{/if}
		</div>
	{/if}
</figure>

<style>
	.bloc {
		margin: 0;
		overflow: hidden;
		border: 1px solid var(--color-code-bg);
		border-radius: 12px;
		background: var(--color-code-bg);
	}

	.entete {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 14px;
		border-bottom: 1px solid rgb(255 255 255 / 0.12);
		color: var(--color-code-text);
		font-size: 12px;
		font-weight: 500;
	}

	.langue {
		flex-shrink: 0;
		padding: 1px 7px;
		border: 1px solid rgb(255 255 255 / 0.2);
		border-radius: 4px;
		color: var(--color-code-muted);
		font-family: var(--font-mono);
		font-size: 10px;
	}

	/* Le code déborde DANS son cadre, jamais la page (cf. app.css : la mise en page ne doit
	   pas bouger quand une ligne est longue). */
	.code {
		margin: 0;
		padding: 14px;
		overflow-x: auto;
		color: var(--color-code-text);
		font-family: var(--font-mono);
		font-size: 13px;
		line-height: 1.65;
		tab-size: 4;
	}

	.pied {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		padding: 8px 14px;
		border-top: 1px solid rgb(255 255 255 / 0.12);
		background: rgb(255 255 255 / 0.04);
		color: var(--color-code-muted);
		font-size: 11.5px;
	}

	.note {
		flex: 1;
		min-width: 200px;
		font-family: var(--font-mono);
		font-size: 11px;
	}
</style>
