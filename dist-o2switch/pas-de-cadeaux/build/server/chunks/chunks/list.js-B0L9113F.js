import { c as client } from './prisma.js-iNNVyVix.js';
import { c as claimFilter } from './sort-filter-util.js-B1LxSaRF.js';
import { t as toItemOnListDTO, h as hideSecretsFromOwner } from './item-mapper.js-DUyKoq81.js';
import { g as getItemInclusions } from './items.js-C_2ihKyH.js';
import { g as getConfig } from './config.js-465rpi-p.js';
import { i as itemSorter } from './comparators.js-DkswRRoE.js';
import { g as getFormatter } from './i18n.js-D1Rw55oM.js';
import { x as error } from './utils.js-CAPFIGDr.js';
import { init } from '@paralleldrive/cuid2';

// src/lib/server/list.ts
var create = async (ownerId, groupId, otherData) => {
	const cuid2 = init({ length: 10 });
	return await client.list.create({ data: {
		id: cuid2(),
		ownerId,
		groupId,
		...otherData
	} });
};
var adjustListManagers = async (listId, managers) => {
	if (!managers) return;
	const existingManagers = await client.listManager.findMany({ where: { listId } });
	const managersToDelete = existingManagers.filter(({ userId }) => !managers.includes(userId)).map(({ id }) => id);
	const managersToCreate = managers.filter((userId) => existingManagers.find((manager) => manager.userId === userId) === void 0);
	await client.$transaction([client.listManager.deleteMany({ where: { id: { in: managersToDelete } } }), client.listManager.createMany({ data: managersToCreate.map((userId) => ({
		listId,
		userId
	})) })]);
};
var deleteList = async (id) => {
	return client.$transaction(async (tx) => {
		const list = await tx.list.delete({
			select: {
				id: true,
				items: { select: { item: { select: {
					id: true,
					userId: true,
					lists: { select: { id: true } }
				} } } }
			},
			where: { id }
		});
		const orphanedItems = list.items.map((li) => li.item).filter((i) => i.lists.filter((l) => l.id !== list.id).length === 0).map((i) => i.id);
		await tx.item.deleteMany({ where: { id: { in: orphanedItems } } });
	});
};
var deleteLists = async (ownerId, groupId) => {
	return client.$transaction(async (tx) => {
		const lists = await tx.list.findMany({
			select: {
				id: true,
				items: { select: { item: { select: {
					id: true,
					userId: true,
					lists: { select: { id: true } }
				} } } }
			},
			where: {
				ownerId,
				groupId
			}
		});
		await tx.list.deleteMany({ where: { id: { in: lists.map((l) => l.id) } } });
		const listIds = new Set(lists.map((l) => l.id));
		const orphanedItems = lists.flatMap((list) => list.items).map((li) => li.item).filter((i) => i.lists.filter((l) => !listIds.has(l.id)).length === 0).map((i) => i.id);
		await tx.item.deleteMany({ where: { id: { in: orphanedItems } } });
	});
};
var getById = async (id) => {
	return await client.list.findUnique({
		select: {
			id: true,
			name: true,
			owner: { select: {
				id: true,
				username: true,
				name: true
			} },
			managers: { select: { userId: true } },
			groupId: true,
			public: true,
			description: true,
			allowSelfClaims: true,
			notForMe: true
		},
		where: { id }
	});
};
var getItems = async (listId, options) => {
	const itemListFilter = {};
	if (options.suggestionMethod === "approval" && !options.loggedInUserId && options.loggedInUserId !== options.listOwnerId && !options.listManagers?.has(options.loggedInUserId || "")) itemListFilter.approved = true;
	if (options.suggestionMethod === "surprise" && (options.loggedInUserId === options.listOwnerId || options.loggedInUserId && options.listManagers?.has(options.loggedInUserId))) {
		if (options.listManagers) itemListFilter.addedById = { in: [options.listOwnerId, ...options.listManagers] };
		else itemListFilter.addedById = options.loggedInUserId;
	}
	const list = await client.list.findUnique({
		where: { id: listId },
		select: { id: true }
	});
	if (!list) return [];
	return (await client.item.findMany({
		where: { lists: {
			some: { listId: list.id },
			every: itemListFilter
		} },
		include: getItemInclusions(list.id)
	})).filter((item) => item.lists.length > 0).map((i) => toItemOnListDTO(options.hideOffered ? hideSecretsFromOwner(i) : i, list.id)).filter((item) => options.includeOffered || !item.offered).filter(claimFilter(options.filter, options.loggedInUserId)).toSorted(itemSorter({
		sort: options.sort,
		dir: options.sortDir,
		userId: options.loggedInUserId,
		listOwnerId: options.listOwnerId,
		isSelfClaimable: options.isSelfClaimable
	}));
};
var availableListSelection = {
	id: true,
	name: true,
	public: true,
	owner: { select: { name: true } },
	group: { select: {
		id: true,
		name: true
	} }
};
/**
* Returns all lists that are owned by ownerId that can be accessed by loggedInUserId.
* Accessed in this context means the logged in user is either in the same group as the list,
* the list is public, or is a manager of the list. In the first two scenarios,
* suggestions must be enabled for the group.
*/
var getAvailableLists = async (ownerId, loggedInUserId) => {
	if (ownerId === loggedInUserId) return {
		usersLists: await client.list.findMany({
			select: availableListSelection,
			where: { ownerId }
		}),
		managedLists: await client.list.findMany({
			select: availableListSelection,
			where: { managers: { some: { userId: ownerId } } }
		})
	};
	const managedLists = await client.list.findMany({
		select: availableListSelection,
		where: {
			ownerId,
			managers: { some: { userId: loggedInUserId } }
		}
	});
	const overlappingGroups = await Promise.all([client.userGroupMembership.findMany({
		select: { groupId: true },
		where: { userId: ownerId }
	}), client.userGroupMembership.findMany({
		select: { groupId: true },
		where: { userId: loggedInUserId }
	})]).then(([ownersGroups, loggedInUsersGroups]) => {
		const ownersGroupIds = new Set(ownersGroups.map(({ groupId }) => groupId));
		const loggedInUserGroupIds = new Set(loggedInUsersGroups.map(({ groupId }) => groupId));
		return ownersGroupIds.intersection(loggedInUserGroupIds);
	});
	const ownersListsInCommonGroups = await client.list.findMany({
		select: availableListSelection,
		where: {
			ownerId,
			groupId: { in: [...overlappingGroups] }
		}
	});
	const ownersPublicLists = await client.list.findMany({
		select: availableListSelection,
		where: {
			ownerId,
			public: true,
			id: { notIn: ownersListsInCommonGroups.map(({ id }) => id) }
		}
	});
	const distinctLists = new Set(managedLists.map(({ id }) => id));
	const listsAvailable = [...managedLists];
	for (const list of [...ownersListsInCommonGroups, ...ownersPublicLists]) if ((await getConfig(list.group.id)).suggestions.enable && !distinctLists.has(list.id)) {
		listsAvailable.push(list);
		distinctLists.add(list.id);
	}
	return {
		usersLists: listsAvailable,
		managedLists: []
	};
};
var getNextDisplayOrderForLists = async (listIds, mostWanted = false) => {
	if (mostWanted) return listIds.reduce((accum, listId) => {
		accum[listId] = -1;
		return accum;
	}, {});
	else return (await client.listItem.groupBy({
		by: ["listId"],
		_max: { displayOrder: true },
		_count: { id: true },
		where: { listId: { in: listIds } }
	})).reduce((accum, curr) => {
		accum[curr.listId] = curr._max.displayOrder ? curr._max.displayOrder + 1 : curr._count.id;
		return accum;
	}, {});
};
var verifyUserCanManageList = async (userId, list) => {
	const $t = await getFormatter();
	const managerIds = new Set(list.managers.map(({ userId }) => userId));
	if (list.owner.id !== userId && !managerIds.has(userId)) error(403, $t("errors.not-authorized"));
};

export { getNextDisplayOrderForLists as a, getById as b, getItems as c, deleteList as d, adjustListManagers as e, create as f, getAvailableLists as g, deleteLists as h, verifyUserCanManageList as v };
//# sourceMappingURL=list.js-B0L9113F.js.map
