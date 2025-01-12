// scripts/check-env.js
require('dotenv').config();

const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
];

function checkEnvVariables() {
  console.log('Current working directory:', process.cwd());
  console.log('Checking environment variables...');
  
  const missingVars = requiredEnvVars.filter(envVar => {
    const value = process.env[envVar];
    console.log(`Checking ${envVar}:`, value ? 'Set' : 'Not set');
    return !value;
  });
  
  if (missingVars.length > 0) {
    console.error('\x1b[31mError: Missing required environment variables:\x1b[0m');
    missingVars.forEach(envVar => {
      console.error(`- ${envVar}`);
    });
    console.error('\n\x1b[33mPlease check your .env file and make sure all required variables are set.\x1b[0m');
    process.exit(1);
  } else {
    console.log('\x1b[32m✓ All required environment variables are set\x1b[0m');
  }
}

checkEnvVariables();