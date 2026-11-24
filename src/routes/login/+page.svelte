<script lang="ts">
    import { enhance } from "$app/forms";
    import { page } from "$app/state";
    import PasswordInput from "$lib/components/PasswordInput.svelte";
    import type { PageProps } from "./$types";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Alert from "$lib/components/Alert.svelte";
    import { getFormatter } from "$lib/i18n";
    import { resolve } from "$app/paths";
    import { toaster } from "$lib/components/toaster";

    const { data, form }: PageProps = $props();
    const t = getFormatter();

    let signingIn = $state(false);
    let oAuthError: Record<string, string> | undefined = $state();
    onMount(async () => {
        if (data.isCallback) {
            const resp = await fetch("/login/oidc/callback", {
                method: "POST",
                body: JSON.stringify({ url: page.url })
            });
            if (!resp.ok) {
                oAuthError = await resp.json();
                goto(
                    resolve("/login") +
                        "?" +
                        new URLSearchParams({ error: oAuthError?.message || $t("general.oops") }).toString()
                );
            } else if (resp.redirected) {
                goto(resp.url, { invalidateAll: true });
            }
        }
    });
</script>

<div class="paper-auth">
    <h1 class="h1 capitalize">{$t("auth.sign-in")}</h1>

    <form
        class="paper-form"
        method="POST"
        use:enhance={(form) => {
            signingIn = true;
            return async ({ result, update }) => {
                signingIn = false;

                if (result.type === "failure") {
                    form.formElement.reset();
                } else if (result.type === "error") {
                    toaster.error({ description: result.error });
                }
                await update();
            };
        }}
    >
        <div class="paper-fields">
            {#if data.isCallback}
                <div class="flex flex-col items-center justify-center space-y-4">
                    <span class="loading loading-spinner w-8 md:w-12"></span>
                    <span class="text-lg md:text-xl">{$t("auth.authenticating")}</span>
                </div>
            {:else}
                {#if data.enableLogin}
                    <label class="label" for="username">
                        <span>{$t("auth.username")}</span>
                        <input
                            id="username"
                            name="username"
                            class={["input", (form?.incorrect || form?.error) && "input-invalid"]}
                            autocapitalize="off"
                            autocomplete="username"
                            autocorrect="off"
                            enterkeyhint="next"
                            required
                            type="text"
                        />
                        {#if form?.errors?.username}
                            <span class="text-invalid">
                                {form.errors.username[0]}
                            </span>
                        {/if}
                    </label>

                    <div class="relative flex flex-col space-y-4">
                        <PasswordInput
                            id="password"
                            name="password"
                            autocomplete="current-password"
                            error={form?.incorrect || form?.error}
                            label={$t("auth.password")}
                            required
                        />

                        {#if form?.incorrect}
                            <span class="text-invalid">
                                {$t("errors.invalid-credentials")}
                            </span>
                        {/if}
                        {#if form?.errors?.password}
                            <span class="text-invalid">
                                {form.errors.password[0]}
                            </span>
                        {/if}

                        <button class="paper-primary" disabled={signingIn}>
                            {#if signingIn}
                                <span class="loading loading-spinner loading-xs"></span>
                            {/if}
                            <span>{$t("auth.sign-in")}</span>
                        </button>

                        <div class="paper-auth-links">
                            <a class="paper-link" href="/forgot-password">{$t("auth.forgot-password")}</a>
                            {#if data.enableSignup}
                                <a class="paper-link" href="/signup">{$t("auth.create-an-account")}</a>
                            {/if}
                        </div>
                    </div>
                {/if}
                {#if data.oidcConfig?.ready}
                    {#if data.enableLogin}
                        <p class="paper-or">{$t("auth.or")}</p>
                    {/if}
                    <div class="flex justify-center">
                        <button
                            class="paper-primary"
                            disabled={signingIn}
                            onclick={() => window.location.assign(`/login/oidc${page.url.search}`)}
                            type="button"
                        >
                            {$t("auth.sign-in-with", { values: { provider: data.oidcConfig.providerName || "OAuth" } })}
                        </button>
                    </div>
                {/if}
            {/if}
        </div>
    </form>
    {#if data.error}
        <Alert class="w-80 md:w-1/2" noicon title={$t("errors.oidc-error")} type="error">
            <pre class="text-wrap">{data.error}</pre>
        </Alert>
    {/if}
</div>

<svelte:head>
    <title>{$t("auth.sign-in")}</title>
</svelte:head>
