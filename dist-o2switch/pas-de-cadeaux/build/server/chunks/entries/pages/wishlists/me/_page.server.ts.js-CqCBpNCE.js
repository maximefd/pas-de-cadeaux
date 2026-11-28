import { g as getActiveMembership } from '../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { c as client } from '../../../../chunks/prisma.js-iNNVyVix.js';
import { b as requireLogin } from '../../../../chunks/auth.js-C7-cSOnT.js';
import { f as create } from '../../../../chunks/list.js-B0L9113F.js';
import { B as redirect } from '../../../../chunks/utils.js-CAPFIGDr.js';

// src/routes/wishlists/me/+page.server.ts
var load = async () => {
	const user = requireLogin();
	const activeMembership = await getActiveMembership(user);
	let list = await client.list.findFirst({
		select: { id: true },
		where: {
			ownerId: user.id,
			groupId: activeMembership.groupId,
			notForMe: false
		}
	});
	if (!list) list = await create(user.id, activeMembership.groupId);
	redirect(302, `/lists/${list.id}`);
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-CqCBpNCE.js.map
