import { R as Role } from '../../chunks/schema.js-_174nGak.js';
import { c as client } from '../../chunks/prisma.js-iNNVyVix.js';

// src/lib/dtos/group-mapper.ts
var toGroupInformation = (membership) => {
	return {
		...membership.group,
		active: membership.active,
		isManager: membership.role.id === Role.GROUP_MANAGER || membership.role.id === Role.ADMIN
	};
};
// src/routes/+layout.server.ts
var load = (async ({ locals }) => {
	let groups = null;
	if (locals.user) groups = (await client.userGroupMembership.findMany({
		where: { userId: locals.user.id },
		select: {
			group: true,
			active: true,
			role: true
		}
	})).map(toGroupInformation).toSorted((a, b) => a.name.localeCompare(b.name, locals.locale));
	return {
		user: locals.user,
		groups,
		isProxyUser: locals.isProxyUser,
		locale: locals.locale
	};
});

var _layout_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _layout_server_ts as _ };
//# sourceMappingURL=_layout.server.ts.js-rmfTWzLi.js.map
