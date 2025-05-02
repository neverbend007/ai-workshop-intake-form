
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { executeRecaptcha } from '@/lib/recaptcha';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  refSource: string;
  techLevel: string;
  weeklyTime: string;
  submittedAt: string;
};

const referralOptions = [
  { value: '', label: 'Select an option', disabled: true },
  { value: 'YouTube', label: 'YouTube' },
  { value: 'Twitter/X', label: 'Twitter/X' },
  { value: 'Linkedin', label: 'LinkedIn' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Podcast', label: 'Podcast' },
  { value: 'Friend/Colleague', label: 'Friend/Colleague' },
  { value: 'Other', label: 'Other' }
];

const timeOptions = [
  { value: '', label: 'Select an option', disabled: true },
  { value: '< 1 hour', label: '< 1 hour' },
  { value: '1-2 hours', label: '1-2 hours' },
  { value: '2-4 hours', label: '2-4 hours' },
  { value: '5-6 hours', label: '5-6 hours' },
  { value: '7 + hours', label: '7 + hours' }
];

const techLevelOptions = [
  { value: '', label: 'Select an option', disabled: true },
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' }
];

const IntakeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      techLevel: 'Intermediate'
    }
  });

  // Preload reCAPTCHA script when component mounts
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

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Add submission timestamp
    const submissionData = {
      ...data,
      submittedAt: new Date().toISOString(),
      email: data.email.toLowerCase()
    };

    try {
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
        ...submissionData,
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
      
      // Store submission status in session storage
      sessionStorage.setItem('formSubmitted', 'true');
      
      // Redirect to thank you page
      navigate('/thanks');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Error",
        description: "We couldn't process your submission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-transparent rounded-xl shadow-md overflow-hidden">
      <div className="p-6 md:p-8">
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          aria-live="assertive"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-white">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                className={`block w-full rounded-lg border ${errors.firstName ? 'border-red-300 ring-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm bg-white/70 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters'
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: 'First name must contain only letters'
                  }
                })}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-300">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-white">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                className={`block w-full rounded-lg border ${errors.lastName ? 'border-red-300 ring-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm bg-white/70 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters'
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: 'Last name must contain only letters'
                  }
                })}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-300">{errors.lastName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`block w-full rounded-lg border ${errors.email ? 'border-red-300 ring-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm bg-white/70 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>
              )}
            </div>

            {/* How did you find us? */}
            <div className="space-y-2">
              <label htmlFor="refSource" className="block text-sm font-medium text-white">
                How did you find us?
              </label>
              <select
                id="refSource"
                className={`block w-full rounded-lg border ${errors.refSource ? 'border-red-300 ring-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm bg-white/70 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                {...register('refSource', {
                  required: 'Please select how you found us'
                })}
              >
                {referralOptions.map(option => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.refSource && (
                <p className="mt-1 text-sm text-red-300">{errors.refSource.message}</p>
              )}
            </div>
            
            {/* Technical Experience Level Dropdown */}
            <div className="space-y-2">
              <label htmlFor="techLevel" className="block text-sm font-medium text-white">
                Technical experience level
              </label>
              <select
                id="techLevel"
                className={`block w-full rounded-lg border ${errors.techLevel ? 'border-red-300 ring-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm bg-white/70 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                {...register('techLevel', {
                  required: 'Please select your technical level'
                })}
              >
                {techLevelOptions.map(option => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.techLevel && (
                <p className="mt-1 text-sm text-red-300">{errors.techLevel.message}</p>
              )}
            </div>
            
            {/* Weekly Learning Time */}
            <div className="space-y-2">
              <label htmlFor="weeklyTime" className="block text-sm font-medium text-white">
                Weekly learning time
              </label>
              <select
                id="weeklyTime"
                className={`block w-full rounded-lg border ${errors.weeklyTime ? 'border-red-300 ring-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm bg-white/70 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                {...register('weeklyTime', {
                  required: 'Please select your weekly learning time'
                })}
              >
                {timeOptions.map(option => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.weeklyTime && (
                <p className="mt-1 text-sm text-red-300">{errors.weeklyTime.message}</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-150 ease-out hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
          <div className="text-xs text-white/70 text-center mt-4">
            This site is protected by reCAPTCHA v3. By submitting this form, you agree to Google's <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">Terms of Service</a>.
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntakeForm;
