<script lang="ts">
    import type { InternalItemCardProps } from "./ItemCard.svelte";
    import ItemFooter from "./components/ItemFooter.svelte";
    import ClaimButtons from "./ClaimButtons.svelte";
    import ManageButtons from "./ManageButtons.svelte";
    import RemoveButton from "./RemoveButton.svelte";
    import Markdown from "$lib/components/Markdown.svelte";
    import { getFormatter } from "$lib/i18n";

    // Look « Papier » : une ligne de texte par idée, sans carte, image ni prix.
    // Le détail complet (image, prix, quantité...) reste disponible dans le tiroir au clic.
    const { defaultImage: _defaultImage, ...props }: InternalItemCardProps = $props();
    const t = getFormatter();

    const item = $derived(props.item);

    // « ajouté par X » uniquement quand l'idée n'a pas été ajoutée par la personne concernée
    const signedByOther = $derived(item.addedBy && item.addedBy.id !== item.user.id);
</script>

<div class="paper-body">
    <div class="paper-text">
        <div class="paper-title">
            {#if item.url}
                <a
                    id={`${props.id}-name`}
                    data-testid="name"
                    href={item.url}
                    onclick={(e) => e.stopPropagation()}
                    rel="noreferrer"
                    target="_blank"
                >
                    {item.name}
                </a>
            {:else}
                <span id={`${props.id}-name`} data-testid="name">{item.name}</span>
            {/if}
        </div>
        {#if item.note}
            <div class="paper-note line-clamp-2 whitespace-pre-wrap print:line-clamp-none" data-testid="notes">
                <Markdown source={item.note} />
            </div>
        {/if}
        {#if props.showFor}
            <div class="paper-by" data-testid="added-by">
                {@html $t("wishes.for", { values: { name: item.user.name, class: "" } })}
            </div>
        {:else if signedByOther}
            <div class="paper-by" data-testid="added-by">
                {#if props.onPublicList}
                    {@html $t("wishes.added-by-somebody-else", { values: { class: "" } })}
                {:else}
                    {@html $t("wishes.added-by", { values: { name: item.addedBy.name, class: "" } })}
                {/if}
            </div>
        {/if}
        {#if !props.reorderActions}
            <div class="paper-claimed-line print:hidden">
                <ClaimButtons isClaimableOrClaimed={() => {}} {...props} />
            </div>
        {/if}
    </div>

    {#if props.reorderActions}
        <ItemFooter {...props} noPadding />
    {:else}
        <div class="paper-actions print:hidden">
            {#if item.approved}
                <RemoveButton {item} user={props.user} userCanManage={props.userCanManage} />
            {:else}
                <ManageButtons {...props} />
            {/if}
        </div>
    {/if}
</div>
