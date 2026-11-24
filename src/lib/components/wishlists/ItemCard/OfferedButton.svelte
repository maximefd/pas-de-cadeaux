<script lang="ts">
    import type { InternalItemCardProps } from "./ItemCard.svelte";
    import { getFormatter } from "$lib/i18n";
    import { toaster } from "$lib/components/toaster";

    type Props = Pick<InternalItemCardProps, "item" | "user" | "isSelfClaimable">;

    let { item, user, isSelfClaimable = false }: Props = $props();

    const t = getFormatter();

    // Owners and managers never get the button (nor the state) unless the list is a self-claim list
    let canToggle = $derived(
        !!user &&
            (isSelfClaimable || (item.userId !== user.id && !item.list.managers.some((m) => m.userId === user.id)))
    );

    const toggle = async (e: MouseEvent) => {
        e.stopPropagation();
        const offered = !item.offered;
        const resp = await fetch(`/pdc/lists/${item.list.id}/items/${item.id}/offered`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ offered })
        });
        if (resp.ok) {
            item.offered = offered;
        } else {
            toaster.error({ description: await resp.text() });
        }
    };
</script>

{#if canToggle}
    <button
        class={["btn btn-sm md:btn inset-ring-secondary-500 inset-ring", item.offered && "preset-tonal-secondary"]}
        aria-pressed={item.offered}
        onclick={toggle}
    >
        <iconify-icon icon={item.offered ? "ion:gift" : "ion:gift-outline"}></iconify-icon>
        {$t("wishes.offered")}
    </button>
{/if}
