
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { submitFormData } from '@/services/formService';
import { FormValues } from '@/types/formTypes';
import { referralOptions, timeOptions, techLevelOptions } from '@/constants/formOptions';

// Form components
import TextInput from './form/TextInput';
import SelectInput from './form/SelectInput';
import SubmitButton from './form/SubmitButton';

const IntakeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize reCAPTCHA
  useRecaptcha();
  
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
    
    // Add submission timestamp and normalize email
    const submissionData = {
      ...data,
      submittedAt: new Date().toISOString(),
      email: data.email.toLowerCase()
    };

    try {
      await submitFormData(submissionData);
      
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
            <TextInput
              id="firstName"
              label="First Name"
              error={errors.firstName?.message}
              autoComplete="given-name"
              register={register}
              validation={{
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters'
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'First name must contain only letters'
                }
              }}
            />

            {/* Last Name */}
            <TextInput
              id="lastName"
              label="Last Name"
              error={errors.lastName?.message}
              autoComplete="family-name"
              register={register}
              validation={{
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters'
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Last name must contain only letters'
                }
              }}
            />

            {/* Email */}
            <TextInput
              id="email"
              label="Email"
              type="email"
              error={errors.email?.message}
              autoComplete="email"
              register={register}
              validation={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address'
                }
              }}
            />

            {/* How did you find us? */}
            <SelectInput
              id="refSource"
              label="How did you find us?"
              error={errors.refSource?.message}
              options={referralOptions}
              register={register}
              validation={{
                required: 'Please select how you found us'
              }}
            />
            
            {/* Technical Experience Level */}
            <SelectInput
              id="techLevel"
              label="Technical experience level"
              error={errors.techLevel?.message}
              options={techLevelOptions}
              register={register}
              validation={{
                required: 'Please select your technical level'
              }}
            />
            
            {/* Weekly Learning Time */}
            <SelectInput
              id="weeklyTime"
              label="Time weekly you are dedicating to learning AI Automation"
              error={errors.weeklyTime?.message}
              options={timeOptions}
              register={register}
              validation={{
                required: 'Please select your weekly learning time'
              }}
            />
          </div>

          <div className="pt-2">
            <SubmitButton 
              isSubmitting={isSubmitting} 
              text="Submit Application"
            />
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
