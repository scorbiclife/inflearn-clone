#!/bin/bash

# Backend
pushd backend || exit
pnpm prisma generate && pnpm prisma db push
popd || exit

# Frontend
mkdir -p frontend/prisma
cat backend/prisma/schema.prisma |
  sed \
    -e 's/prisma-client/prisma-client-js/' \
    -e '/\.\.\/generated\/prisma/d' \
    > frontend/prisma/schema.prisma
pushd frontend || exit
pnpm prisma generate
popd || exit