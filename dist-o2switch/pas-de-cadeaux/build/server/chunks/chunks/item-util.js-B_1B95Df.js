// src/lib/item-util.ts
function userCanEditOnSomeList(item, userId) {
	if (!userId) return false;
	if (itemIsForUser(item, userId) || itemCreatedByUser(item, userId)) return true;
	for (const list of item.lists) if (itemIsOnListOwnedByUser({ ...list }, userId) || itemIsOnListManagedByUser({ ...list }, userId)) return true;
	return false;
}
function userCanEdit(item, userId) {
	if (!userId) return false;
	return itemIsForUser(item, userId) || itemCreatedByUser(item, userId) || itemIsOnListOwnedByUser(item, userId) || itemIsOnListManagedByUser(item, userId);
}
function itemIsForUser(item, userId) {
	return item.user.id === userId;
}
function itemCreatedByUser(item, userId) {
	return item.createdById === userId;
}
function itemIsOnListOwnedByUser(item, userId) {
	return item.list.ownerId === userId;
}
function itemIsOnListManagedByUser(item, userId) {
	return item.list.managers.find(({ userId: managerId }) => managerId === userId) !== void 0;
}

export { userCanEdit as a, userCanEditOnSomeList as u };
//# sourceMappingURL=item-util.js-B_1B95Df.js.map
