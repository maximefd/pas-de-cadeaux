<script lang="ts">
    import { page } from "$app/state";
    import { getFormatter } from "$lib/i18n";

    interface Props {
        navItems: NavItem[];
        user: LocalUser | null;
    }

    const { navItems, user }: Props = $props();
    const t = getFormatter();

    // Onglet actif : « Mes envies » sur sa propre liste, « Proches » sur les listes des autres.
    const current = $derived.by(() => {
        const path = page.url.pathname;
        if (path.startsWith("/aide")) return "app.help";
        const list = page.data?.list as { owner?: { isMe?: boolean } } | undefined;
        if (path.startsWith("/lists/") && list?.owner?.isMe) return "wishes.my-lists";
        if (path === "/lists" || path.startsWith("/lists/") || path.startsWith("/wishlists/")) return "app.home";
        return undefined;
    });
</script>

{#if user}
    <nav class="paper-bottom-tabs print:hidden" aria-label={$t("a11y.menu")}>
        <div>
            {#each navItems as navItem (navItem.labelKey)}
                <a
                    aria-current={current === navItem.labelKey ? "page" : undefined}
                    data-sveltekit-preload-data
                    href={navItem.href(user)}
                >
                    {$t(navItem.labelKey)}
                </a>
            {/each}
        </div>
    </nav>
{/if}
