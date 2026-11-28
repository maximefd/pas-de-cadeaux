import { l as logger } from './logger.js-LYoWHWpz.js';
import { b as private_env } from './shared-server.js-B6_G0tAr.js';
import { g as getSafeUrl } from './safeurl.js-Db9s3Iek.js';
import { x as error } from './utils.js-CAPFIGDr.js';
import sharp from 'sharp';
import { unlink } from 'fs/promises';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { createWriteStream } from 'node:fs';

// src/lib/server/image-util.ts
var DEFAULT_MAX_IMAGE_SIZE = 5e6;
var slugify = (str) => {
	return str.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").substring(0, 64).replace(/-+/g, "-");
};
var fetchImage = async (imageUrl, redirectNum = 0) => {
	if (redirectNum === 5) {
		logger.error("Unable to fetch image after 5 redirects");
		return null;
	}
	try {
		const url = await getSafeUrl(imageUrl);
		if (!url) {
			logger.error("URL resolved to a private access - blocking the request.");
			return null;
		}
		const resp = await fetch(url, { redirect: "manual" });
		if (resp.type === "opaqueredirect" && resp.headers.has("Location")) fetchImage(resp.headers.get("Location"), redirectNum + 1);
		else if (resp.ok && resp.body) return Readable.fromWeb(resp.body);
		else return null;
	} catch (err) {
		logger.error({ err }, "Failed to fetch image");
		return null;
	}
};
var isValidImage = (image) => {
	const maxImageSize = private_env.MAX_IMAGE_SIZE ? Number.parseInt(private_env.MAX_IMAGE_SIZE) || DEFAULT_MAX_IMAGE_SIZE : DEFAULT_MAX_IMAGE_SIZE;
	return image.size > 0 && image.size <= maxImageSize;
};
var createImage = async (filename, image) => {
	if (!image) return null;
	let dataStream;
	if (typeof image === "string") {
		const res = await fetchImage(image);
		if (res) dataStream = res;
		else return null;
	} else if (isValidImage(image)) dataStream = Readable.fromWeb(image.stream());
	else return null;
	try {
		let failure = false;
		const fname = slugify(filename) + "-" + Date.now().toString() + ".webp";
		const writeStream = createWriteStream(`uploads/${fname}`);
		const transformer = sharp().rotate().resize(300).webp().on("error", (err) => {
			logger.error({ err }, "Unable to transform image");
			failure = true;
		});
		await finished(dataStream.pipe(transformer).pipe(writeStream));
		if (!failure) return fname;
	} catch (err) {
		logger.error({ err }, "Unable to write image to file");
	}
	error(422, "Unable to process image");
};
var deleteImage = async (filename) => {
	try {
		await unlink(`uploads/${filename}`);
	} catch (err) {
		logger.warn({ err }, "Unable to delete file: %s", filename);
	}
};
var tryDeleteImage = async (imageUrl) => {
	try {
		new URL(imageUrl);
	} catch {
		await deleteImage(imageUrl);
	}
};

export { createImage as c, isValidImage as i, tryDeleteImage as t };
//# sourceMappingURL=image-util.js-B62RlHuI.js.map
