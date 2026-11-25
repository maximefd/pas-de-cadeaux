<script lang="ts">
    import { getFormatter } from "$lib/i18n";

    const t = getFormatter();
</script>

<div class="paper-empty">
    <h2>{$t("errors.cant-find-your-group")}</h2>
    <p>{$t("errors.no-group-friendly-msg")}</p>
    <a class="paper-link" href="/">{$t("general.return-home")}</a>
</div>
