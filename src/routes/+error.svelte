<script lang="ts">
    import { page } from "$app/state";
    import { getFormatter } from "$lib/i18n";

    const t = getFormatter();

    const title = $derived(
        page.status === 404
            ? $t("errors.page-not-found-title")
            : page.status === 401 || page.status === 403
              ? $t("errors.forbidden-title")
              : $t("errors.error-title")
    );
    const text = $derived(
        page.status === 404
            ? $t("errors.page-not-found-text")
            : page.status === 401 || page.status === 403
              ? $t("errors.forbidden-text")
              : $t("errors.error-text")
    );
</script>

<div class="paper-empty">
    <h2>{title}</h2>
    <p>{text}</p>
    <a class="paper-link" href="/">{$t("general.return-home")}</a>
</div>
