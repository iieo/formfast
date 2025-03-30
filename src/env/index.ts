import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    databaseUrl: z.string(),
    nextauthSecret: z.string().min(1),
    nextauthUrl: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    databaseUrl: process.env.DATABASE_URL,
    nextauthSecret: process.env.NEXTAUTH_SECRET,
    nextauthUrl: process.env.NEXTAUTH_URL,
  },
});
