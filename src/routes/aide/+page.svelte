<script lang="ts">
    import { getFormatter } from "$lib/i18n";

    const t = getFormatter();
    const questions = ["1", "-claim", "2", "3"];
</script>

<!-- Aide : quelques questions, une phrase de réponse chacune (maquette d'accueil). -->
<div class="pt-2">
    {#each questions as n (n)}
        <details class="paper-faq">
            <summary>{$t(`help.q${n}`)}</summary>
            <p>{$t(`help.a${n}`)}</p>
        </details>
    {/each}
</div>

<svelte:head>
    <title>{$t("help.title")}</title>
</svelte:head>
