<script lang="ts">
    import type { List, User } from "$lib/generated/prisma/client";
    import { getFormatter } from "$lib/i18n";

    interface ListWithCounts extends Partial<Pick<List, "id" | "name" | "hideOwner">> {
        owner: Pick<User, "name">;
        itemCount?: number;
        claimedCount?: number;
        unapprovedCount?: number;
    }

    interface Props {
        hideCount?: boolean;
        list: ListWithCounts;
        hasNewItems?: boolean;
    }

    const { hideCount = false, hasNewItems = false, list }: Props = $props();
    const t = getFormatter();

    let listName = $derived(list.name || $t("wishes.wishes-for", { values: { listOwner: list.owner.name } }));
    let availableCount = $derived((list.itemCount ?? 0) - (list.claimedCount ?? 0));
</script>

<!-- Ligne de texte « Papier » (voir styles/papier.css) : un nom, une précision, un chevron. -->
<a class="card paper-row paper-list-row" href={`/lists/${list.id}`}>
    <div class="paper-body items-center">
        <div class="paper-text">
            <div class="paper-title" data-testid="list-name">{listName}</div>
            {#if !list.hideOwner}
                <div class="paper-by" data-testid="list-owner">{list.owner.name}</div>
            {/if}
            {#if list.unapprovedCount && list.unapprovedCount > 0}
                <div class="paper-approvals">
                    {$t("wishes.approvals-waiting", { values: { approvalCount: list.unapprovedCount } })}
                </div>
            {/if}
        </div>
        <div class="paper-count" data-testid="item-count">
            {#if hasNewItems}
                <span class="paper-new-dot" aria-hidden="true"></span>
            {/if}
            {#if hideCount}
                {$t("wishes.items-requested", { values: { itemCount: list.itemCount } })}
            {:else}
                {$t("wishes.items-available", { values: { availableCount } })}
            {/if}
        </div>
        <span class="paper-chevron" aria-hidden="true">›</span>
    </div>
</a>
