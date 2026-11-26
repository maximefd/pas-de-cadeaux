import { client } from "./prisma";

// Idées qu'une personne a le droit de voir sur la liste d'un proche et qui sont arrivées depuis sa dernière visite.
// Les idées que cette personne a elle-même ajoutées, celles en attente d'approbation et celles déjà offertes ne comptent pas.
const newItemWhere = (userId: string, since: Date | null) => ({
    approved: true,
    addedById: { not: userId },
    createdAt: since ? { gt: since } : { not: null },
    item: { offered: false }
});

export const getNewItemIds = async (userId: string, listId: string): Promise<number[]> => {
    const visit = await client.listVisit.findUnique({
        where: { userId_listId: { userId, listId } },
        select: { visitedAt: true }
    });
    const rows = await client.listItem.findMany({
        where: { listId, ...newItemWhere(userId, visit?.visitedAt ?? null) },
        select: { itemId: true }
    });
    return rows.map(({ itemId }) => itemId);
};

// Les listes de proches (id) où il y a du nouveau pour cette personne.
export const getListIdsWithNews = async (userId: string, listIds: string[]): Promise<Set<string>> => {
    if (listIds.length === 0) return new Set();
    const [visits, candidates] = await Promise.all([
        client.listVisit.findMany({ where: { userId, listId: { in: listIds } } }),
        client.listItem.findMany({
            where: { listId: { in: listIds }, ...newItemWhere(userId, null) },
            select: { listId: true, createdAt: true }
        })
    ]);
    const visitedAt = new Map(visits.map((v) => [v.listId, v.visitedAt.getTime()]));
    const withNews = new Set<string>();
    for (const { listId, createdAt } of candidates) {
        if (createdAt && createdAt.getTime() > (visitedAt.get(listId) ?? 0)) withNews.add(listId);
    }
    return withNews;
};

export const markListVisited = async (userId: string, listId: string) => {
    const visitedAt = new Date();
    await client.listVisit.upsert({
        where: { userId_listId: { userId, listId } },
        create: { userId, listId, visitedAt },
        update: { visitedAt }
    });
};
