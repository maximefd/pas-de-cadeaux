<script lang="ts">
    import type { PageProps } from "./$types";
    import ItemCard from "$lib/components/wishlists/ItemCard/ItemCard.svelte";
    import { goto, invalidate } from "$app/navigation";
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { flip } from "svelte/animate";
    import { quintOut } from "svelte/easing";
    import { crossfade } from "svelte/transition";
    import { hash, hashItems, viewedItems } from "$lib/stores/viewed-items";
    import type { ItemOnListDTO } from "$lib/dtos/item-dto";
    import { ItemCreateHandler, ItemDeleteHandler, ItemsUpdateHandler, ItemUpdateHandler } from "$lib/events";
    import { getFormatter } from "$lib/i18n";
    import Markdown from "$lib/components/Markdown.svelte";
    import { itemSorter } from "$lib/comparators";

    const { data }: PageProps = $props();
    const t = getFormatter();

    // svelte-ignore state_referenced_locally
    let allItems: ItemOnListDTO[] = $state(data.list.items);
    let approvals = $derived(allItems.filter((item) => !item.approved));
    // une idée offerte quitte la liste (elle part dans l'historique des cadeaux)
    let items = $derived(allItems.filter((item) => item.approved && !item.offered));
    // Titre de la maquette : « Mes envies » chez soi, le prénom chez les autres (le nom de la liste s'il est personnalisé)
    let pageTitle = $derived(
        data.list.owner.isMe ? data.list.name || $t("wishes.my-lists") : data.list.name || data.list.owner.name
    );

    const flipDurationMs = 200;

    const [send, receive] = crossfade({
        duration: (d) => Math.sqrt(d * 200),

        fallback(node) {
            const style = getComputedStyle(node);
            const transform = style.transform === "none" ? "" : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
            };
        }
    });

    onMount(async () => {
        await updateHash();
    });

    onMount(() => {
        const eventSource = subscribeToEvents();
        return () => eventSource.close();
    });

    $effect(() => {
        allItems = data.list.items;
    });

    const sortItems = (items: ItemOnListDTO[]) => {
        return items.toSorted(
            itemSorter({
                userId: data.user?.id,
                sort: page.url.searchParams.get("sort"),
                dir: page.url.searchParams.get("dir"),
                listOwnerId: data.list.owner.id,
                isSelfClaimable: data.list.isSelfClaimable
            })
        );
    };

    const updateHash = async () => {
        const userHash = await hash(data.list.id);
        viewedItems.current[userHash] = await hashItems(allItems);
    };

    const subscribeToEvents = () => {
        const eventSource = new EventSource(`${page.url.pathname}/events`);
        ItemUpdateHandler.listen(eventSource, (data) => {
            updateItem(data);
            updateHash();
        });
        ItemCreateHandler.listen(eventSource, (data) => {
            addItem(data);
            updateHash();
        });
        ItemDeleteHandler.listen(eventSource, (data) => {
            removeItem(data);
            updateHash();
        });
        ItemsUpdateHandler.listen(eventSource, () => {
            if (!data.list.owner.isMe) {
                invalidate("data:items");
                updateHash();
            }
        });
        return eventSource;
    };

    const updateItem = (updatedItem: ItemOnListDTO) => {
        // for when an item gets approved
        if (!allItems.find((item) => item.id === updatedItem.id)) {
            addItem(updatedItem);
        }
        const updatedItems = allItems.map((item) => {
            if (item.id === updatedItem.id) {
                return { ...item, ...updatedItem };
            }
            return item;
        });
        allItems = sortItems(updatedItems);
    };

    const removeItem = (removedItem: { id: number }) => {
        allItems = allItems.filter((item) => item.id !== removedItem.id);
    };

    const addItem = (addedItem: ItemOnListDTO) => {
        if (!(addedItem.approved || data.list.owner.isMe)) {
            return;
        }
        allItems = sortItems([...allItems, addedItem]);
    };
</script>

<!-- Maquette « Papier » : retour, titre, idées en lignes de texte, « + Ajouter » en bas. Rien d'autre. -->
{#if data.loggedInUser && !data.list.owner.isMe}
    <a class="paper-back print:hidden" href={resolve("/lists")}>‹ {$t("general.back")}</a>
{/if}
<div class="paper-title-block">
    <h1 class="h1">{pageTitle}</h1>
    {#if data.list.description}
        <div class="paper-sub">
            <Markdown source={data.list.description} />
        </div>
    {/if}
</div>

{#if (data.list.owner.isMe || data.list.isManager) && approvals.length > 0}
    <div class="pb-4 print:hidden">
        <h2 class="paper-section">{$t("wishes.approvals")}</h2>
        <div class="paper-list" data-testid="approvals-container">
            {#each approvals as item (item.id)}
                <div in:receive={{ key: item.id }} out:send|local={{ key: item.id }} animate:flip={{ duration: 200 }}>
                    <ItemCard
                        groupId={data.list.groupId}
                        isTileView={false}
                        {item}
                        onPublicList={!data.loggedInUser && data.list.public}
                        requireClaimEmail={data.requireClaimEmail}
                        showClaimForOwner={data.showClaimForOwner}
                        showClaimedName={data.showClaimedName}
                        showNameAcrossGroups={data.showNameAcrossGroups}
                        showPublicClaimName={data.showPublicClaimName}
                        user={data.loggedInUser}
                        userCanManage={data.list.isManager}
                    />
                </div>
            {/each}
        </div>
    </div>
{/if}

{#if items.length === 0}
    <div class="paper-empty" data-testid="list-empty">
        {#if data.list.owner.isMe}
            <h2>{$t("wishes.my-empty-title")}</h2>
            <p>{$t("wishes.my-empty-text")}</p>
        {:else}
            <h2>{$t("wishes.other-empty-title", { values: { name: data.list.owner.name } })}</h2>
            <p>{$t("wishes.other-empty-text", { values: { name: data.list.owner.name } })}</p>
        {/if}
    </div>
{:else}
    <div class="paper-list" data-testid="items-container">
        {#each items as item (item.id)}
            <div
                id="item-{item.id}-wrapper"
                in:receive={{ key: item.id }}
                out:send={{ key: item.id }}
                animate:flip={{ duration: flipDurationMs }}
            >
                <ItemCard
                    groupId={data.list.groupId}
                    isSelfClaimable={data.list.isSelfClaimable}
                    isTileView={false}
                    {item}
                    onPublicList={!data.loggedInUser && data.list.public}
                    requireClaimEmail={data.requireClaimEmail}
                    showClaimForOwner={data.showClaimForOwner}
                    showClaimedName={data.showClaimedName}
                    showNameAcrossGroups={data.showNameAcrossGroups}
                    showPublicClaimName={data.showPublicClaimName}
                    user={data.loggedInUser}
                    userCanManage={data.list.isManager}
                />
            </div>
        {/each}
    </div>
{/if}

<!-- Ligne « + Ajouter » -->
{#if data.loggedInUser && (data.list.owner.isMe || data.list.isManager || data.suggestionsEnabled)}
    <button
        class="paper-add print:hidden"
        aria-label={$t("a11y.add-item")}
        onclick={() => goto(`${page.url.pathname}/create-item?redirectTo=${page.url.pathname}`, { replaceState: true })}
    >
        <b aria-hidden="true">+</b>
        <span>
            {data.list.owner.isMe
                ? $t("wishes.add-my-wish")
                : $t("wishes.add-idea-for", { values: { name: data.list.owner.name } })}
        </span>
    </button>
{/if}

{#if data.loggedInUser && !data.list.owner.isMe && !data.list.isManager}
    {#if items.length > 0}
        <p class="paper-hint">{$t("wishes.other-list-hint", { values: { name: data.list.owner.name } })}</p>
    {/if}
    <p class="paper-hint print:hidden">
        <a class="paper-link" href={`/wishlists/${data.list.owner.username}/history`}>
            {$t("wishes.history")} ›
        </a>
    </p>
{:else if data.list.owner.isMe && items.length > 0}
    <p class="paper-hint">{$t("wishes.my-list-hint")}</p>
{/if}

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>
