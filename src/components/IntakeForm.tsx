
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Add submission timestamp
    const submissionData = {
      ...data,
      submittedAt: new Date().toISOString(),
      email: data.email.toLowerCase()
    };

    try {
      // Execute reCAPTCHA (in a real implementation)
      // const token = await executeRecaptcha('form_submit');

      console.log('Submitting data:', submissionData);
      
      // Fix the webhook URL to use the correct one from .env
      const webhookUrl = 'https://neverbend007.app.n8n.cloud/webhook/7f7508e9-05aa-41f2-af96-fab75718c049';
      const webhookUsername = 'newIntakeForm';
      const webhookPassword = 'qawsedrftgyhujikol';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${webhookUsername}:${webhookPassword}`)
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok && response.status !== 0) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log('Form submitted successfully');
      
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
          </div>

          {/* Technical Experience Level */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Technical experience level
            </label>
            <div className="flex flex-wrap gap-4 mt-2">
              {techLevelOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`techLevel_${option.value}`}
                    type="radio"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    value={option.value}
                    {...register('techLevel', {
                      required: 'Please select your technical level'
                    })}
                  />
                  <label
                    htmlFor={`techLevel_${option.value}`}
                    className="ml-2 block text-sm font-medium text-white cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
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
        </form>
      </div>
    </div>
  );
};

export default IntakeForm;
