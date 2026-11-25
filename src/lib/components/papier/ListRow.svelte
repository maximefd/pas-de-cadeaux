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
        list: ListWithCounts;
        hasNewItems?: boolean;
    }

    const { hasNewItems = false, list }: Props = $props();
    const t = getFormatter();

    const count = $derived(list.itemCount ?? 0);
</script>

<!-- Une personne par ligne (maquette « Papier ») : son prénom, le nombre d'idées, un chevron. -->
<a class="paper-person" href={`/lists/${list.id}`}>
    <span class="paper-person-name">
        <span data-testid="list-owner">{list.owner.name}</span>
        {#if list.name}
            <small data-testid="list-name">{list.name}</small>
        {/if}
    </span>
    <small data-testid="item-count">
        {#if hasNewItems}
            <span class="paper-new-dot" aria-label={$t("wishes.new-ideas")}></span>
        {/if}
        {count > 0 ? $t("wishes.idea-count", { values: { count } }) : $t("wishes.nothing-yet")}
        <span aria-hidden="true">›</span>
    </small>
</a>
