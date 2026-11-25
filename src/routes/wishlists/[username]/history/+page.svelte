<script lang="ts">
    import type { PageProps } from "./$types";
    import { getFormatter } from "$lib/i18n";
    import { invalidate } from "$app/navigation";
    import { toaster } from "$lib/components/toaster";

    const { data }: PageProps = $props();
    const t = getFormatter();

    // Une idée marquée « offert » par erreur peut revenir dans la liste
    const putBack = async (item: { id: number; name: string; listId: string }) => {
        const resp = await fetch(`/pdc/lists/${item.listId}/items/${item.id}/offered`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ offered: false })
        });
        if (resp.ok) {
            toaster.info({
                description: $t("wishes.history-put-back-done", {
                    values: { name: item.name, owner: data.owner.name }
                })
            });
            await invalidate("data:items");
        } else {
            toaster.error({ description: $t("general.oops") });
        }
    };
</script>

<svelte:head>
    <title>{$t("wishes.history-of", { values: { name: data.owner.name } })}</title>
</svelte:head>

<div class="flex flex-col gap-2">
    <a class="paper-link self-start" href={`/lists/${data.listId}`}>
        {$t("wishes.back-to-list")}
    </a>
    <h1 class="h1">{$t("wishes.history-of", { values: { name: data.owner.name } })}</h1>
    {#if data.years.length === 0}
        <p class="paper-empty">{$t("wishes.history-empty", { values: { name: data.owner.name } })}</p>
    {:else}
        <div data-testid="history-items">
            {#each data.years as { year, items } (year)}
                <h2 class="paper-section">{year}</h2>
                <ul class="paper-list">
                    {#each items as item (item.id)}
                        <li class="card paper-row" role="none">
                            <div class="paper-body">
                                <div class="paper-text">
                                    <div class="paper-title">
                                        {#if item.url}
                                            <a href={item.url} rel="noopener noreferrer" target="_blank">{item.name}</a>
                                        {:else}
                                            <span>{item.name}</span>
                                        {/if}
                                    </div>
                                </div>
                                <div class="paper-actions">
                                    <button class="btn btn-sm paper-quiet" onclick={() => putBack(item)}>
                                        {$t("wishes.history-put-back")}
                                    </button>
                                </div>
                            </div>
                        </li>
                    {/each}
                </ul>
            {/each}
        </div>
    {/if}
</div>
