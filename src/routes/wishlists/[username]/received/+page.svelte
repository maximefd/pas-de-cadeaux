<script lang="ts">
    import type { PageProps } from "./$types";
    import { getFormatter } from "$lib/i18n";

    const { data }: PageProps = $props();
    const t = getFormatter();
</script>

<svelte:head>
    <title>
        {data.owner.isMe
            ? $t("wishes.received-by-me")
            : $t("wishes.received-by", { values: { name: data.owner.name } })}
    </title>
</svelte:head>

<div class="flex flex-col gap-4">
    <a class="text-primary-700 dark:text-primary-500 text-sm" href={`/lists/${data.listId}`}>
        {$t("wishes.back-to-list")}
    </a>
    {#if data.items.length === 0}
        <p class="text-subtle">{$t("wishes.nothing-received-yet")}</p>
    {:else}
        <ul class="flex flex-col gap-2" data-testid="received-items">
            {#each data.items as item (item.id)}
                <li class="card preset-filled-surface-100-900 flex flex-row items-center gap-4 p-4">
                    {#if item.imageUrl}
                        <img class="h-12 w-12 rounded object-cover" alt="" src={item.imageUrl} />
                    {/if}
                    {#if item.url}
                        <a class="anchor" href={item.url} rel="noopener noreferrer" target="_blank">{item.name}</a>
                    {:else}
                        <span>{item.name}</span>
                    {/if}
                </li>
            {/each}
        </ul>
    {/if}
</div>
