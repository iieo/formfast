# FormFast

## Development Setup

Start a local Postgres database:

```sh
docker compose up
```

Check that you can access it:

```sh
psql "postgresql://formfast:Um8G7rjx2Tjo@localhost:5432/formfast"
```

You need these environment variables:

```sh
DATABASE_URL=postgresql://formfast:Um8G7rjx2Tjo@localhost:5432/formfast
NEXTAUTH_SECRET=whatever
NEXTAUTH_URL=http://localhost:3000
EMAIL_BASE_URL=http://localhost:3000
```

Start the dev server:

```sh
pnpm dev
```

## Production Setup

Change the Postgres password.

Start a local Postgres database:

```sh
docker compose up
```

