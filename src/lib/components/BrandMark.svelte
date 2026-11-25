<script lang="ts">
    import { APP_NAME } from "$lib/brand";

    interface Props {
        hideText?: boolean;
    }

    const { hideText = false }: Props = $props();
    // Titre sur deux lignes : « Pas de » / « cadeaux ! »
    const cut = APP_NAME.lastIndexOf(" cadeaux");
    const nameLines = cut > 0 ? [APP_NAME.slice(0, cut), APP_NAME.slice(cut + 1)] : [APP_NAME, ""];
</script>

<span class="paper-brand">
    <img class="paper-brand-icon" alt="" height="256" src="/logo.webp" width="230" />
    <span class={["paper-brand-name", hideText && "hidden sm:inline"]}>
        {nameLines[0]}
        <br />
        {nameLines[1]}
    </span>
</span>
