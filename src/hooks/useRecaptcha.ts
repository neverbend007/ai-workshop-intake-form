
import { useEffect } from 'react';

export const useRecaptcha = () => {
  useEffect(() => {
    const siteKey = '6LcLVCsrAAAAAKnCWp2mgZJjgWe_J6I9T2z2dc8j';
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      document.head.removeChild(script);
    };
  }, []);
};
