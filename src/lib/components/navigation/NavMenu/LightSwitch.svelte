<script lang="ts">
    // Pas de choix Système / Clair / Sombre : l'appli suit toujours le réglage de l'appareil.
    import { onMount } from "svelte";

    onMount(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const apply = () => document.documentElement.setAttribute("data-mode", media.matches ? "dark" : "light");
        apply();
        media.addEventListener("change", apply);
        return () => media.removeEventListener("change", apply);
    });
</script>

<svelte:head>
    <script>
        (function initMode() {
            const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute("data-mode", dark ? "dark" : "light");
        })();
    </script>
</svelte:head>
