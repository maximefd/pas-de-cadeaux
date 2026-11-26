<script lang="ts">
    import type { InternalItemCardProps } from "./ItemCard.svelte";
    import { getFormatter } from "$lib/i18n";
    import { locale } from "svelte-i18n";
    import { getClaimedName, shouldShowName } from "../util";
    import ClaimItemModal from "$lib/components/modals/ClaimItemModal.svelte";
    import { ClaimAPI } from "$lib/api/claims";
    import { ListItemAPI } from "$lib/api/lists";
    import { toaster } from "$lib/components/toaster";
    import { invalidate } from "$app/navigation";

    interface Props extends Pick<
        InternalItemCardProps,
        | "item"
        | "user"
        | "showClaimedName"
        | "showNameAcrossGroups"
        | "showClaimForOwner"
        | "showPublicClaimName"
        | "onPublicList"
        | "groupId"
        | "requireClaimEmail"
        | "isSelfClaimable"
        | "showFor"
    > {
        isClaimableOrClaimed: (ans: boolean) => void;
    }

    let {
        item,
        user,
        showClaimedName = false,
        showNameAcrossGroups = false,
        showClaimForOwner = false,
        showPublicClaimName = false,
        onPublicList = false,
        groupId,
        requireClaimEmail,
        isClaimableOrClaimed,
        isSelfClaimable,
        showFor = false
    }: Props = $props();

    const t = getFormatter();

    let userClaim = $derived(item.claims.find((claim) => claim.claimedBy && claim.claimedBy.id === user?.id));
    let isClaimOnList = $derived(userClaim?.listId === item.list.id);
    let otherClaims = $derived(item.claims.filter((claim) => claim !== userClaim));
    let isOwnItem = $derived(!onPublicList && item.userId === user?.id);
    let canClaim = $derived(!isOwnItem || isSelfClaimable);
    // Réservation à plusieurs : l'idée est déjà prise, on peut se joindre à ceux qui l'ont réservée
    let canJoin = $derived(!!user && canClaim && !item.isClaimable && otherClaims.length > 0);

    // Noms visibles des autres personnes qui réservent (« Léa et Paul »)
    let otherNames = $derived.by(() => {
        const names = otherClaims
            .filter((claim) =>
                shouldShowName(
                    item,
                    showClaimedName,
                    showNameAcrossGroups,
                    showClaimForOwner,
                    showPublicClaimName,
                    user,
                    claim
                )
            )
            .map(getClaimedName);
        if (names.length === 0 || names.length !== otherClaims.length) return null;
        return new Intl.ListFormat($locale ?? "fr", { type: "conjunction" }).format(names);
    });

    $effect(() => isClaimableOrClaimed(item.isClaimable || canJoin || (userClaim && isClaimOnList) || false));

    let busy = $state(false);

    const handleJoin = async (e: MouseEvent) => {
        e.stopPropagation();
        if (!user || busy) return;
        busy = true;
        const resp = await new ListItemAPI(item.list.id, item.id).claim(user.id, 0);
        busy = false;
        if (resp.ok) {
            toaster.info({ description: $t("wishes.claimed-item", { values: { claimed: true } }) });
            await invalidate("data:items");
        } else {
            toaster.error({ description: $t("general.oops") });
        }
    };

    const handleLeave = async (e: MouseEvent) => {
        e.stopPropagation();
        if (!userClaim || busy) return;
        busy = true;
        const resp = await new ClaimAPI(userClaim.claimId).unclaim();
        busy = false;
        if (resp.ok) {
            toaster.info({ description: $t("wishes.claimed-item", { values: { claimed: false } }) });
            await invalidate("data:items");
        } else {
            toaster.error({ description: $t("general.oops") });
        }
    };
</script>

{#if isOwnItem && !showClaimForOwner}
    <!-- La personne concernée ne doit jamais savoir qu'une de ses idées est réservée -->
    <div></div>
{:else if userClaim}
    {#if isClaimOnList}
        <div class="flex flex-row flex-wrap items-center gap-2" data-testid="my-claim">
            <span class="text-subtle">
                {#if otherNames}
                    {$t("wishes.you-claim-with", { values: { names: otherNames } })}
                {:else if otherClaims.length > 0}
                    {$t("wishes.you-claim-with-others")}
                {:else}
                    {$t("wishes.you-claim")}
                {/if}
            </span>
            {#if userClaim.quantity === 0 || item.quantity === 1}
                <button class="btn btn-sm" disabled={busy} onclick={handleLeave}>{$t("wishes.cancel-claim")}</button>
            {:else}
                <ClaimItemModal claimId={userClaim?.claimId} {groupId} {item} {requireClaimEmail} userId={user?.id}>
                    {#snippet trigger(props)}
                        <button {...props} class="btn btn-sm">{$t("wishes.update-claim")}</button>
                    {/snippet}
                </ClaimItemModal>
            {/if}
        </div>
    {:else}
        <span class="text-subtle line-clamp-2 truncate text-wrap">{$t("wishes.claimed-by-you-on-another-list")}</span>
    {/if}
{:else if item.isClaimable && canClaim}
    <div class="flex flex-row flex-wrap items-center gap-x-2">
        {#if otherNames}
            <span class="text-subtle">{$t("wishes.claimed-by", { values: { name: otherNames } })}</span>
        {/if}
        <ClaimItemModal {groupId} {item} {requireClaimEmail} userId={user?.id}>
            {#snippet trigger(props)}
                <button {...props} class="btn btn-sm" data-testid="claim">{$t("wishes.claim")}</button>
            {/snippet}
        </ClaimItemModal>
    </div>
{:else if canJoin}
    <div class="flex flex-row flex-wrap items-center gap-x-2">
        <span class="text-subtle">
            {otherNames ? $t("wishes.claimed-by", { values: { name: otherNames } }) : $t("wishes.claimed")}
        </span>
        <button class="btn btn-sm" data-testid="join-claim" disabled={busy} onclick={handleJoin}>
            {$t("wishes.join-claim")}
        </button>
    </div>
{:else if item.claims.length === 0 || (isOwnItem && item.isClaimable)}
    <div></div>
{:else if otherNames}
    <span class="text-subtle line-clamp-2 truncate text-wrap">
        {$t("wishes.claimed-by", { values: { name: otherNames } })}
    </span>
{:else}
    <span class="text-subtle line-clamp-2 truncate text-wrap">{$t("wishes.claimed")}</span>
{/if}
