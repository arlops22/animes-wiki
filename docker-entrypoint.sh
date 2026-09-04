#!/bin/sh
npm run prisma:generate
npm run migrate:dev
npm run dev