import { R as Role } from '../../../../chunks/schema.js-_174nGak.js';
import { g as getConfig } from '../../../../chunks/config.js-465rpi-p.js';
import { c as client } from '../../../../chunks/prisma.js-iNNVyVix.js';
import { f as requireRole } from '../../../../chunks/auth.js-C7-cSOnT.js';

// src/routes/admin/users/+page.server.ts
var load = async () => {
	const user = await requireRole(Role.ADMIN);
	const usersQuery = client.user.findMany({ select: {
		id: true,
		username: true,
		name: true,
		email: true,
		role: { select: { id: true } },
		UserGroupMembership: { select: { group: { select: { name: true } } } }
	} });
	const [users, groups, config] = await Promise.all([
		usersQuery,
		client.group.findMany(),
		getConfig()
	]);
	return {
		user: {
			isAdmin: true,
			...user
		},
		users: users.map((user) => ({
			isAdmin: user.role.id === Role.ADMIN,
			groups: user.UserGroupMembership.map(({ group }) => group.name),
			...user
		})),
		config,
		groups
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BhxaM1i1.js.map
