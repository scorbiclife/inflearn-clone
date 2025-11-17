#!/bin/bash
mkdir -p frontend/prisma
cat backend/prisma/schema.prisma |
  sed \
    -e 's/prisma-client/prisma-client-js/' \
    -e '/\.\.\/generated\/prisma/d' \
    > frontend/prisma/schema.prisma
cd frontend
pnpm prisma generate