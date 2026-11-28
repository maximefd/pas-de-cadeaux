import { h as requireAdminOrManager } from '../../../../../chunks/auth.js-C7-cSOnT.js';
import { B as redirect } from '../../../../../chunks/utils.js-CAPFIGDr.js';

// src/routes/admin/groups/[groupId]/+page.server.ts
var load = async ({ url, params }) => {
	await requireAdminOrManager(params.groupId);
	redirect(302, `${url.pathname}/members`);
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-D146VlNW.js.map
