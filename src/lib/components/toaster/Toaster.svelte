<script lang="ts">
    import { Toast } from "@skeletonlabs/skeleton-svelte";
    import { toaster } from ".";
    import { getFormatter } from "$lib/i18n";

    const t = getFormatter();

    interface Props {
        yShift: number | undefined;
    }

    let { yShift }: Props = $props();
</script>

<Toast.Group style={yShift ? `bottom: ${yShift}px;` : undefined} {toaster}>
    {#snippet children(toast)}
        <Toast class="rounded-container" {toast}>
            <Toast.Message>
                {#if toast.title}
                    <Toast.Title>{toast.title}</Toast.Title>
                {/if}
                <Toast.Description>{toast.description}</Toast.Description>
            </Toast.Message>
            {#if toast.action}
                <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            {/if}
            <Toast.CloseTrigger aria-label={$t("a11y.close")} />
        </Toast>
    {/snippet}
</Toast.Group>
