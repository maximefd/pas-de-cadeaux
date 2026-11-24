import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { client } from "$lib/server/prisma";
import { getFormatter } from "$lib/server/i18n";
import { requireLoginOrError } from "$lib/server/auth";
import { requireCommentAccess } from "$lib/server/comments";

// L'auteur, mais aussi tout membre qui voit l'idée, peut retirer un commentaire.
export const DELETE: RequestHandler = async ({ params }) => {
    const user = await requireLoginOrError();
    const $t = await getFormatter();

    const itemId = parseInt(params.itemId);
    if (isNaN(itemId)) {
        error(400, $t("errors.item-id-must-be-a-number"));
    }
    await requireCommentAccess(user, params.listId, itemId);

    const { count } = await client.itemComment.deleteMany({ where: { id: params.commentId, itemId } });
    if (count === 0) {
        error(404, $t("errors.item-not-found"));
    }
    return new Response();
};
