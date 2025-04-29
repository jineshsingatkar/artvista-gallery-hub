
/**
 * Utility module for accessing environment variables
 */

export const env = {
  /**
   * Database configuration
   */
  database: {
    url: import.meta.env.DATABASE_URL as string,
  },
  
  /**
   * Payment configuration
   */
  payment: {
    stripeKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY as string,
  },
  
  /**
   * Media configuration
   */
  media: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string,
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string,
  },
  
  /**
   * Maps configuration
   */
  maps: {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  },
  
  /**
   * API configuration
   */
  api: {
    baseUrl: import.meta.env.VITE_API_URL as string,
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
    { name: 'DATABASE_URL', value: env.database.url },
  ];
  
  const missingVars = requiredVars.filter(v => !v.value);
  
  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.map(v => v.name).join(', ')}`);
    return false;
  }
  
  return true;
}
