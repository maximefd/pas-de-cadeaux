import { error } from "@sveltejs/kit";
import z from "zod";
import type { RequestHandler } from "./$types";
import { client } from "$lib/server/prisma";
import { getFormatter } from "$lib/server/i18n";
import { requireLoginOrError } from "$lib/server/auth";
import { getActiveMembership } from "$lib/server/group-membership";
import { getItemInclusions } from "$lib/server/items";
import { itemEmitter } from "$lib/server/events/emitters";
import { ItemEvent } from "$lib/events";
import { logger } from "$lib/server/logger";

const offeredSchema = z.object({ offered: z.boolean() });

// Mark an item as offered (or not) in one click. No identity nor date is stored.
export const PUT: RequestHandler = async ({ request, params }) => {
    const user = await requireLoginOrError();
    const $t = await getFormatter();

    const itemId = parseInt(params.itemId);
    if (isNaN(itemId)) {
        error(400, $t("errors.item-id-must-be-a-number"));
    }
    const body = offeredSchema.safeParse(await request.json().catch(() => null));
    if (!body.success) {
        error(422, JSON.stringify(z.flattenError(body.error).fieldErrors));
    }

    const list = await client.list.findUnique({
        select: {
            id: true,
            groupId: true,
            ownerId: true,
            allowSelfClaims: true,
            notForMe: true,
            managers: { select: { userId: true } },
            items: { select: { addedById: true }, where: { itemId } }
        },
        where: { id: params.listId }
    });
    if (!list || list.items.length === 0) {
        error(404, $t("errors.item-not-found"));
    }

    const activeMembership = await getActiveMembership(user);
    if (list.groupId !== activeMembership.groupId) {
        error(404, $t("errors.list-not-found"));
    }

    const managerIds = list.managers.map(({ userId }) => userId);
    const isOwnerSide = list.ownerId === user.id || managerIds.includes(user.id);
    const isSelfClaimable = list.allowSelfClaims || list.notForMe;
    if (isOwnerSide && !isSelfClaimable) {
        // The recipient must never be able to see (or change) the offered state, unless the list is a self-claim list
        error(403, $t("errors.not-authorized"));
    }

    try {
        await client.item.update({ where: { id: itemId }, data: { offered: body.data.offered } });
        const updatedItem = await client.item.findUnique({ where: { id: itemId }, include: getItemInclusions() });
        if (updatedItem) itemEmitter.emit(ItemEvent.ITEM_UPDATE, updatedItem);
        return new Response();
    } catch (err) {
        logger.error({ err }, "Unable to update offered state");
        error(500, $t("errors.unable-to-update-claim"));
    }
};
