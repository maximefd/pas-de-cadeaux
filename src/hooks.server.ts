import type { RouteId } from "$app/types";
import { env } from "$env/dynamic/private";
import { defaultLang, getClosestAvailableLocale, type Lang } from "$lib/i18n";
import {
    deleteSessionTokenCookie,
    sessionCookieName,
    setSessionTokenCookie,
    validateSessionToken
} from "$lib/server/auth";
import { logger } from "$lib/server/logger";
import { loadLocale } from "$lib/server/validations";
import type { Handle, HandleServerError } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    // Fork "Pas de cadeaux !" : tout le monde voit l'appli en français, quel que soit le navigateur
    // (PDC_LOCALE permet aux tests automatiques, écrits en anglais, de garder l'anglais)
    const lang = env.PDC_LOCALE ? getClosestAvailableLocale([env.PDC_LOCALE]) : defaultLang;

    const sessionToken = event.cookies.get(sessionCookieName);
    if (!sessionToken) {
        event.locals.user = null;
        event.locals.session = null;
        event.locals.isProxyUser = false;
        event.locals.locale = lang.code;
        return resolve(event, {
            transformPageChunk({ html }) {
                return transformForLang(html, lang);
            }
        });
    }

    const { session, user, fresh } = await validateSessionToken(sessionToken);
    await loadLocale(lang.code);
    if (session === null) {
        deleteSessionTokenCookie(event.cookies);
    } else if (fresh) {
        setSessionTokenCookie(event.cookies, sessionToken, session.expiresAt);
    }

    const isProxyUser =
        (env.HEADER_AUTH_ENABLED ?? "false") == "true" &&
        !!env.HEADER_USERNAME &&
        !!event.request.headers.get(env.HEADER_USERNAME);

    event.locals.isProxyUser = isProxyUser;
    event.locals.user = user;
    event.locals.session = session;
    event.locals.locale = lang.code;

    if (isPrivateRoute(event.route.id)) {
        event.setHeaders({
            "Cache-Control": "private"
        });
    }

    return resolve(event, {
        transformPageChunk({ html }) {
            return transformForLang(html, lang);
        }
    });
};

export const handleError: HandleServerError = async ({ error: err, event, status, message }) => {
    logger.error(
        {
            status,
            method: event.request.method,
            uri: event.url.pathname + event.url.search + event.url.hash,
            err
        },
        message
    );
};

const nonPrivateRoutes: RouteId[] = [
    "/login",
    "/signup",
    "/setup-wizard",
    "/setup-wizard/step",
    "/setup-wizard/step/[step]",
    "/reset-password",
    "/group-error",
    "/pdc/assets/[id]"
];

function transformForLang(html: string, lang: Lang) {
    return html.replace("%lang%", lang.code).replace("%dir%", lang.rtl ? "rtl" : "ltr");
}

function isPrivateRoute(routeId: RouteId | null) {
    return routeId && !nonPrivateRoutes.includes(routeId);
}
