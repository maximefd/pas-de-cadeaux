import type { PageServerLoad } from "./$types";
import { requireLogin } from "$lib/server/auth";

export const load = (async () => {
    requireLogin();
    return {};
}) satisfies PageServerLoad;
