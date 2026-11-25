import { env } from "$env/dynamic/private";

// Les tests automatiques créent leurs comptes à la volée : SKIP_WELCOME=true évite l'écran de bienvenue.
export const needsWelcome = (user: { onboardedAt: Date | null }) => env.SKIP_WELCOME !== "true" && !user.onboardedAt;
