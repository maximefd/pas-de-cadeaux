<script lang="ts">
    // Détail d'une idée, déplié sous sa ligne (look « Papier ») : pas de fenêtre, pas d'image.
    // On n'y montre que ce que la ligne ne montre pas déjà : commentaires, et « Modifier » si on peut.
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import { getFormatter } from "$lib/i18n";
    import { userCanEdit } from "$lib/item-util";
    import { formatPrice } from "$lib/price-formatter";
    import type { InternalItemCardProps } from "./ItemCard/ItemCard.svelte";
    import ItemComments from "./ItemComments.svelte";

    type Props = Pick<InternalItemCardProps, "item" | "user" | "isSelfClaimable" | "showClaimForOwner">;

    const { item, user, isSelfClaimable, showClaimForOwner }: Props = $props();
    const t = getFormatter();

    // On n'affiche la quantité que si plusieurs exemplaires sont souhaités, et le nombre de réservés que s'il y en a
    const showQuantity = $derived((item.quantity ?? 1) > 1);
    const showClaimed = $derived(user?.id !== item.userId || showClaimForOwner);

    const edit = () =>
        goto(resolve("/items/[itemId]/edit", { itemId: item.id.toString() }) + `?redirectTo=${page.url.pathname}`, {
            replaceState: true
        });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="paper-detail" data-testid="item-detail" onclick={(e) => e.stopPropagation()}>
    {#if item.price || item.itemPrice}
        <p class="paper-detail-fact" data-testid="price">{formatPrice(item)}</p>
    {/if}
    {#if showQuantity || (showClaimed && item.claimedQuantity > 0)}
        <p class="paper-detail-fact">
            {#if showQuantity}
                <span data-testid="quantity-desired">
                    {$t("wishes.quantity-desired", { values: { quantity: item.quantity } })}
                </span>
            {/if}
            {#if showQuantity && showClaimed && item.claimedQuantity > 0}·{/if}
            {#if showClaimed && item.claimedQuantity > 0}
                <span data-testid="quantity-claimed">
                    {$t("wishes.quantity-claimed", { values: { quantity: item.claimedQuantity } })}
                </span>
            {/if}
        </p>
    {/if}

    <ItemComments {isSelfClaimable} {item} {user} />

    {#if item.approved && userCanEdit(item, user?.id)}
        <div class="paper-detail-actions">
            <button class="paper-link" onclick={edit} type="button">{$t("wishes.edit")}</button>
        </div>
    {/if}
</div>
