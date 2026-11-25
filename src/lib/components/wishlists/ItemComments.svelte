<script lang="ts">
    import { onMount } from "svelte";
    import type { InternalItemCardProps } from "./ItemCard/ItemCard.svelte";
    import { getFormatter } from "$lib/i18n";
    import { toaster } from "$lib/components/toaster";

    type Props = Pick<InternalItemCardProps, "item" | "user" | "isSelfClaimable">;

    interface Comment {
        id: string;
        text: string;
        authorName: string;
        mine: boolean;
    }

    const MAX_LENGTH = 300;

    let { item, user, isSelfClaimable = false }: Props = $props();
    const t = getFormatter();

    // Jamais pour la personne concernée ni ses gestionnaires (sauf liste auto-réservable) : on ne fait même pas la requête.
    const canSee = $derived(
        !!user &&
            (isSelfClaimable || (item.userId !== user.id && !item.list.managers.some((m) => m.userId === user.id)))
    );

    const url = $derived(`/pdc/lists/${item.list.id}/items/${item.id}/comments`);

    let comments = $state<Comment[]>([]);
    let editing = $state(false);
    let draft = $state("");
    let sending = $state(false);

    onMount(async () => {
        if (!canSee) return;
        const resp = await fetch(url);
        if (resp.ok) comments = await resp.json();
    });

    async function publish(e: SubmitEvent) {
        e.preventDefault();
        const text = draft.trim();
        if (!text || sending) return;
        sending = true;
        const resp = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ text })
        });
        sending = false;
        if (resp.ok) {
            comments = [...comments, await resp.json()];
            draft = "";
            editing = false;
        } else {
            toaster.error({ description: await resp.text() });
        }
    }

    async function remove(id: string) {
        const resp = await fetch(`${url}/${id}`, { method: "DELETE" });
        if (resp.ok || resp.status === 404) {
            comments = comments.filter((c) => c.id !== id);
        } else {
            toaster.error({ description: await resp.text() });
        }
    }
</script>

{#if canSee}
    <section class="flex flex-col gap-2" data-testid="comments">
        {#each comments as comment (comment.id)}
            <div class="flex items-start gap-2" data-testid="comment">
                <p class="grow wrap-break-word whitespace-pre-wrap">
                    {comment.text}
                    <span class="paper-detail-fact whitespace-nowrap">— {comment.authorName}</span>
                </p>
                <button
                    class="paper-link"
                    aria-label={$t("wishes.comment-delete")}
                    onclick={() => remove(comment.id)}
                    type="button"
                >
                    <iconify-icon icon="ion:close"></iconify-icon>
                </button>
            </div>
        {/each}

        {#if editing}
            <form class="flex items-center gap-2" onsubmit={publish}>
                <input
                    class="input grow"
                    aria-label={$t("wishes.comment-placeholder")}
                    autocomplete="off"
                    maxlength={MAX_LENGTH}
                    placeholder={$t("wishes.comment-placeholder")}
                    required
                    type="text"
                    bind:value={draft}
                />
                <button class="btn preset-filled btn-sm" disabled={sending} type="submit">
                    {$t("wishes.comment-publish")}
                </button>
            </form>
        {:else}
            <button class="paper-link -ms-2 self-start" onclick={() => (editing = true)} type="button">
                {$t("wishes.comment-add")}
            </button>
        {/if}
        <p class="paper-detail-fact">{$t("wishes.comment-hidden-hint")}</p>
    </section>
{/if}
