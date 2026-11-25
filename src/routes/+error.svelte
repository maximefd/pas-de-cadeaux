<script lang="ts">
    import { page } from "$app/state";
    import { getFormatter } from "$lib/i18n";

    const t = getFormatter();

    // Lien d'invitation absent, expiré ou déjà utilisé : on affiche le message précis du serveur
    const isSignup = $derived(page.url.pathname.startsWith("/signup") && !!page.error?.message);

    const title = $derived(
        isSignup
            ? $t("errors.invite-title")
            : page.status === 404
              ? $t("errors.page-not-found-title")
              : page.status === 401 || page.status === 403
                ? $t("errors.forbidden-title")
                : $t("errors.error-title")
    );
    const text = $derived(
        isSignup
            ? page.error!.message
            : page.status === 404
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
