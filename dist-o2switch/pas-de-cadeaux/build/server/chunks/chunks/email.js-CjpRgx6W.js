import { g as getConfig } from './config.js-465rpi-p.js';
import { b as private_env } from './shared-server.js-B6_G0tAr.js';
import { g as getFormatter } from './i18n.js-D1Rw55oM.js';
import { l as logger } from './logger.js-LYoWHWpz.js';
import { readFile } from 'fs';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

// src/lib/server/email.ts
var passResetTempl;
var inviteTempl;
readFile("templates/password-reset.html", "utf-8", (err, data) => {
	if (err) logger.error({ err }, "Error reading password reset email template");
	else passResetTempl = Handlebars.compile(data);
});
readFile("templates/invite.html", "utf-8", (err, data) => {
	if (err) logger.error({ err }, "Error reading invite email template");
	else inviteTempl = Handlebars.compile(data);
});
var sendEmail = async (options) => {
	const config = await getConfig(void 0, true);
	if (!config.smtp.enable || config.smtp.enable && !config.smtp.host && !config.smtp.port && !config.smtp.from && !config.smtp.fromName) {
		logger.error("SMTP not set up properly, check your settings");
		return {
			success: false,
			message: "SMTP not set up properly, check your settings"
		};
	}
	return await nodemailer.createTransport({
		port: config.smtp.port,
		host: config.smtp.host,
		auth: config.smtp.user && config.smtp.pass ? {
			user: config.smtp.user,
			pass: config.smtp.pass
		} : void 0,
		secure: config.smtp.useTls || false,
		tls: { rejectUnauthorized: config.smtp.ignoreCertCheck === true ? false : true }
	}).sendMail({
		from: {
			name: config.smtp.fromName,
			address: config.smtp.from
		},
		...options
	}).then((msgInfo) => ({
		success: msgInfo.accepted.length === 1,
		message: null
	})).catch((e) => {
		logger.error(e);
		return {
			success: false,
			message: e?.response
		};
	});
};
var sendSignupLink = async (to, inviteUrl) => {
	const $t = await getFormatter();
	const html = inviteTempl({
		url: inviteUrl,
		baseUrl: private_env.ORIGIN || "http://localhost:5173",
		wishlistLogoText: $t("a11y.wishlist-logo"),
		previewText: $t("email.invite-title"),
		titleText: $t("email.invite-title"),
		bodyText: $t("email.invite-body"),
		buttonText: $t("email.invite-button"),
		footerText: $t("email.invite-footer")
	});
	return await sendEmail({
		to,
		subject: $t("email.invite-subject"),
		html,
		text: $t("email.invite-fallback-text", { values: { url: inviteUrl } })
	});
};
var sendPasswordReset = async (to, resetUrl) => {
	const $t = await getFormatter();
	const html = passResetTempl({
		url: resetUrl,
		baseUrl: private_env.ORIGIN || "http://localhost:5173",
		wishlistLogoText: $t("a11y.wishlist-logo"),
		previewText: $t("email.pw-reset-title"),
		titleText: $t("email.pw-reset-title"),
		bodyText: $t("email.pw-reset-body"),
		buttonText: $t("email.pw-reset-title")
	});
	return await sendEmail({
		to,
		subject: "Wishlist | " + $t("email.pw-reset-title"),
		html,
		text: $t("email.pw-reset-fallback-text", { values: { url: resetUrl } })
	});
};
var sendTest = async (to) => {
	const $t = await getFormatter();
	return await sendEmail({
		to,
		subject: $t("email.test-subject"),
		text: $t("email.test-body")
	});
};

export { sendPasswordReset as a, sendSignupLink as b, sendTest as s };
//# sourceMappingURL=email.js-CjpRgx6W.js.map
