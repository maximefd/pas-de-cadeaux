<script lang="ts" module>
    export interface PartialUser extends Pick<User, "id" | "name"> {
        activeGroupId: string;
    }

    type ItemVoidFunction = (itemId: number) => void;

    export interface ItemCardProps {
        item: ItemOnListDTO;
        user: PartialUser | undefined; // logged in user
        userCanManage?: boolean;
        showClaimedName: boolean;
        showNameAcrossGroups?: boolean;
        showPublicClaimName?: boolean;
        showClaimForOwner?: boolean;
        requireClaimEmail: boolean;
        groupId: string;
        showFor?: boolean;
        onPublicList?: boolean;
        reorderActions?: boolean;
        onIncreasePriority?: ItemVoidFunction;
        onDecreasePriority?: ItemVoidFunction;
        onPriorityChange?: (item: ItemOnListDTO, idx: string) => void;
        isTileView?: boolean;
        isSelfClaimable?: boolean;
        isNew?: boolean;
    }

    export interface InternalItemCardProps {
        id: string;
        item: ItemOnListDTO;
        user: PartialUser | undefined;
        userCanManage: boolean;
        showClaimedName: boolean;
        showNameAcrossGroups: boolean;
        showClaimForOwner: boolean;
        showPublicClaimName: boolean;
        requireClaimEmail: boolean;
        groupId: string;
        showFor: boolean;
        onPublicList: boolean;
        reorderActions: boolean;
        onIncreasePriority?: ItemVoidFunction;
        onDecreasePriority?: ItemVoidFunction;
        onPriorityChange?: (item: ItemOnListDTO, idx: string) => void;
        defaultImage: Snippet<[MessageFormatter, classes?: ClassValue]>;
        isSelfClaimable: boolean;
        isNew: boolean;
    }
</script>

<script lang="ts">
    import type { User } from "$lib/generated/prisma/client";
    import { goto } from "$app/navigation";
    import type { ItemOnListDTO } from "$lib/dtos/item-dto";
    import type { ClassValue } from "svelte/elements";
    import type { MessageFormatter } from "$lib/server/i18n";
    import GridItemCard from "./GridItemCard.svelte";
    import ListItemCard from "./ListItemCard.svelte";
    import type { Snippet } from "svelte";
    import ItemDetail from "../ItemDetail.svelte";
    import { page } from "$app/state";
    import { pendingRemovals } from "$lib/stores/pending-removals.svelte";

    const {
        item,
        groupId,
        user = undefined,
        userCanManage = false,
        showClaimedName = false,
        showNameAcrossGroups = false,
        showClaimForOwner = false,
        showPublicClaimName = false,
        requireClaimEmail = true,
        showFor = false,
        onPublicList = false,
        reorderActions = false,
        onIncreasePriority = undefined,
        onDecreasePriority = undefined,
        onPriorityChange,
        isTileView = false,
        isSelfClaimable = false,
        isNew = false
    }: ItemCardProps = $props();

    const id = $props.id();

    // Le détail se déplie sous la ligne ; l'adresse garde ?item-id=… pour pouvoir y revenir
    const open = $derived(page.url.searchParams.get("item-id") === item.id.toString());

    function toggleDetail() {
        goto(open ? page.url.pathname : `?item-id=${item.id}`, { replaceState: true, noScroll: true, keepFocus: true });
    }

    const ItemCard = $derived(isTileView ? GridItemCard : ListItemCard);
</script>

<!-- Pas d'image d'illustration : une idée sans photo n'affiche rien à la place -->
{#snippet defaultImage(_t: MessageFormatter, _sizeClasses?: ClassValue)}{/snippet}

<!-- Mode liste : look « Papier » (ligne de texte, voir styles/papier.css). Mode tuile : carte d'origine. -->
{#if !pendingRemovals.has(item.id)}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div
        class={[
            "card block w-full text-start print:break-inside-avoid print:shadow-none",
            isTileView
                ? "preset-filled-surface-100-900 border-surface-200-800 h-full border"
                : ["paper-row", !item.approved && "paper-row-pending"],
            isTileView && !item.approved && "preset-tonal-warning border-warning-500 border",
            isTileView && !reorderActions && "card-hover"
        ]}
        onclick={() => {
            // toute la ligne (marges comprises) déplie le détail ; le détail lui-même arrête le clic
            if (!reorderActions) toggleDetail();
        }}
    >
        <div
            class="paper-row-main"
            aria-expanded={reorderActions ? undefined : open}
            aria-labelledby={`${id}-name`}
            onkeyup={(e) => {
                if (!reorderActions && e.key === "Enter") toggleDetail();
            }}
            role={reorderActions ? "none" : "button"}
            tabindex={reorderActions ? -1 : 0}
        >
            <ItemCard
                {id}
                {defaultImage}
                {groupId}
                {isNew}
                {isSelfClaimable}
                {item}
                {onDecreasePriority}
                {onIncreasePriority}
                {onPriorityChange}
                {onPublicList}
                {reorderActions}
                {requireClaimEmail}
                {showClaimForOwner}
                {showClaimedName}
                {showFor}
                {showNameAcrossGroups}
                {showPublicClaimName}
                {user}
                {userCanManage}
            />
        </div>
        {#if open && !reorderActions}
            <ItemDetail {isSelfClaimable} {item} onClose={toggleDetail} {showClaimForOwner} {user} />
        {/if}
    </div>
{/if}
