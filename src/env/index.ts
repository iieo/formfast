import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    databaseUrl: z.string(),
    nextauthSecret: z.string().min(1),
    nextauthUrl: z.string().min(1),
    emailBaseUrl: z.string().min(1),
    awsAccessKeyId: z.string().min(1),
    awsSecretAccessKey: z.string().min(1),
    awsRegion: z.string().min(1),
    stripeSecretKey: z.string().min(1),
    completionServerUrl: z.string().min(1),
    stripeB2CPriceId: z.string().min(1),
    stripeB2BPriceId: z.string().min(1),
    stripeB2BMeterEventName: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_stripePublishableKey: z.string().min(1),
    NEXT_PUBLIC_baseUrl: z.string().min(1),
    NEXT_PUBLIC_mixpanelToken: z.string().min(1),
  },
  runtimeEnv: {
    databaseUrl: process.env.DATABASE_URL,
    nextauthSecret: process.env.NEXTAUTH_SECRET,
    nextauthUrl: process.env.NEXTAUTH_URL,
    emailBaseUrl: process.env.EMAIL_BASE_URL,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    completionServerUrl: process.env.COMPLETION_SERVER_URL,
    NEXT_PUBLIC_mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    stripeB2CPriceId: process.env.STRIPE_B2C_PRICE_ID,
    stripeB2BPriceId: process.env.STRIPE_B2B_PRICE_ID,
    stripeB2BMeterEventName: process.env.STRIPE_B2B_METER_EVENT_NAME,
  },
});
