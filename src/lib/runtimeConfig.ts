// Helper to access runtime configuration
interface RuntimeConfig {
  RECAPTCHA_SITE_KEY: string;
}

// During development, use Vite's import.meta.env
// In production, use the window.ENV object that's generated at container startup
export const getConfig = (): RuntimeConfig => {
  if (import.meta.env.DEV) {
    return {
      RECAPTCHA_SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY as string,
    };
  }
  
  // In production, use the runtime config from window.ENV
  return (window as any).ENV || {
    RECAPTCHA_SITE_KEY: '',
  };
};