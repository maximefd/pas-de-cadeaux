import { error } from "@sveltejs/kit";
import { client } from "./prisma";
import { getFormatter } from "./i18n";
import { getActiveMembership } from "./group-membership";

export const MAX_COMMENT_LENGTH = 300;

// Les commentaires sont invisibles pour la personne concernée et ses gestionnaires (comme l'état « offert »),
// sauf sur les listes auto-réservables / « pas pour moi ». Cette fonction est le seul point d'accès :
// elle répond 404 si l'idée n'est pas dans la liste/le groupe actif et 403 côté propriétaire.
export const requireCommentAccess = async (
    user: Parameters<typeof getActiveMembership>[0],
    listId: string,
    itemId: number
) => {
    const $t = await getFormatter();

    const list = await client.list.findUnique({
        select: {
            groupId: true,
            ownerId: true,
            allowSelfClaims: true,
            notForMe: true,
            managers: { select: { userId: true } },
            items: { select: { itemId: true }, where: { itemId } }
        },
        where: { id: listId }
    });
    if (!list || list.items.length === 0) {
        error(404, $t("errors.item-not-found"));
    }

    const activeMembership = await getActiveMembership(user);
    if (list.groupId !== activeMembership.groupId) {
        error(404, $t("errors.list-not-found"));
    }

    const isOwnerSide = list.ownerId === user.id || list.managers.some(({ userId }) => userId === user.id);
    if (isOwnerSide && !(list.allowSelfClaims || list.notForMe)) {
        error(403, $t("errors.not-authorized"));
    }
};
