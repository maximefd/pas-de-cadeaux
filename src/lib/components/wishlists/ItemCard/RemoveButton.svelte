<script lang="ts">
    import type { InternalItemCardProps } from "./ItemCard.svelte";
    import { getFormatter } from "$lib/i18n";
    import { invalidateAll } from "$app/navigation";
    import { ItemAPI } from "$lib/api/items";
    import { ListItemAPI } from "$lib/api/lists";
    import { toaster } from "$lib/components/toaster";
    import DeleteItemModal from "$lib/components/modals/DeleteItemModal.svelte";
    import ModalBackdrop from "$lib/components/modals/parts/ModalBackdrop.svelte";
    import ModalContent from "$lib/components/modals/parts/ModalContent.svelte";
    import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte";
    import { userCanEdit } from "$lib/item-util";
    import { pendingRemovals } from "$lib/stores/pending-removals.svelte";
    import { page } from "$app/state";

    type Props = Pick<InternalItemCardProps, "item" | "user" | "userCanManage">;

    const { item, user, userCanManage }: Props = $props();
    const t = getFormatter();

    /** Délai pendant lequel « Annuler » reste proposé avant l'envoi réel de la requête. */
    const UNDO_DELAY_MS = 4000;

    const canEdit = $derived(userCanEdit(item, user?.id) || !!userCanManage);
    // Réglage « tout le monde peut retirer une idée » : la suppression est autorisée côté serveur
    const canRemove = $derived(item.approved && (canEdit || (!!user && page.data.anyoneCanDeleteItems === true)));
    const isOnlyManager = $derived(
        (user?.id !== item.user?.id && user?.id !== item.addedBy?.id && userCanManage) || false
    );
    const nameShort = $derived(item.name.length > 42 ? item.name.substring(0, 42) + "…" : item.name);

    // La personne concernée (et les gestionnaires de sa liste) ne doit jamais savoir qu'une idée a été
    // offerte : pour elle, « Retirer » supprime directement. Les autres choisissent pourquoi ils retirent.
    const canMarkOffered = $derived(
        !!user && item.approved && item.userId !== user.id && !item.list.managers.some((m) => m.userId === user.id)
    );

    let askWhy = $state(false);

    // Action différée côté client : la ligne disparaît tout de suite, la requête n'est envoyée
    // qu'à l'expiration du délai. « Annuler » ne déclenche aucune requête.
    const withUndo = (label: string, send: () => Promise<Response>) => {
        // Valeurs figées pour le callback différé (le composant peut disparaître entre-temps)
        const itemId = item.id;
        const undoLabel = $t("general.cancel");
        const errorLabel = $t("general.oops");

        pendingRemovals.add(itemId);

        const commit = async () => {
            window.removeEventListener("pagehide", commit);
            if (!pendingRemovals.has(itemId)) return;
            const resp = await send();
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

    const remove = () => {
        const api = new ItemAPI(item.id);
        withUndo($t("wishes.removed-with-undo", { values: { name: nameShort } }), () => api.delete());
    };

    // Sur une idée présente sur plusieurs listes, « plus d'actualité » la retire seulement de cette liste
    const removeFromThisList = () => {
        const api = new ListItemAPI(item.list.id, item.id);
        withUndo($t("wishes.removed-with-undo", { values: { name: nameShort } }), () => api.delete());
    };

    const markOffered = () => {
        const url = `/pdc/lists/${item.list.id}/items/${item.id}/offered`;
        withUndo($t("wishes.offered-with-undo", { values: { name: nameShort, owner: item.user.name } }), () =>
            fetch(url, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ offered: true })
            })
        );
    };

    const choose = (action: () => void) => {
        askWhy = false;
        action();
    };
</script>

{#if canMarkOffered}
    <!-- Bouton simple (pas Dialog.Trigger) : le clic ne doit pas remonter jusqu'à la ligne, qui ouvrirait le tiroir -->
    <button
        class="btn btn-sm paper-quiet"
        onclick={(e) => {
            e.stopPropagation();
            askWhy = true;
        }}
    >
        {$t("wishes.remove")}
    </button>
    <Dialog onOpenChange={(e) => (askWhy = e.open)} open={askWhy}>
        <Portal>
            <ModalBackdrop />
            <Dialog.Positioner class="fixed inset-0 z-50 mx-4 flex items-center justify-center">
                <ModalContent class="max-w-md">
                    <Dialog.Title class="text-xl font-bold">
                        {$t("wishes.remove-why", { values: { name: nameShort } })}
                    </Dialog.Title>
                    <div class="flex flex-col gap-2">
                        <button
                            class="btn preset-tonal-surface inset-ring-surface-500 h-auto flex-col items-start gap-0 py-3 text-left whitespace-normal inset-ring"
                            data-testid="remove-offered"
                            onclick={() => choose(markOffered)}
                        >
                            <span class="font-semibold">{$t("wishes.remove-offered")}</span>
                            <span class="text-sm opacity-80">
                                {$t("wishes.remove-offered-hint", { values: { owner: item.user.name } })}
                            </span>
                        </button>
                        {#if canRemove}
                            <button
                                class="btn preset-tonal-surface inset-ring-surface-500 h-auto flex-col items-start gap-0 py-3 text-left whitespace-normal inset-ring"
                                data-testid="remove-outdated"
                                onclick={() => choose(item.listCount > 1 && canEdit ? removeFromThisList : remove)}
                            >
                                <span class="font-semibold">{$t("wishes.remove-outdated")}</span>
                                <span class="text-sm opacity-80">{$t("wishes.remove-outdated-hint")}</span>
                            </button>
                        {/if}
                    </div>
                    <div class="flex justify-end">
                        <Dialog.CloseTrigger class="btn btn-sm paper-quiet">
                            {$t("general.cancel")}
                        </Dialog.CloseTrigger>
                    </div>
                </ModalContent>
            </Dialog.Positioner>
        </Portal>
    </Dialog>
{:else if canRemove}
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
        <button
            class="btn btn-sm paper-quiet"
            onclick={(e) => {
                e.stopPropagation();
                remove();
            }}
        >
            {$t("wishes.remove")}
        </button>
    {/if}
{/if}
