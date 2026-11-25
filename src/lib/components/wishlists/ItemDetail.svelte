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

    interface Props extends Pick<InternalItemCardProps, "item" | "user" | "isSelfClaimable" | "showClaimForOwner"> {
        onClose: VoidFunction;
    }

    const { item, user, isSelfClaimable, showClaimForOwner, onClose }: Props = $props();
    const t = getFormatter();

    // La quantité n'a de sens que si plusieurs exemplaires sont souhaités (ou sans limite)
    const showQuantity = $derived(item.quantity !== 1);
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
    {#if showQuantity}
        <p class="paper-detail-fact">
            <span data-testid="quantity-desired">
                {item.quantity
                    ? $t("wishes.quantity-desired", { values: { quantity: item.quantity } })
                    : $t("wishes.no-limit")}
            </span>
            {#if showClaimed}
                · <span data-testid="quantity-claimed">
                    {$t("wishes.quantity-claimed", { values: { quantity: item.claimedQuantity } })}
                </span>
            {/if}
        </p>
    {/if}

    <ItemComments {isSelfClaimable} {item} {user} />

    <div class="paper-detail-actions">
        {#if item.approved && userCanEdit(item, user?.id)}
            <button class="paper-link" onclick={edit} type="button">{$t("wishes.edit")}</button>
        {/if}
        <button class="paper-link" onclick={onClose} type="button">{$t("general.close-detail")}</button>
    </div>
</div>
