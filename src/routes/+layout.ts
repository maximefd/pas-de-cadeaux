import type { LayoutLoad } from "./$types";
import { defaultLang, initFormatter, initLang } from "$lib/i18n";

// Fork "Pas de cadeaux !" : l'appli est toujours en français, quels que soient le navigateur
// et la langue enregistrée sur le compte.
export const load = (async ({ data }) => {
    const locale = defaultLang.code;
    await initLang(locale);

    return {
        t: await initFormatter(locale),
        ...data,
        locale
    };
}) satisfies LayoutLoad;
