#!/bin/sh
set -e

npm run prisma:generate
npm run migrate:dev
exec npm run dev