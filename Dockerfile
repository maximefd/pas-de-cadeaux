FROM node:24.22.3-alpine@sha256:116b800c3754b440ee0aa3ed2f20f5bf3d99a554bfd9adeea09ea8017f6e85f5 AS base
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    COREPACK_HOME=/usr/bin/corepack
RUN corepack enable pnpm

WORKDIR /usr/src/app

# Build step
FROM base AS build
# Deps for prisma and building packages
RUN apk add --no-cache build-base python3 openssl git

# Build flags for compatibility on older systems
ENV RUSTFLAGS="-C target-cpu=x86-64 -C target-feature=-sse4.1,-sse4.2,-avx,-avx2" \
    CFLAGS="-march=x86-64 -mtune=generic" \
    CXXFLAGS="-march=x86-64 -mtune=generic"

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Image Alpine (musl) x64 uniquement : on n'installe pas les binaires macOS/arm64/glibc prévus pour le développement
RUN sed -i '/darwin/d;/- arm64/d' pnpm-workspace.yaml \
    && printf '    libc:\n        - musl\n' >> pnpm-workspace.yaml \
    && pnpm install --frozen-lockfile
COPY prisma/ ./prisma/
RUN pnpm prisma generate
COPY src/ ./src
COPY templates/ ./templates
COPY static/ ./static
COPY vite.config.ts tsconfig.json svelte.config.js ./
ARG VERSION="unk"
ARG SHA="unk"
ENV VERSION=${VERSION}
ENV SHA=${SHA}
RUN pnpm build && pnpm prune --prod

# Allègement des dépendances de production (la base est SQLite : on retire le reste)
RUN P=node_modules/.pnpm \
    && rm -rf $P/@types+* $P/@electric-sql+pglite* \
    && find $P -path '*query_compiler_*' \( -name '*cockroachdb*' -o -name '*mysql*' -o -name '*postgresql*' -o -name '*sqlserver*' \) -delete \
    && find node_modules/.pnpm \( -name '*.map' -o -name '*.d.ts' -o -name '*.d.mts' -o -name '*.d.cts' -o -iname '*.md' \) -type f -delete

# Download Caddy from github
FROM --platform=$BUILDPLATFORM alpine:3.24.4@sha256:f59abe656b692d901e184be3445e084786602108599d2a51d229c0f5a48c71bf AS caddy

ARG TARGETPLATFORM
ARG CADDY_VERSION=2.10.0

WORKDIR /
RUN apk add --no-cache curl tar
RUN case "${TARGETPLATFORM}" in \
    "linux/amd64") ARCH="amd64" ;; \
    "linux/arm64") ARCH="arm64" ;; \
    "linux/arm/v7") ARCH="armv7" ;; \
    *) echo "Unsupported platform: ${TARGETPLATFORM}" && exit 1 ;; \
    esac && \
    curl -L "https://github.com/caddyserver/caddy/releases/download/v${CADDY_VERSION}/caddy_${CADDY_VERSION}_linux_${ARCH}.tar.gz" \
    | tar -xz

# Bring everything together
FROM base AS app
ENV NODE_ENV=production \
    BODY_SIZE_LIMIT=5000000 \
    PRISMA_HIDE_UPDATE_MESSAGE=1

RUN apk add --no-cache openssl

COPY --from=caddy --chmod=755 /caddy /usr/bin/caddy
COPY ["package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml", "entrypoint.sh", "prisma.config.ts", "Caddyfile", "./"]
COPY ./templates/ ./templates
COPY ./prisma/ ./prisma/

COPY --from=build /usr/src/app/node_modules ./node_modules
RUN chmod +x entrypoint.sh

COPY --from=build /usr/src/app/build ./build/
COPY --from=build /usr/src/app/src/lib/generated/prisma ./src/lib/generated/prisma

# Volumes created with the right owner, then run as the unprivileged "node" user (uid 1000)
RUN mkdir -p /usr/src/app/uploads /usr/src/app/data && chown node:node /usr/src/app/uploads /usr/src/app/data
VOLUME /usr/src/app/uploads
VOLUME /usr/src/app/data

ENV DEFAULT_CURRENCY=USD \
    TOKEN_TIME=72 \
    COREPACK_ENABLE_NETWORK=0 \
    XDG_CONFIG_HOME=/tmp/.config \
    XDG_DATA_HOME=/tmp/.local

USER node

ENTRYPOINT [ "sh", "entrypoint.sh" ]