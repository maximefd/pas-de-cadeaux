<script lang="ts">
    import type { PageData, PageProps } from "./$types";
    import { hash, hashItems, viewedItems } from "$lib/stores/viewed-items";
    import ListRow from "$lib/components/papier/ListRow.svelte";
    import CircleTabs from "$lib/components/papier/CircleTabs.svelte";
    import { page } from "$app/state";
    import { getFormatter } from "$lib/i18n";

    type ListData = PageData["otherLists"][0];

    let { data }: PageProps = $props();

    const t = getFormatter();

    const hasNewItems = async (list: ListData) => {
        if (!list.items || list.items.length === 0) return false;
        const userHash = await hash(list.id);
        const currentHash = await hashItems(list.items);
        const viewedHash = viewedItems.current[userHash];
        return currentHash !== viewedHash;
    };
</script>

<!-- « Mes proches » : une ligne par personne du cercle, sa liste s'ouvre d'un clic. -->
<CircleTabs groups={page.data.groups} user={page.data.user} />

{#if data.otherLists.length === 0}
    <p class="paper-empty" data-testid="list-container-empty">{$t("wishes.no-relatives-yet")}</p>
{:else}
    <div data-testid="list-container">
        {#each data.otherLists as list (list.id)}
            {#await hasNewItems(list)}
                <ListRow {list} />
            {:then hasNewItems}
                <ListRow {hasNewItems} {list} />
            {/await}
        {/each}
    </div>
{/if}

<svelte:head>
    <title>{$t("wishes.my-relatives")}</title>
</svelte:head>
