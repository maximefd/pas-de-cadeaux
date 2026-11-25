import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { requireLogin } from "$lib/server/auth";
import { client } from "$lib/server/prisma";

export const load = (async () => {
    const user = requireLogin();
    if (user.onboardedAt) {
        redirect(302, "/lists");
    }
    return {};
}) satisfies PageServerLoad;

export const actions = {
    start: async () => {
        const user = requireLogin();
        await client.user.update({ where: { id: user.id }, data: { onboardedAt: new Date() } });
        redirect(303, "/wishlists/me");
    }
} satisfies Actions;
