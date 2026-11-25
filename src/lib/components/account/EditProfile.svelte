<script lang="ts">
    import { enhance } from "$app/forms";
    import { page } from "$app/state";
    import { getFormatter } from "$lib/i18n";
    import { toaster } from "../toaster";
    import Label from "../Label.svelte";
    import Input from "../Input.svelte";

    interface Props {
        user: Pick<LocalUser, "name" | "username" | "email" | "picture">;
        disabled: boolean;
        autocomplete?: boolean;
    }

    let { user, disabled, autocomplete = true }: Props = $props();
    const t = getFormatter();

    const isPlaceholderEmail = $derived(!!user.email?.endsWith("@sans-email.invalid"));
</script>

<div class="paper-account">
    <form
        method="POST"
        use:enhance={() => {
            return async ({ result, update }) => {
                if (result.type === "failure") {
                    toaster.error({ description: (result.data?.message as string) || $t("general.oops") });
                    return;
                }

                toaster.info({ description: "Profile info updated" });
                update({ invalidateAll: true });
            };
        }}
    >
        <div class="flex flex-col gap-4">
            <Label value={$t("auth.name")}>
                <Input
                    id="name"
                    name="name"
                    autocomplete={autocomplete ? "name" : "off"}
                    {disabled}
                    error={page.form?.errors?.name?.[0]}
                    icon="ion:id-card"
                    placeholder={user.name}
                    type="text"
                    value={user.name}
                />
            </Label>

            <Label value={$t("auth.username")}>
                <Input
                    name="username"
                    autocomplete={autocomplete ? "username" : "off"}
                    {disabled}
                    error={page.form?.errors?.username?.[0]}
                    icon="ion:person"
                    placeholder={user.username}
                    type="text"
                    value={user.username}
                />
            </Label>

            {#if isPlaceholderEmail}
                <!-- Compte créé sans e-mail : on ne montre pas l'adresse technique -->
                <input name="email" type="hidden" value={user.email} />
            {:else}
                <Label value={$t("auth.email")}>
                    <Input
                        name="email"
                        autocomplete={autocomplete ? "email" : "off"}
                        {disabled}
                        error={page.form?.errors?.email?.[0]}
                        icon="ion:person"
                        placeholder={user.email}
                        type="text"
                        value={user.email}
                    />
                </Label>
            {/if}

            {#if disabled}
                <span>{$t("admin.profile-disabled")}</span>
            {/if}

            <button class="paper-primary" {disabled} formaction="?/profile" type="submit">
                {$t("general.update")}
            </button>
        </div>
    </form>
</div>
