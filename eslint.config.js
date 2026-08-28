import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import svelteConfig from './svelte.config.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],
			// Le site n'a que des liens internes en dur, pas de router typé à résoudre.
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	{
		// Modules runiques `*.svelte.ts` (ici `src/lib/progress.svelte.ts`) : eslint-plugin-svelte
		// leur assigne son propre parser pour le support des runes, mais sans le pointer vers TS →
		// toute annotation de type y casse le parsing (« Unexpected token : »). Même correctif que
		// pour les `.svelte` ci-dessus.
		files: ['**/*.svelte.ts'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: ['.svelte-kit/', 'build/', 'dist/', 'node_modules/', 'exercices/']
	}
];
