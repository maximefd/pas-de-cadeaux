<script lang="ts">
    import type { PageData, PageProps } from "./$types";
    import { fade } from "svelte/transition";
    import { hash, hashItems, viewedItems } from "$lib/stores/viewed-items";
    import ListRow from "$lib/components/papier/ListRow.svelte";
    import CircleTabs from "$lib/components/papier/CircleTabs.svelte";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import ListFilterChip from "$lib/components/wishlists/chips/ListFilterChip.svelte";
    import { getFormatter } from "$lib/i18n";
    import { resolve } from "$app/paths";

    type ListData = PageData["otherLists"][0];

    let { data }: PageProps = $props();

    const t = getFormatter();
    const users = $state(data.users);

    const hasNewItems = async (list: ListData) => {
        if (!list.items || list.items.length === 0) return false;
        const userHash = await hash(list.id);
        const currentHash = await hashItems(list.items);
        const viewedHash = viewedItems.current[userHash];
        return currentHash !== viewedHash;
    };
</script>

<CircleTabs groups={page.data.groups} user={page.data.user} />

<div class="paper-toolbar pb-2 print:hidden">
    <ListFilterChip {users} />
</div>

{#if data.myLists.length + data.otherLists.length === 0}
    <p class="paper-empty" data-testid="list-container-empty">{$t("wishes.no-lists-yet")}</p>
{:else}
    <div class="paper-list" data-testid="list-container" in:fade>
        {#each data.myLists as list (list.id)}
            <ListRow hideCount {list} />
        {/each}

        {#each data.otherLists as list (list.id)}
            {#await hasNewItems(list)}
                <ListRow {list} />
            {:then hasNewItems}
                <ListRow {hasNewItems} {list} />
            {/await}
        {/each}
    </div>
{/if}

<button class="paper-add print:hidden" onclick={() => goto(resolve("/lists/create"))} type="button">
    <b aria-hidden="true">+</b>
    <span>{$t("wishes.create-list")}</span>
</button>

<svelte:head>
    <title>{$t("wishes.lists")}</title>
</svelte:head>
