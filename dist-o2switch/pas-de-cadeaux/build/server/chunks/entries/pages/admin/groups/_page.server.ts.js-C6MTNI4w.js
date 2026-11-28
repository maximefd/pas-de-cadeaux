import { R as Role } from '../../../../chunks/schema.js-_174nGak.js';
import { c as client } from '../../../../chunks/prisma.js-iNNVyVix.js';
import { f as requireRole } from '../../../../chunks/auth.js-C7-cSOnT.js';

// src/routes/admin/groups/+page.server.ts
var load = async () => {
	await requireRole(Role.ADMIN);
	return { groups: await client.group.findMany({ select: {
		id: true,
		name: true,
		_count: { select: { UserGroupMembership: true } }
	} }).then((groups) => groups.map((group) => ({
		userCount: group._count.UserGroupMembership,
		...group
	}))) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-C6MTNI4w.js.map
