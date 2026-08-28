<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';

	export const alertVariants = tv({
		base: 'relative grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 rounded-lg border px-4 py-3 text-sm [&>svg]:size-4 [&>svg]:translate-y-0.5',
		variants: {
			variant: {
				info: 'bg-[var(--color-tint-blue-bg)] text-[var(--color-tint-blue-text)] border-[var(--color-tint-blue-border)]',
				success:
					'bg-[var(--color-tint-vert-bg)] text-[var(--color-tint-vert-text)] border-[var(--color-tint-vert-border)]',
				warning:
					'bg-[var(--color-tint-jaune-bg)] text-[var(--color-tint-jaune-text)] border-[var(--color-tint-jaune-border)]',
				destructive:
					'bg-[var(--color-tint-rouge-bg)] text-[var(--color-tint-rouge-text)] border-[var(--color-tint-rouge-border)]'
			}
		},
		defaultVariants: {
			variant: 'info'
		}
	});

	export type AlertVariant = VariantProps<typeof alertVariants>['variant'];
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'info',
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { variant?: AlertVariant } = $props();
</script>

<div
	bind:this={ref}
	data-slot="alert"
	role="note"
	class={cn(alertVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
