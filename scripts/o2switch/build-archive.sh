#!/usr/bin/env bash
# Fabrique l'archive « prête à téléverser » pour o2switch (cPanel + Node.js + Passenger).
# À lancer à la racine du projet, sur Linux x64, avec Node 24 et pnpm. Résultat : dist-o2switch/pas-de-cadeaux-o2switch.zip
set -euo pipefail
OUT=dist-o2switch/pas-de-cadeaux
rm -rf dist-o2switch && mkdir -p $OUT/scripts/o2switch/dist

pnpm install --frozen-lockfile --config.engine-strict=false
pnpm exec svelte-kit sync
pnpm prisma generate
pnpm build

cp -r build $OUT/build
cp -r prisma/migrations $OUT/prisma-migrations-tmp && mkdir -p $OUT/prisma && mv $OUT/prisma-migrations-tmp $OUT/prisma/migrations
cp -r templates $OUT/templates
cp scripts/o2switch/app.js $OUT/app.js
echo '{"type":"module"}' > $OUT/build/package.json
cp scripts/o2switch/boot.mjs $OUT/scripts/o2switch/boot.mjs
cp package.json pnpm-lock.yaml pnpm-workspace.yaml $OUT/

# Données de base et correctifs, regroupés en JavaScript simple
pnpm dlx esbuild@0.25.12 prisma/seed.ts prisma/patches/index.ts --bundle --platform=node --format=esm --target=node20 \
    --outdir=$OUT/scripts/o2switch/dist --outbase=prisma --splitting --out-extension:.js=.mjs \
    --external:better-sqlite3 --external:@prisma/client --external:@prisma/adapter-better-sqlite3 --external:dotenv/config

# Dépendances de production uniquement, pour Linux x64 (glibc)
cd $OUT
sed -i '/darwin/d;/- arm64/d' pnpm-workspace.yaml
printf '    libc:\n        - glibc\n' >> pnpm-workspace.yaml
pnpm install --prod --frozen-lockfile --config.engine-strict=false --config.node-linker=hoisted
N=node_modules
rm -rf $N/prisma $N/tsx $N/typescript $N/@types $N/@prisma/engines $N/@prisma/dev $N/@prisma/studio-core $N/effect $N/esbuild $N/@esbuild $N/elkjs $N/@electric-sql
rm -rf $N/better-sqlite3/deps $N/better-sqlite3/src $N/re2/vendor
find node_modules -path '*query_compiler_*' \( -name '*cockroachdb*' -o -name '*mysql*' -o -name '*postgresql*' -o -name '*sqlserver*' \) -delete 2>/dev/null || true
find node_modules \( -name '*.map' -o -name '*.d.ts' -o -name '*.d.mts' -o -name '*.d.cts' -o -iname '*.md' \) -type f -delete
mv node_modules pdc_modules
rm -f pnpm-lock.yaml pnpm-workspace.yaml
printf '{\n  "name": "pas-de-cadeaux",\n  "private": true,\n  "version": "1.0.0",\n  "description": "Déjà installé : ne pas cliquer sur Run NPM Install"\n}\n' > package.json

cd - >/dev/null
cd dist-o2switch/pas-de-cadeaux && zip -qr ../pas-de-cadeaux-o2switch.zip . && ls -lh ../pas-de-cadeaux-o2switch.zip
