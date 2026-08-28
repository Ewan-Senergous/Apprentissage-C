<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';

	export const badgeVariants = tv({
		base: 'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-sm border px-2.5 py-0.5 text-xs font-medium transition-[color,box-shadow] [&>svg]:pointer-events-none [&>svg]:size-3',
		variants: {
			variant: {
				default:
					'bg-[var(--color-primary-100)] text-[var(--color-primary-700)] border-[var(--color-primary-300)]',
				rouge:
					'bg-[var(--color-tint-rouge-bg)] text-[var(--color-tint-rouge-text)] border-[var(--color-tint-rouge-border)]',
				vert: 'bg-[var(--color-tint-vert-bg)] text-[var(--color-tint-vert-text)] border-[var(--color-tint-vert-border)]',
				bleu: 'bg-[var(--color-tint-blue-bg)] text-[var(--color-tint-blue-text)] border-[var(--color-tint-blue-border)]',
				noir: 'bg-[var(--color-tint-noir-bg)] text-[var(--color-tint-noir-text)] border-[var(--color-tint-noir-border)]',
				orange:
					'bg-[var(--color-tint-orange-bg)] text-[var(--color-tint-orange-text)] border-[var(--color-tint-orange-border)]',
				jaune:
					'bg-[var(--color-tint-jaune-bg)] text-[var(--color-tint-jaune-text)] border-[var(--color-tint-jaune-border)]',
				purple:
					'bg-[var(--color-tint-purple-bg)] text-[var(--color-tint-purple-text)] border-[var(--color-tint-purple-border)]',
				blanc: 'bg-white text-gray-800 border-gray-300'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = 'default',
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
	} = $props();
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
