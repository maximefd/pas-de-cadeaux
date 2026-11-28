<script lang="ts">
    import { onMount } from "svelte";
    import { getFormatter } from "$lib/i18n";

    interface Props {
        /** Affiche aussi le titre et un lien « Plus tard » (bandeau de la page d'accueil). */
        banner?: boolean;
    }
    let { banner = false }: Props = $props();
    const t = getFormatter();

    const KEY = "pdc-install-dismissed";
    type InstallEvent = Event & { prompt: () => Promise<void> };

    let deferred: InstallEvent | null = $state(null);
    let kind: "ios" | "android" | null = $state(null);
    let hidden = $state(true);
    let host = $state("");
    let canShare = $state(false);

    onMount(() => {
        const standalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            (navigator as unknown as { standalone?: boolean }).standalone === true;
        if (standalone) return;
        const ua = navigator.userAgent;
        const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
        const mobile = ios || /Android/.test(ua);
        if (!mobile) return;
        host = location.host;
        canShare = typeof navigator.share === "function";
        kind = ios ? "ios" : "android";
        try {
            if (banner && localStorage.getItem(KEY)) return;
        } catch {
            // stockage indisponible : on affiche quand même
        }
        hidden = false;
        const onPrompt = (e: Event) => {
            e.preventDefault();
            deferred = e as InstallEvent;
        };
        window.addEventListener("beforeinstallprompt", onPrompt);
        return () => window.removeEventListener("beforeinstallprompt", onPrompt);
    });

    const install = async () => {
        await deferred?.prompt();
        deferred = null;
    };
    const share = async () => {
        try {
            await navigator.share({ title: document.title, url: location.origin });
        } catch {
            // partage annulé
        }
    };
    const dismiss = () => {
        hidden = true;
        try {
            localStorage.setItem(KEY, "1");
        } catch {
            // ignoré
        }
    };
</script>

{#if !hidden && kind}
    <div class="paper-install" data-testid="install-hint">
        {#if banner}<strong>{$t("install.title")}</strong>{/if}
        {#if deferred}
            <button class="paper-primary" onclick={install} type="button">{$t("install.button")}</button>
        {:else}
            <p>{kind === "ios" ? $t("install.ios") : $t("install.android")}</p>
        {/if}
        <p class="paper-install-address">
            {$t("install.address")}
            <strong>{host}</strong>
        </p>
        {#if canShare}
            <button class="paper-link" onclick={share} type="button">{$t("install.share")}</button>
        {/if}
        {#if banner}
            <button class="paper-link" onclick={dismiss} type="button">{$t("install.dismiss")}</button>
        {/if}
    </div>
{/if}
