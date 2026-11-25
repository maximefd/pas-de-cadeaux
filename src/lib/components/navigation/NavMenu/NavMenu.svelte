<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import { Role } from "$lib/schema";
    import GroupSubMenu from "./GroupSubMenu.svelte";
    import { getFormatter } from "$lib/i18n";
    import LightSwitch from "./LightSwitch.svelte";
    import Popup from "$lib/components/Popup.svelte";

    interface Props {
        user: LocalUser | null;
        groups: GroupInformation[] | null;
        isProxyUser: boolean;
    }

    const { user, groups, isProxyUser }: Props = $props();
    const t = getFormatter();

    let open = $state(false);

    const closeMenu = () => {
        open = false;
    };
</script>

{#if user}
    <div class="flex min-w-0 items-center">
        <Popup zIndex="z-20!" bind:open>
            {#snippet trigger(props)}
                <button class="paper-header-link" {...props}>
                    <span aria-hidden="true">{$t("admin.account")}</span>
                    <span class="sr-only">{$t("a11y.user-menu")}</span>
                </button>
            {/snippet}
            {#snippet content(props)}
                <div {...props}>
                    <nav
                        class="card preset-filled-surface-100-900 list-nav p-4 shadow-xl"
                        data-testid="user menu navigation"
                    >
                        <ul>
                            <li>
                                <a href="/account" onclick={closeMenu}>
                                    <iconify-icon icon="ion:person"></iconify-icon>
                                    <span class="flex-auto">{$t("admin.account")}</span>
                                </a>
                            </li>
                            <li>
                                <a href="/claims" onclick={closeMenu}>
                                    <iconify-icon icon="ion:albums"></iconify-icon>
                                    <span class="flex-auto">{$t("app.my-claims")}</span>
                                </a>
                            </li>
                            {#if user.roleId == Role.ADMIN}
                                <li>
                                    <a href="/admin" onclick={closeMenu}>
                                        <iconify-icon icon="ion:settings"></iconify-icon>
                                        <span class="flex-auto">{$t("admin.admin")}</span>
                                    </a>
                                </li>
                            {/if}

                            <hr class="hr" />
                            <GroupSubMenu {groups} onSelect={closeMenu} {user} />
                            {#if !isProxyUser}
                                <hr class="hr" />
                                <li>
                                    <button
                                        class="list-option w-full"
                                        onclick={async () => {
                                            closeMenu();
                                            await fetch("/logout", { method: "POST" });
                                            invalidateAll();
                                        }}
                                    >
                                        <iconify-icon icon="ion:log-out"></iconify-icon>
                                        <p>{$t("auth.sign-out")}</p>
                                    </button>
                                </li>
                            {/if}
                            <hr class="hr pb-1" />
                            <li>
                                <div class="flex w-full justify-around pt-1">
                                    <LightSwitch />
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            {/snippet}
        </Popup>
    </div>
{:else}
    <LightSwitch />
{/if}
