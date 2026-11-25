// Génère src/lib/icons/ion.json : uniquement les icônes Ionicons utilisées par l'appli,
// pour ne plus dépendre du CDN iconify (plus rapide, hors ligne, aucune requête externe).
// Relancer après avoir ajouté une icône : node scripts/build-icons.mjs
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getIcons } from "@iconify/utils";

const ion = JSON.parse(readFileSync("node_modules/@iconify-json/ion/icons.json", "utf8"));
const names = new Set(["eye", "eye-off", "sparkles", "sparkles-outline", "gift"]);
const walk = (dir) => {
    for (const f of readdirSync(dir)) {
        const p = join(dir, f);
        if (p.includes("generated")) continue;
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(svelte|ts)$/.test(f))
            for (const m of readFileSync(p, "utf8").matchAll(/ion:([a-z0-9]+(?:-[a-z0-9]+)*)/g)) names.add(m[1]);
    }
};
walk("src");
const valid = [...names].filter((n) => ion.icons[n] || ion.aliases?.[n]).sort();
const subset = getIcons(ion, valid);
writeFileSync("src/lib/icons/ion.json", JSON.stringify(subset) + "\n");
console.log(`${valid.length} icônes écrites dans src/lib/icons/ion.json`);
