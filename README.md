# FormFast

## Development Setup

Start a local Postgres database:

```sh
docker compose up
```

Check that you can access it:

```sh
psql "postgresql://deutschlandgpt:t6suFdXyUHcr@localhost:5432/deutschlandgpt"
```

You need these environment variables:

```sh
DATABASE_URL=postgresql://deutschlandgpt:t6suFdXyUHcr@localhost:5432/deutschlandgpt
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

Use API

```sh
curl -X POST -H "Content-Type: application/json" -d '{"messages":[{"role": "user", "content": "wie hoch ist der eiffelturm"}], "temperature": 0.4, "stream": false}' localhost:3000/api/completion
```
