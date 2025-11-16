#!/bin/bash
mkdir -p frontend/prisma
cat backend/prisma/schema.prisma |
  sed \
    -e 's/prisma-client/prisma-client-js/' \
    -e 's_.*\.\./generated/prisma.*__' \
    > frontend/prisma/schema.prisma
cd frontend
pnpm prisma generate