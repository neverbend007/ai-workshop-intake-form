
import { FormValues } from '@/types/formTypes';
import { executeRecaptcha } from '@/lib/recaptcha';

export const submitFormData = async (data: FormValues): Promise<void> => {
  // Execute reCAPTCHA to get token
  const token = await executeRecaptcha('form_submit');
  
  console.log('Submitting data with reCAPTCHA token');
  
  // Get webhook configuration from env variables
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
  const webhookUsername = import.meta.env.VITE_WEBHOOK_USERNAME;
  const webhookPassword = import.meta.env.VITE_WEBHOOK_PASSWORD;

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
