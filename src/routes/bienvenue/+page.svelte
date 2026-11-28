<script lang="ts">
    import { getFormatter } from "$lib/i18n";
    import InstallHint from "$lib/components/InstallHint.svelte";

    const t = getFormatter();
</script>

<section class="paper-welcome" data-testid="welcome">
    <h1>{$t("wishes.welcome-title")}</h1>
    <p>{$t("wishes.welcome-text")}</p>
    <InstallHint />
    <form action="?/start" method="POST">
        <button class="paper-primary" type="submit">{$t("wishes.welcome-start")}</button>
    </form>
</section>

<svelte:head>
    <title>{$t("wishes.welcome-title")}</title>
</svelte:head>
