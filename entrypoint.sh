export PATH="/usr/src/app/node_modules/.bin:$PATH"
export PROTOCOL_HEADER=x-forwarded-proto 
export HOST_HEADER=x-forwarded-host
export DATABASE_URL="file:/usr/src/app/data/prod.db"
export PUBLIC_DEFAULT_CURRENCY=${DEFAULT_CURRENCY}
export BODY_SIZE_LIMIT=${MAX_IMAGE_SIZE:-5000000}

caddy start --config /usr/src/app/Caddyfile

node_modules/.bin/prisma migrate deploy && \
node_modules/.bin/prisma db seed && \
node_modules/.bin/tsx prisma/patches/index.ts

exec node build