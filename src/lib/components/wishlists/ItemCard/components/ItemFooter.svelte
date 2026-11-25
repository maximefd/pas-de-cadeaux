<script lang="ts">
    import ClaimButtons from "../ClaimButtons.svelte";
    import type { InternalItemCardProps } from "../ItemCard.svelte";
    import ManageButtons from "../ManageButtons.svelte";
    import RemoveButton from "../RemoveButton.svelte";
    import ReorderButtons from "../ReorderButtons.svelte";

    interface Props extends Omit<InternalItemCardProps, "id" | "defaultImage"> {
        onEdit?: VoidFunction;
        noPadding?: boolean;
    }

    const props: Props = $props();

    let isClaimButtonVisible = $state(false);

    // Hors de chez la personne concernée, « Retirer » demande pourquoi (offert ou plus d'actualité)
    const asksWhy = $derived(
        !!props.user &&
            props.item.approved &&
            props.item.userId !== props.user.id &&
            !props.item.list.managers.some((m) => m.userId === props.user!.id)
    );
</script>

<footer
    class={[
        "flex items-center gap-2 print:hidden",
        props.noPadding ? "px-0" : "px-4",
        props.reorderActions ? "justify-center pb-0" : "justify-between pb-4",
        isClaimButtonVisible && "flex-wrap"
    ]}
>
    {#if props.reorderActions}
        <ReorderButtons {...props} />
    {:else}
        <ClaimButtons isClaimableOrClaimed={(ans) => (isClaimButtonVisible = ans)} {...props} />
        <div class="flex flex-row items-center gap-2">
            {#if asksWhy}
                <RemoveButton item={props.item} user={props.user} userCanManage={props.userCanManage} />
            {/if}
            <ManageButtons {...props} hideDelete={asksWhy} />
        </div>
    {/if}
</footer>
