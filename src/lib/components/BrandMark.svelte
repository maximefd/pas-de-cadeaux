<script lang="ts">
    import { APP_NAME } from "$lib/brand";

    interface Props {
        hideText?: boolean;
    }

    const { hideText = false }: Props = $props();
</script>

<span class="paper-brand">
    <img class="paper-brand-icon" alt="" height="256" src="/logo.webp" width="230" />
    <span class={["paper-brand-name", hideText && "hidden sm:inline"]}>{APP_NAME}</span>
</span>
