<script lang="ts">
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import { UserAPI } from "$lib/api/users";
    import { getFormatter } from "$lib/i18n";

    interface Props {
        user: LocalUser | undefined;
        groups: GroupInformation[] | null | undefined;
    }

    const { user, groups }: Props = $props();
    const t = getFormatter();

    let pending: string | undefined = $state();

    // Les « cercles » (Famille, Amis…) sont les groupes existants : choisir un onglet change le groupe actif.
    const select = async (group: GroupInformation) => {
        if (group.active || !user || pending) return;
        pending = group.id;
        try {
            await new UserAPI(user.id).setActiveGroup(group.id);
            await goto(resolve("/lists"), { invalidateAll: true });
        } finally {
            pending = undefined;
        }
    };
</script>

{#if groups && groups.length > 1}
    <nav class="paper-tabs print:hidden" aria-label={$t("wishes.circles")}>
        {#each groups as group (group.id)}
            <button
                class="paper-tab"
                aria-current={group.active ? "true" : undefined}
                disabled={pending !== undefined}
                onclick={() => select(group)}
                type="button"
            >
                {group.name}
            </button>
        {/each}
    </nav>
{/if}
