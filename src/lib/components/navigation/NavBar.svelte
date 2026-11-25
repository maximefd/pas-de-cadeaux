<script lang="ts">
    import BrandMark from "../BrandMark.svelte";
    import NavMenu from "./NavMenu/NavMenu.svelte";

    interface Props {
        user: LocalUser | null;
        groups: GroupInformation[] | null;
        isProxyUser: boolean;
    }

    const { user, groups, isProxyUser }: Props = $props();
</script>

<!-- Fork "Pas de cadeaux !" : en-tête sobre, identique sur téléphone, tablette et ordinateur.
     La navigation se fait par les onglets du bas. -->
<div class="paper-header">
    <a class="paper-header-brand" href="/">
        <BrandMark />
    </a>
    <NavMenu {groups} {isProxyUser} {user} />
</div>
