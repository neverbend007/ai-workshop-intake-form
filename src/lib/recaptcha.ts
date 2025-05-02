import { getConfig } from './runtimeConfig';

// Script loading helper
let recaptchaLoaded = false;

const loadRecaptchaScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (recaptchaLoaded) {
      resolve();
      return;
    }

    const config = getConfig();
    const siteKey = config.RECAPTCHA_SITE_KEY;
    
    if (!siteKey) {
      console.error('reCAPTCHA site key is missing');
      return;
    }
    
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      recaptchaLoaded = true;
      resolve();
    };
    
    document.head.appendChild(script);
  });
};

/**
 * Execute reCAPTCHA and get a token
 * This is client-side only and does not use the secret key
 */
export const executeRecaptcha = async (action: string): Promise<string> => {
  await loadRecaptchaScript();
  
  return new Promise((resolve, reject) => {
    // Wait for grecaptcha to be ready
    if (!(window as any).grecaptcha || !(window as any).grecaptcha.ready) {
      reject(new Error('reCAPTCHA not loaded'));
      return;
    }

    const config = getConfig();
    const siteKey = config.RECAPTCHA_SITE_KEY;
    
    if (!siteKey) {
      reject(new Error('reCAPTCHA site key is missing'));
      return;
    }
    
    (window as any).grecaptcha.ready(() => {
      (window as any).grecaptcha
        .execute(siteKey, { action })
        .then((token: string) => {
          resolve(token);
        })
        .catch((error: Error) => {
          console.error('reCAPTCHA error:', error);
          reject(error);
        });
    });
  });
};