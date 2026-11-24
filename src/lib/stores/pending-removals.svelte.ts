import { SvelteSet } from "svelte/reactivity";

/** Ids des idées « retirées » côté client, en attente de l'expiration du délai d'annulation. */
export const pendingRemovals = new SvelteSet<number>();
