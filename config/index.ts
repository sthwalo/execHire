// config/index.ts
export const config = {
  database: {
    url: process.env.DATABASE_URL,
  },
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  isProduction: process.env.NODE_ENV === 'production',
};

// Validate config at runtime
Object.entries(config).forEach(([key, value]) => {
  if (value === undefined) {
    throw new Error(`Configuration error: ${key} is undefined`);
  }
});

export default config;