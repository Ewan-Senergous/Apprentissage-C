<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: "inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-lg text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				bleu: 'text-white bg-blue-700 hover:bg-blue-800 focus-visible:ring-4 focus-visible:outline-none focus-visible:ring-blue-300',
				vert: 'text-white bg-green-700 hover:bg-green-800 focus-visible:ring-4 focus-visible:outline-none focus-visible:ring-green-300',
				rouge:
					'text-white bg-red-700 hover:bg-red-800 focus-visible:ring-4 focus-visible:outline-none focus-visible:ring-red-300',
				noir: 'text-white bg-gray-800 hover:bg-gray-900 focus-visible:ring-4 focus-visible:outline-none focus-visible:ring-gray-400',
				blanc:
					'text-gray-900 bg-white border border-gray-900 hover:bg-gray-100 focus-visible:ring-4 focus-visible:outline-none focus-visible:ring-gray-300',
				link: 'text-[var(--color-primary-700)] underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-10 px-5 py-2.5',
				sm: 'h-8 px-3 py-2 text-sm',
				xs: 'h-7 px-2 py-1 text-xs',
				lg: 'h-12 px-5 py-3 text-base',
				icon: 'h-10 p-2.5'
			}
		},
		defaultVariants: {
			variant: 'bleu',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'bleu',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
