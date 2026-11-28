import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';

// src/routes/admin/groups/[groupId]/+layout.server.ts
var load = async ({ params }) => {
	return { group: await client.group.findUniqueOrThrow({
		where: { id: params.groupId },
		select: {
			id: true,
			name: true
		}
	}) };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _layout_server_ts as _ };
//# sourceMappingURL=_layout.server.ts.js-DWxPUuk1.js.map
