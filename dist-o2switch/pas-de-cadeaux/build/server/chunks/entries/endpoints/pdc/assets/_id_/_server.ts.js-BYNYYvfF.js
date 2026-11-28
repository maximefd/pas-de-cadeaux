import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { x as error } from '../../../../../chunks/utils.js-CAPFIGDr.js';
import { readFileSync } from 'fs';
import path from 'path';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/pdc/assets/[id]/+server.ts
var GET = async ({ params }) => {
	const $t = await getFormatter();
	if (!params.id) error(400, $t("errors.must-specify-asset-id"));
	const normalizedPath = path.normalize(params.id);
	if (path.isAbsolute(normalizedPath)) error(400, $t("errors.invalid-asset-path"));
	const baseUploadsPath = path.resolve("uploads/");
	const resolvedPath = path.resolve("uploads/" + normalizedPath);
	if (!resolvedPath?.startsWith(baseUploadsPath)) error(400, $t("errors.invalid-asset-path"));
	try {
		const asset = readFileSync(resolvedPath);
		return new Response(asset, { headers: { "Cache-Control": "public, max-age=31536000" } });
	} catch {
		error(404, $t("errors.asset-not-found"));
	}
};

export { GET };
//# sourceMappingURL=_server.ts.js-BYNYYvfF.js.map
