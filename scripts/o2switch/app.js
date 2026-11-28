// Point d'entrée pour o2switch / cPanel « Setup Node.js App » (Phusion Passenger).
// Passenger lance ce fichier ; il prépare la base de données puis démarre l'appli.
const path = require("path");
const os = require("os");
const fs = require("fs");

process.chdir(__dirname);
process.env.NODE_ENV = process.env.NODE_ENV || "production";

// Les dépendances arrivent dans « pdc_modules » : cPanel gère lui-même un dossier « node_modules »
// (lien vers son environnement), on le remplace donc par le nôtre au démarrage.
const mods = path.join(__dirname, "pdc_modules");
if (fs.existsSync(mods)) {
    fs.rmSync(path.join(__dirname, "node_modules"), { recursive: true, force: true });
    fs.renameSync(mods, path.join(__dirname, "node_modules"));
}

// Dossier des données (base + photos), hors du dossier de l'appli pour survivre aux mises à jour
const dataDir = process.env.PDC_DATA_DIR || path.join(os.homedir(), "pdc-data");
fs.mkdirSync(path.join(dataDir, "uploads"), { recursive: true });
process.env.PDC_DATA_DIR = dataDir;
process.env.DATABASE_URL = process.env.DATABASE_URL || "file:" + path.join(dataDir, "prod.db");

// « uploads » dans le dossier de l'appli pointe vers le dossier de données
const uploadsLink = path.join(__dirname, "uploads");
try {
    const st = fs.lstatSync(uploadsLink);
    if (!st.isSymbolicLink()) {
        for (const f of fs.readdirSync(uploadsLink)) {
            fs.renameSync(path.join(uploadsLink, f), path.join(dataDir, "uploads", f));
        }
        fs.rmSync(uploadsLink, { recursive: true });
        fs.symlinkSync(path.join(dataDir, "uploads"), uploadsLink);
    }
} catch {
    fs.symlinkSync(path.join(dataDir, "uploads"), uploadsLink);
}

process.env.PUBLIC_DEFAULT_CURRENCY = process.env.PUBLIC_DEFAULT_CURRENCY || process.env.DEFAULT_CURRENCY || "EUR";
process.env.BODY_SIZE_LIMIT = process.env.MAX_IMAGE_SIZE || process.env.BODY_SIZE_LIMIT || "5000000";
process.env.PROTOCOL_HEADER = process.env.PROTOCOL_HEADER || "x-forwarded-proto";
process.env.HOST_HEADER = process.env.HOST_HEADER || "x-forwarded-host";

(async () => {
    await import("./scripts/o2switch/boot.mjs");
    await import("./build/index.js");
})().catch((err) => {
    console.error("Démarrage impossible :", err);
    process.exit(1);
});
