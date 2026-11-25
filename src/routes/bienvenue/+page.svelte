<script lang="ts">
    import { getFormatter } from "$lib/i18n";

    const t = getFormatter();
</script>

<section class="paper-welcome" data-testid="welcome">
    <h1>{$t("wishes.welcome-title")}</h1>
    <p>{$t("wishes.welcome-text")}</p>
    <form action="?/start" method="POST">
        <button class="paper-primary" type="submit">{$t("wishes.welcome-start")}</button>
    </form>
</section>

<svelte:head>
    <title>{$t("wishes.welcome-title")}</title>
</svelte:head>
