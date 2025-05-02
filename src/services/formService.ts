
import { FormValues } from '@/types/formTypes';
import { executeRecaptcha } from '@/lib/recaptcha';

// Constants for development and testing only - in production these will be environment variables
// These constants are removed during production build and replaced with actual environment variables
const DEV_WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
const DEV_WEBHOOK_USERNAME = import.meta.env.VITE_WEBHOOK_USERNAME;
const DEV_WEBHOOK_PASSWORD = import.meta.env.VITE_WEBHOOK_PASSWORD;

export const submitFormData = async (data: FormValues): Promise<void> => {
  // Execute reCAPTCHA to get token
  const token = await executeRecaptcha('form_submit');
  
  console.log('Submitting data with reCAPTCHA token');
  
  // Get webhook configuration from env variables
  // In development, use the constants
  // In production, these will be injected by the build process
  const webhookUrl = DEV_WEBHOOK_URL;
  const webhookUsername = DEV_WEBHOOK_USERNAME;
  const webhookPassword = DEV_WEBHOOK_PASSWORD;

  // Check if webhook configuration exists
  if (!webhookUrl || !webhookUsername || !webhookPassword) {
    throw new Error('Webhook configuration is missing');
  }
  
  // Add the reCAPTCHA token to the submission data
  const dataWithRecaptcha = {
    ...data,
    recaptchaToken: token
  };
  
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${webhookUsername}:${webhookPassword}`)
    },
    body: JSON.stringify(dataWithRecaptcha)
  });

  if (!response.ok && response.status !== 0) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  console.log('Form submitted successfully with reCAPTCHA verification');
};
