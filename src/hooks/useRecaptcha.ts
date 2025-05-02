import { useEffect } from 'react';
import { getConfig } from '@/lib/runtimeConfig';

export const useRecaptcha = () => {
  useEffect(() => {
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
    document.head.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);
};