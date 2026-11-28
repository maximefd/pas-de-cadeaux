// Prépare la base : applique les migrations (sans l'outil Prisma), puis les données de base et les correctifs.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dbPath = process.env.DATABASE_URL.replace(/^file:/, "");
const db = new Database(dbPath);

db.exec(`CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "checksum" TEXT NOT NULL,
    "finished_at" DATETIME,
    "migration_name" TEXT NOT NULL,
    "logs" TEXT,
    "rolled_back_at" DATETIME,
    "started_at" DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count" INTEGER UNSIGNED NOT NULL DEFAULT 0
)`);

const done = new Set(
    db
        .prepare(`SELECT migration_name FROM _prisma_migrations WHERE finished_at IS NOT NULL`)
        .all()
        .map((r) => r.migration_name)
);
const migrationsDir = join(root, "prisma", "migrations");
const names = readdirSync(migrationsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

for (const name of names) {
    if (done.has(name)) continue;
    const sql = readFileSync(join(migrationsDir, name, "migration.sql"), "utf-8");
    console.log("[pdc] migration", name);
    // better-sqlite3 refuse les chaînes écrites entre guillemets doubles (tolérées par l'outil Prisma)
    db.exec(sql.replace('SELECT "key", "value", "global" FROM', `SELECT "key", "value", 'global' FROM`));
    db.prepare(
        `INSERT INTO _prisma_migrations (id, checksum, migration_name, finished_at, applied_steps_count)
         VALUES (?, ?, ?, current_timestamp, 1)`
    ).run(crypto.randomUUID(), createHash("sha256").update(sql).digest("hex"), name);
}
db.close();

for (const script of ["seed.mjs", "patches/index.mjs"]) {
    const file = join(root, "scripts", "o2switch", "dist", script);
    if (existsSync(file)) execFileSync(process.execPath, [file], { stdio: "inherit", env: process.env, cwd: root });
}
