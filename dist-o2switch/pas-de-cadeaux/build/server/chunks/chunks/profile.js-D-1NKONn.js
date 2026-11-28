import { c as client } from './prisma.js-iNNVyVix.js';
import { g as getFormatter } from './i18n.js-D1Rw55oM.js';
import { l as logger } from './logger.js-LYoWHWpz.js';
import { c as createImage, t as tryDeleteImage } from './image-util.js-B62RlHuI.js';
import { C as fail } from './utils.js-CAPFIGDr.js';
import z from 'zod';

// src/lib/server/profile.ts
var updateProfile = async (userId, formData) => {
	const $t = await getFormatter();
	const nameData = z.object({
		name: z.string().trim().min(1, $t("errors.name-must-not-be-blank")),
		username: z.string().trim().min(1, $t("errors.username-must-not-be-blank")),
		email: z.email()
	}).safeParse(Object.fromEntries(formData));
	if (!nameData.success) return fail(400, {
		error: true,
		errors: z.flattenError(nameData.error).fieldErrors
	});
	try {
		await client.user.update({
			data: {
				name: nameData.data.name,
				username: nameData.data.username,
				email: nameData.data.email
			},
			where: { id: userId }
		});
	} catch (err) {
		logger.error({ err });
		return fail(400, { message: "Unable to update profile information. Check logs for details." });
	}
};
var updatePicture = async (userId, username, formData) => {
	const image = formData.get("profilePic");
	const filename = await createImage(username, image);
	if (filename) {
		const user = await client.user.findUniqueOrThrow({
			select: { picture: true },
			where: { id: userId }
		});
		await client.user.update({
			where: { id: userId },
			data: { picture: filename }
		});
		if (user.picture) await tryDeleteImage(user.picture);
	}
	return filename;
};
var unlinkOauth = async (userId) => {
	await client.user.update({
		data: { oauthId: null },
		where: { id: userId }
	});
};

export { updatePicture as a, updateProfile as b, unlinkOauth as u };
//# sourceMappingURL=profile.js-D-1NKONn.js.map
