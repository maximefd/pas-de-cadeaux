<script lang="ts">
    import { page } from "$app/state";
    import PasswordInput from "$lib/components/PasswordInput.svelte";
    import { getFormatter } from "$lib/i18n";

    interface Props {
        hideActions?: boolean;
        signingIn?: boolean;
        emailOptional?: boolean;
    }

    const { hideActions = false, signingIn = false, emailOptional = false }: Props = $props();
    const t = getFormatter();

    let data = $derived(page.data);
    let formData = $derived(page.form);

    let password = $state("");
    let passwordConfirm = $state("");
</script>

<div class="paper-fields">
    {#if data.id}
        <input id="tokenId" name="tokenId" class="hidden" value={data.id} />
    {/if}
    <label class="label" for="name">
        <span>{$t("auth.name")}</span>
        <input
            id="name"
            name="name"
            class={["input", formData?.errors?.name && "input-invalid"]}
            aria-describedby="name-hint"
            autocomplete="given-name"
            enterkeyhint="next"
            required
            type="text"
        />
        {#if formData?.errors?.name}
            <span class="text-invalid">{formData.errors.name[0]}</span>
        {/if}
    </label>
    <small id="name-hint" class="paper-field-hint">{$t("auth.name-hint")}</small>

    <div class="paper-fields">
        <label class="label" for="username">
            <span>{$t("auth.username")}</span>
            <input
                id="username"
                name="username"
                class={["input", formData?.errors?.username && "input-invalid"]}
                aria-describedby="username-hint"
                autocapitalize="off"
                autocomplete="username"
                autocorrect="off"
                enterkeyhint="next"
                required
                type="text"
            />
            {#if formData?.errors?.username}
                <span class="text-invalid">{formData.errors.username[0]}</span>
            {/if}
        </label>
        <small id="username-hint" class="paper-field-hint">{$t("auth.username-hint")}</small>
        <label class="label" for="email">
            <span>
                {$t("auth.email")}
                {#if emailOptional}<small class="paper-optional">({$t("general.optional")})</small>{/if}
            </span>
            <input
                id="email"
                name="email"
                class={["input", formData?.errors?.email && "input-invalid"]}
                autocomplete="email"
                inputmode="email"
                required={!emailOptional}
                type="email"
            />
            {#if formData?.errors?.email}
                <span class="text-invalid">{formData.errors.email[0]}</span>
            {/if}
        </label>
    </div>

    <PasswordInput
        id="password"
        name="password"
        autocomplete="new-password"
        label={$t("auth.password")}
        required
        strengthMeter
        bind:value={password}
    />
    <PasswordInput
        id="confirmpassword"
        autocomplete="new-password"
        label={$t("auth.confirm-password")}
        required
        bind:value={passwordConfirm}
    />

    {#if password !== passwordConfirm}
        <span class="text-invalid">{$t("auth.passwords-must-match")}</span>
    {/if}
    {#if formData?.errors?.password}
        <span class="text-invalid">{formData.errors.password[0]}</span>
    {/if}

    {#if formData?.error && formData?.message}
        <span class="text-invalid">{formData.message}</span>
    {/if}

    {#if !hideActions}
        <button class="paper-primary" disabled={password !== passwordConfirm || signingIn} type="submit">
            {#if signingIn}
                <span class="loading loading-spinner loading-xs"></span>
            {/if}
            <span>{$t("auth.create-account")}</span>
        </button>
        <div class="paper-auth-links">
            <a class="paper-link" href="/login">{$t("auth.sign-in")}</a>
        </div>
    {/if}
</div>
