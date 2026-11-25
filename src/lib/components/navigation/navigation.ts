import { resolve } from "$app/paths";

// Fork "Pas de cadeaux !" : trois onglets texte en bas de l'écran, sur toutes les tailles d'écran.
export const navItems = [
    {
        labelKey: "app.home",
        href: () => resolve("/lists"),
        icon: "ion:people"
    },
    {
        labelKey: "wishes.my-lists",
        href: () => resolve("/wishlists/me"),
        icon: "ion:gift"
    },
    {
        labelKey: "app.help",
        href: () => resolve("/aide"),
        icon: "ion:help-circle"
    }
] satisfies NavItem[];
