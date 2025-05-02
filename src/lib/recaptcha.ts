/**
 * Helper function to verify reCAPTCHA v3 token with Google's API
 * This would be used in a real implementation within edge functions
 */
interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  error?: string[];
}

export const verifyRecaptchaToken = async (token: string): Promise<RecaptchaResponse> => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error('reCAPTCHA secret key is missing');
  }
  
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await response.json();
  
  return data;
};

// Script loading helper
let recaptchaLoaded = false;

const loadRecaptchaScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (recaptchaLoaded) {
      resolve();
      return;
    }

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    
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

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    
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