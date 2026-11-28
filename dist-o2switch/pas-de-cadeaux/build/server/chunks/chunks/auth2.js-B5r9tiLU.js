import { R as Role } from './schema.js-_174nGak.js';
import { r as requireLoginOrError } from './auth.js-C7-cSOnT.js';
import { c as client } from './prisma.js-iNNVyVix.js';

// src/routes/pdc/groups/[groupId]/auth.ts
var requireAccessToGroup = async (groupId) => {
	const authUser = await requireLoginOrError();
	const user = await client.user.findFirstOrThrow({
		where: { id: authUser.id },
		select: {
			id: true,
			roleId: true,
			UserGroupMembership: {
				where: { groupId },
				select: { roleId: true }
			}
		}
	});
	return {
		authenticated: user.roleId === Role.ADMIN || user.UserGroupMembership[0]?.roleId === Role.GROUP_MANAGER,
		user
	};
};

export { requireAccessToGroup as r };
//# sourceMappingURL=auth2.js-B5r9tiLU.js.map
