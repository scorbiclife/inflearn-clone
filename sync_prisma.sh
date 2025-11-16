#!/bin/bash
mkdir -p frontend/prisma
cat backend/prisma/schema.prisma |
  sed -e 's:\.\./generated/prisma:../src/generated/prisma:' > frontend/prisma/schema.prisma
cd frontend || exit 1
pnpm prisma generate
