import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getActiveMembership } from "$lib/server/group-membership";
import { client } from "$lib/server/prisma";
import { requireLogin } from "$lib/server/auth";
import { create } from "$lib/server/list";

// « Mes envies » : chacun a une liste dans le cercle actif. On l'ouvre directement, et on la crée si besoin.
export const load: PageServerLoad = async () => {
    const user = requireLogin();

    const activeMembership = await getActiveMembership(user);
    let list = await client.list.findFirst({
        select: {
            id: true
        },
        where: {
            ownerId: user.id,
            groupId: activeMembership.groupId,
            notForMe: false
        }
    });
    if (!list) {
        list = await create(user.id, activeMembership.groupId);
    }

    redirect(302, `/lists/${list.id}`);
};
