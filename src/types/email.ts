export interface EmailFormData {
  to: string;
  subject: string;
  message: string;
  // Add any other fields that your email form might need
}

export interface EmailResponse {
  success: boolean;
  error?: string;
  // Add any other response fields that your API might return
}

export interface EmailFormErrors {
  name?: string;
  email?: string;
  message?: string;
} 