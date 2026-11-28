import { R as Role } from '../../../chunks/schema.js-_174nGak.js';
import { f as requireRole } from '../../../chunks/auth.js-C7-cSOnT.js';
import { B as redirect } from '../../../chunks/utils.js-CAPFIGDr.js';

// src/routes/admin/+page.server.ts
var load = async () => {
	await requireRole(Role.ADMIN);
	redirect(302, "/admin/users");
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-8AyWi3CO.js.map
