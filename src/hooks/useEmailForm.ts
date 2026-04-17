import { useState, useCallback } from 'react';
import { EmailFormData, EmailFormErrors } from '../types/email';
import { sendEmail } from '../services/emailService';

const initialFormData: EmailFormData = {
  name: '',
  email: '',
  message: '',
};

const validateForm = (data: EmailFormData): EmailFormErrors => {
  const errors: EmailFormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};

export const useEmailForm = () => {
  const [formData, setFormData] = useState<EmailFormData>(initialFormData);
  const [errors, setErrors] = useState<EmailFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof EmailFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const response = await sendEmail(formData);
      
      if (response.success) {
        setSubmitStatus({
          success: true,
          message: 'Email sent successfully!'
        });
        setFormData(initialFormData);
        setErrors({});
      } else {
        setSubmitStatus({
          success: false,
          message: response.error || 'Failed to send email'
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred while sending the email'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitStatus({});
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
    resetForm
  };
};
