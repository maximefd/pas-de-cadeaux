import { c as client } from '../../../../chunks/prisma.js-iNNVyVix.js';
import { g as getActiveMembership } from '../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { g as getFormatter } from '../../../../chunks/i18n.js-D1Rw55oM.js';
import { b as requireLogin } from '../../../../chunks/auth.js-C7-cSOnT.js';
import { x as error, B as redirect } from '../../../../chunks/utils.js-CAPFIGDr.js';

// src/routes/wishlists/[username]/+page.server.ts
var load = async ({ params }) => {
	const user = requireLogin();
	const $t = await getFormatter();
	const activeMembership = await getActiveMembership(user);
	const list = await client.list.findFirst({
		select: { id: true },
		where: {
			owner: { username: params.username },
			groupId: activeMembership.groupId
		}
	});
	if (!list) error(404, $t("errors.list-not-found"));
	redirect(302, `/lists/${list.id}`);
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DEq-VcM1.js.map
