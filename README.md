# College Discovery Platform

A Next.js + TypeScript + Tailwind application with Prisma and PostgreSQL.

## Features

- College listing with search
- College detail page with overview, courses, placements, and reviews
- College comparison for fees, rating, location, and placements
- Authentication with signup/login
- Saved college bookmarks

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in Neon values:
   ```bash
   cp .env.example .env
   ```

3. Set environment values:
   - `DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"`
   - `JWT_SECRET="your-secret"`

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Run database migrations and seed sample data:
   ```bash
   npx prisma migrate dev --name init
   node prisma/seed.js
   ```

6. Start the app locally:
   ```bash
   npm run dev
   ```

7. App routes:
   - `/` - search and compare colleges
   - `/colleges/[id]` - college detail page
   - `/auth` - login/signup
   - `/bookmarks` - saved colleges

## Vercel + Neon Deployment

### Neon

1. Create a Neon project and branch.
2. Copy the Neon POSTGRES connection string.
3. Set `DATABASE_URL` in Vercel to the Neon connection string.
4. Use a schema such as `public`.

### Vercel

1. Connect the repository to Vercel.
2. Add environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
3. Set the build command to:
   ```bash
   npm run build
   ```
4. Set the output directory to:
   ```bash
   .next
   ```

### Prisma on Vercel

- Vercel can use the `@vercel/prisma` plugin to generate the Prisma client during build.
- For production migrations, use `npx prisma migrate deploy` in a Vercel post-build step or via the CLI.
