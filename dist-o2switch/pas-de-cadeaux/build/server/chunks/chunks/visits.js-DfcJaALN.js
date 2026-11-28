import { c as client } from './prisma.js-iNNVyVix.js';

// src/lib/server/visits.ts
var newItemWhere = (userId, since) => ({
	approved: true,
	addedById: { not: userId },
	createdAt: since ? { gt: since } : { not: null },
	item: { offered: false }
});
var getNewItemIds = async (userId, listId) => {
	const visit = await client.listVisit.findUnique({
		where: { userId_listId: {
			userId,
			listId
		} },
		select: { visitedAt: true }
	});
	return (await client.listItem.findMany({
		where: {
			listId,
			...newItemWhere(userId, visit?.visitedAt ?? null)
		},
		select: { itemId: true }
	})).map(({ itemId }) => itemId);
};
var getListIdsWithNews = async (userId, listIds) => {
	if (listIds.length === 0) return /* @__PURE__ */ new Set();
	const [visits, candidates] = await Promise.all([client.listVisit.findMany({ where: {
		userId,
		listId: { in: listIds }
	} }), client.listItem.findMany({
		where: {
			listId: { in: listIds },
			...newItemWhere(userId, null)
		},
		select: {
			listId: true,
			createdAt: true
		}
	})]);
	const visitedAt = new Map(visits.map((v) => [v.listId, v.visitedAt.getTime()]));
	const withNews = /* @__PURE__ */ new Set();
	for (const { listId, createdAt } of candidates) if (createdAt && createdAt.getTime() > (visitedAt.get(listId) ?? 0)) withNews.add(listId);
	return withNews;
};
var markListVisited = async (userId, listId) => {
	const visitedAt = /* @__PURE__ */ new Date();
	await client.listVisit.upsert({
		where: { userId_listId: {
			userId,
			listId
		} },
		create: {
			userId,
			listId,
			visitedAt
		},
		update: { visitedAt }
	});
};

export { getNewItemIds as a, getListIdsWithNews as g, markListVisited as m };
//# sourceMappingURL=visits.js-DfcJaALN.js.map
