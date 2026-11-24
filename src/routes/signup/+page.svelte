<script lang="ts">
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";
    import type { PageProps } from "./$types";
    import CreateAccountForm from "$lib/components/CreateAccountForm.svelte";
    import { getFormatter } from "$lib/i18n";

    const { data }: PageProps = $props();
    const t = getFormatter();

    onMount(() => {
        if (data.valid) window.history.replaceState({}, "", "/signup");
    });

    let signingIn = $state(false);
</script>

<div class="paper-auth">
    <h1 class="h1 capitalize">{$t("auth.create-account")}</h1>

    <form
        class="paper-form"
        method="POST"
        use:enhance={() => {
            signingIn = true;
            return async ({ update }) => {
                signingIn = false;
                return update();
            };
        }}
    >
        <CreateAccountForm emailOptional {signingIn} />
    </form>
</div>

<svelte:head>
    <title>{$t("auth.create-an-account")}</title>
</svelte:head>
