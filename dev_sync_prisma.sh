#!/bin/bash

# Backend
pushd backend || exit
pnpm prisma generate && pnpm prisma db push
popd || exit

# Frontend
mkdir -p frontend/prisma
cp backend/prisma/schema.prisma frontend/prisma
pushd frontend || exit
pnpm prisma generate
popd || exit