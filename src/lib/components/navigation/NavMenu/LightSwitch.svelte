<script lang="ts">
    import { getFormatter } from "$lib/i18n";
    import { LocalStorage } from "$lib/local-storage.svelte";
    import { onMount } from "svelte";

    const t = getFormatter();

    const options = [
        { value: "system", text: $t("general.system") },
        { value: "light", text: $t("general.light") },
        { value: "dark", text: $t("general.dark") }
    ];

    const modeLocalStorage = new LocalStorage<string>("mode", "system");

    let value = $state("system");

    const setPreference = (pref: string) => {
        document.documentElement.setAttribute("data-mode", pref);
    };

    $effect(() => {
        value = modeLocalStorage.current;
        if (value === "system") {
            const pref = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            setPreference(pref);
        } else {
            setPreference(value);
        }
    });

    onMount(() => {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
            if (value === "system") {
                setPreference(e.matches ? "dark" : "light");
            }
        });
    });
</script>

<div class="paper-mode" aria-label={$t("general.mode")} role="radiogroup">
    {#each options as { value: optionValue, text } (optionValue)}
        <button
            class="paper-mode-option"
            aria-checked={value === optionValue}
            onclick={() => (modeLocalStorage.current = optionValue)}
            role="radio"
            type="button"
        >
            {text}
        </button>
    {/each}
</div>

<svelte:head>
    <script>
        (function initMode() {
            let mode =
                typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem("mode")) || "system" : "system";
            if (mode === "system") {
                const pref = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                document.documentElement.setAttribute("data-mode", pref);
            } else {
                document.documentElement.setAttribute("data-mode", mode);
            }
        })();
    </script>
</svelte:head>
