<script lang="ts">
    import type { PageProps } from "./$types";
    import ListRow from "$lib/components/papier/ListRow.svelte";
    import CircleTabs from "$lib/components/papier/CircleTabs.svelte";
    import { page } from "$app/state";
    import { getFormatter } from "$lib/i18n";
    import InstallHint from "$lib/components/InstallHint.svelte";

    let { data }: PageProps = $props();

    const t = getFormatter();
</script>

<!-- « Mes proches » : une ligne par personne du cercle, sa liste s'ouvre d'un clic. -->
<InstallHint banner />
<CircleTabs groups={page.data.groups} user={page.data.user} />

{#if data.otherLists.length === 0}
    <p class="paper-empty" data-testid="list-container-empty">{$t("wishes.no-relatives-yet")}</p>
{:else}
    <div data-testid="list-container">
        {#each data.otherLists as list (list.id)}
            <ListRow hasNewItems={list.hasNewItems} {list} />
        {/each}
    </div>
{/if}

<svelte:head>
    <title>{$t("wishes.my-relatives")}</title>
</svelte:head>
