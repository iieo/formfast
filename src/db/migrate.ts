import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const databaseURI = process.env.DATABASE_URL;

if (databaseURI === undefined) {
  console.log('You need to provide the database URI');
  process.exit(0);
}

const client = postgres(databaseURI, { max: 1 });
const db = drizzle(client);

async function runMigrations() {
  await migrate(db, { migrationsFolder: './src/db/migrations' });
  await client.end();
}

runMigrations()
  .then(() => {
    console.info('Migration successful.');
    process.exit(0);
  })
  .catch((error) => {
    console.error({ error });
    process.exit(1);
  });
