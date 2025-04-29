
/**
 * Utility module for accessing environment variables
 */

export const env = {
  /**
   * Razorpay configuration
   */
  razorpay: {
    keyId: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
    keySecret: import.meta.env.VITE_RAZORPAY_KEY_SECRET as string,
  },
  
  /**
   * Neon Database configuration
   */
  database: {
    url: import.meta.env.DATABASE_URL as string,
  },
  
  /**
   * Email configuration
   */
  email: {
    service: import.meta.env.VITE_EMAIL_SERVICE as string,
  },
  
  /**
   * Google OAuth configuration
   */
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET as string,
  },
  
  /**
   * Check if running in production environment
   */
  isProduction: import.meta.env.PROD,
};

/**
 * Helper function to validate required environment variables
 */
export function validateEnv() {
  const requiredVars = [
    { name: 'VITE_RAZORPAY_KEY_ID', value: env.razorpay.keyId },
    { name: 'VITE_RAZORPAY_KEY_SECRET', value: env.razorpay.keySecret },
  ];
  
  const missingVars = requiredVars.filter(v => !v.value);
  
  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.map(v => v.name).join(', ')}`);
    return false;
  }
  
  return true;
}
