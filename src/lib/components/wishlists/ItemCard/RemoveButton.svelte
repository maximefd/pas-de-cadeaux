<script lang="ts">
    import type { InternalItemCardProps } from "./ItemCard.svelte";
    import { getFormatter } from "$lib/i18n";
    import { invalidateAll } from "$app/navigation";
    import { ItemAPI } from "$lib/api/items";
    import { toaster } from "$lib/components/toaster";
    import DeleteItemModal from "$lib/components/modals/DeleteItemModal.svelte";
    import { userCanEdit } from "$lib/item-util";
    import { pendingRemovals } from "$lib/stores/pending-removals.svelte";

    type Props = Pick<InternalItemCardProps, "item" | "user" | "userCanManage">;

    const { item, user, userCanManage }: Props = $props();
    const t = getFormatter();

    /** Délai pendant lequel « Annuler » reste proposé avant l'envoi réel du DELETE. */
    const UNDO_DELAY_MS = 4000;

    const canRemove = $derived(item.approved && (userCanEdit(item, user?.id) || userCanManage));
    const isOnlyManager = $derived(
        (user?.id !== item.user?.id && user?.id !== item.addedBy?.id && userCanManage) || false
    );
    const nameShort = $derived(item.name.length > 42 ? item.name.substring(0, 42) + "…" : item.name);

    // Suppression différée côté client : la ligne disparaît tout de suite, le DELETE n'est envoyé
    // qu'à l'expiration du délai. « Annuler » ne déclenche aucune requête.
    const remove = (e: MouseEvent) => {
        e.stopPropagation();
        // Valeurs figées pour le callback différé (le composant peut disparaître entre-temps)
        const itemId = item.id;
        const label = $t("wishes.removed-with-undo", { values: { name: nameShort } });
        const undoLabel = $t("general.cancel");
        const errorLabel = $t("general.oops");
        const api = new ItemAPI(itemId);

        pendingRemovals.add(itemId);

        const commit = async () => {
            window.removeEventListener("pagehide", commit);
            if (!pendingRemovals.has(itemId)) return;
            const resp = await api.delete();
            if (resp.ok) {
                await invalidateAll();
            } else {
                toaster.error({ description: errorLabel });
            }
            pendingRemovals.delete(itemId);
        };

        const timer = setTimeout(commit, UNDO_DELAY_MS);
        window.addEventListener("pagehide", commit);

        toaster.create({
            type: "info",
            description: label,
            duration: UNDO_DELAY_MS,
            action: {
                label: undoLabel,
                onClick: () => {
                    clearTimeout(timer);
                    window.removeEventListener("pagehide", commit);
                    pendingRemovals.delete(itemId);
                }
            }
        });
    };
</script>

{#if canRemove}
    {#if item.listCount > 1}
        <!-- L'idée est sur plusieurs listes : on demande d'abord laquelle retirer -->
        <DeleteItemModal {isOnlyManager} {item} itemNameShort={nameShort}>
            {#snippet trigger(props)}
                <button
                    {...props}
                    class="btn btn-sm paper-quiet"
                    onclick={(e) => {
                        e.stopPropagation();
                        props.onclick?.(e);
                    }}
                >
                    {$t("wishes.remove")}
                </button>
            {/snippet}
        </DeleteItemModal>
    {:else}
        <button class="btn btn-sm paper-quiet" onclick={remove}>
            {$t("wishes.remove")}
        </button>
    {/if}
{/if}
