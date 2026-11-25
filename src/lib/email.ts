// Adresse factice donnée aux comptes créés sans e-mail (voir routes/signup) : on ne l'affiche jamais.
export const PLACEHOLDER_EMAIL_DOMAIN = "@sans-email.invalid";

export const displayEmail = (email?: string | null) =>
    email && !email.endsWith(PLACEHOLDER_EMAIL_DOMAIN) ? email : "";
