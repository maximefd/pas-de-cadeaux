<script lang="ts">
    import { APP_NAME } from "$lib/brand";

    interface Props {
        hideText?: boolean;
    }

    const { hideText = false }: Props = $props();
</script>

<span class="paper-brand">
    <svg aria-hidden="true" class="paper-brand-icon" fill="none" viewBox="0 0 24 24">
        <rect height="9" rx="1.5" stroke="currentColor" stroke-width="1.6" width="16" x="4" y="11.5" />
        <rect height="4" rx="1" stroke="currentColor" stroke-width="1.6" width="18" x="3" y="7.5" />
        <path d="M12 7.5v13.5" stroke="currentColor" stroke-width="1.6" />
        <path
            d="M12 7.5c-1-3.2-5-3.6-5-1.4 0 1.6 3 1.4 5 1.4Zm0 0c1-3.2 5-3.6 5-1.4 0 1.6-3 1.4-5 1.4Z"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="1.6"
        />
    </svg>
    <span class={["paper-brand-name", hideText && "hidden sm:inline"]}>{APP_NAME}</span>
</span>
