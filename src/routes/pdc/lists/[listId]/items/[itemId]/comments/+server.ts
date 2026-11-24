import { error, json } from "@sveltejs/kit";
import z from "zod";
import type { RequestHandler } from "./$types";
import { client } from "$lib/server/prisma";
import { getFormatter } from "$lib/server/i18n";
import { requireLoginOrError } from "$lib/server/auth";
import { MAX_COMMENT_LENGTH, requireCommentAccess } from "$lib/server/comments";

const commentSchema = z.object({ text: z.string().trim().min(1).max(MAX_COMMENT_LENGTH) });

const parseItemId = async (raw: string) => {
    const itemId = parseInt(raw);
    if (isNaN(itemId)) {
        const $t = await getFormatter();
        error(400, $t("errors.item-id-must-be-a-number"));
    }
    return itemId;
};

// Commentaires d'une idée, du plus ancien au plus récent. 403 pour la personne concernée et ses gestionnaires.
export const GET: RequestHandler = async ({ params }) => {
    const user = await requireLoginOrError();
    const itemId = await parseItemId(params.itemId);
    await requireCommentAccess(user, params.listId, itemId);

    const comments = await client.itemComment.findMany({
        where: { itemId },
        orderBy: { createdAt: "asc" },
        select: { id: true, text: true, createdAt: true, author: { select: { id: true, name: true } } }
    });
    return json(
        comments.map(({ id, text, createdAt, author }) => ({
            id,
            text,
            createdAt,
            authorName: author.name,
            mine: author.id === user.id
        }))
    );
};

// Ajoute un commentaire court signé du nom de l'auteur.
export const POST: RequestHandler = async ({ request, params }) => {
    const user = await requireLoginOrError();
    const itemId = await parseItemId(params.itemId);
    await requireCommentAccess(user, params.listId, itemId);

    const body = commentSchema.safeParse(await request.json().catch(() => null));
    if (!body.success) {
        error(422, JSON.stringify(z.flattenError(body.error).fieldErrors));
    }

    const created = await client.itemComment.create({
        data: { itemId, authorId: user.id, text: body.data.text },
        select: { id: true, text: true, createdAt: true }
    });
    return json({ ...created, authorName: user.name, mine: true }, { status: 201 });
};
