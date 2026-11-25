<script lang="ts">
    import { fade, scale } from "svelte/transition";
    import { flip } from "svelte/animate";
    import type { PageProps } from "./$types";
    import ItemCard from "$lib/components/wishlists/ItemCard/ItemCard.svelte";
    import type { ItemOnListDTO } from "$lib/dtos/item-dto";
    import { getFormatter } from "$lib/i18n";

    const { data }: PageProps = $props();
    const t = getFormatter();

    let items: ItemOnListDTO[] = $state(data.items);

    $effect(() => {
        items = data.items;
    });

    // Une seule vue : liste de texte, regroupée par personne
    const isTileView = false;

    const groupBy: string = "user";

    let groupedItems = $derived.by(() => {
        let groupedItems: Record<string, ItemOnListDTO[]> = { _default: items };
        if (groupBy === "purchased") {
            groupedItems = Object.groupBy(items, (it) => (myClaim(it)?.purchased ? "Purchased" : "_default"));
        } else if (groupBy === "user") {
            groupedItems = items.reduce(
                (accum, item) => {
                    (accum[item.user.name] ??= []).push(item);
                    return accum;
                },
                {} as Record<string, ItemOnListDTO[]>
            );
        }
        return Object.entries(groupedItems).toSorted(([categoryA], [categoryB]) => categoryA.localeCompare(categoryB));
    });

    const isPurchased = (item: ItemOnListDTO) => {
        return myClaim(item)?.purchased ? 1 : 0;
    };

    function myClaim(item: ItemOnListDTO) {
        return item.claims.find((c) => c.claimedBy?.id === data.user.id);
    }
</script>

<!-- Maquette « Papier » : pas de filtres ni de vues, juste la liste -->

{#if data.items.length === 0}
    <p class="paper-empty">{$t("wishes.nothing-claimed-yet")}</p>
{:else}
    <div class="paper-claims" data-testid="claims-container">
        {#each groupedItems as [category, items] (category)}
            {@const sortedItems =
                groupBy !== "purchased" ? items.toSorted((a, b) => isPurchased(a) - isPurchased(b)) : items}
            {#if category !== "_default"}
                <h2 class="paper-section" transition:fade>{category}</h2>
            {/if}
            <div
                class={[
                    isTileView ? "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" : "paper-list"
                ]}
                data-testid="category"
                transition:scale
            >
                {#each sortedItems as item (item.id)}
                    <div transition:fade animate:flip={{ duration: 200 }}>
                        <ItemCard
                            groupId={data.user.activeGroupId}
                            {isTileView}
                            {item}
                            requireClaimEmail
                            showClaimForOwner={data.config.claims.showForOwner}
                            showClaimedName
                            showFor
                            user={data.user}
                        />
                    </div>
                {/each}
            </div>
        {/each}
    </div>
{/if}

<svelte:head>
    <title>{$t("app.my-claims")}</title>
</svelte:head>
