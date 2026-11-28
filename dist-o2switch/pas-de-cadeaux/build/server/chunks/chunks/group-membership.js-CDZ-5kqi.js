import { c as client } from './prisma.js-iNNVyVix.js';
import { g as getFormatter } from './i18n.js-D1Rw55oM.js';
import { B as redirect, x as error } from './utils.js-CAPFIGDr.js';

// src/lib/server/group-membership.ts
var getActiveMembership = async (user) => {
	const activeMembership = await client.userGroupMembership.findFirst({ where: {
		userId: user.id,
		active: true
	} });
	if (!activeMembership) {
		const membership = await client.userGroupMembership.findFirst({ where: { userId: user.id } });
		if (!membership) redirect(302, "/group-error");
		return await client.userGroupMembership.update({
			where: { id: membership.id },
			data: { active: true }
		});
	}
	return activeMembership;
};
var setActiveMembership = async (userId, groupId) => {
	const $t = await getFormatter();
	const activeMembership = await client.userGroupMembership.findFirst({ where: {
		userId,
		active: true
	} });
	let membership;
	try {
		membership = await client.userGroupMembership.findFirstOrThrow({ where: {
			groupId,
			userId
		} });
	} catch {
		error(400, $t("errors.user-is-not-a-member-of-the-group"));
	}
	if (activeMembership?.id === membership.id) return membership;
	membership = await client.userGroupMembership.update({
		where: { id: membership.id },
		data: { active: true }
	});
	if (activeMembership) await client.userGroupMembership.update({
		where: { id: activeMembership.id },
		data: { active: false }
	});
	return membership;
};

export { getActiveMembership as g, setActiveMembership as s };
//# sourceMappingURL=group-membership.js-CDZ-5kqi.js.map
