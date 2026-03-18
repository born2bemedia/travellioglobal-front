import { z } from 'zod';

// Set to false to disable reCAPTCHA validation (useful for development/testing)
const ENABLE_RECAPTCHA = true;

export const createContactFormSchema = () =>
  z.object({
    fullName: z.string().min(1, 'This field is required'),
    email: z.string().email('Invalid email address').min(1, 'This field is required'),
    phone: z.string().optional(),
    propertyLocation: z.string().min(1, 'This field is required'),
    primaryObjective: z.string().min(1, 'This field is required'),
    inheritance: z.string().min(1, 'This field is required'),
    description: z.string().min(1, 'This field is required'),
    documents: z.array(z.instanceof(File)).optional(),
    recaptcha: ENABLE_RECAPTCHA
      ? z.string().min(1, 'Please complete the reCAPTCHA verification')
      : z.string().optional(),
  });

export type ContactFormSchema = z.infer<ReturnType<typeof createContactFormSchema>>;


export const createContactFormNewSchema = () =>
  z.object({
    fullName: z.string().min(1, 'This field is required'),
    email: z.string().email('Invalid email address').min(1, 'This field is required'),
    phone: z.string().optional(),
    message: z.string().optional(),
    recaptcha: ENABLE_RECAPTCHA
      ? z.string().min(1, 'Please complete the reCAPTCHA verification')
      : z.string().optional(),
  });

export type ContactFormNewSchema = z.infer<ReturnType<typeof createContactFormNewSchema>>;


export const createHomeRequestFormSchema = () =>
  z.object({
    fullName: z.string().min(1, 'This field is required'),
    email: z.string().email('Invalid email address').min(1, 'This field is required'),
    phone: z.string().min(1, 'This field is required'),
    companyName: z.string().optional(),
    website: z.string().optional(),
    projectType: z.string().min(1, 'This field is required'),
    projectTypeOther: z.string().optional(),
    investmentRange: z.string().min(1, 'This field is required'),
    goals: z.string().optional(),
    frictionPoints: z.string().optional(),
    clientContext: z.string().optional(),
    timing: z.string().min(1, 'This field is required'),
    followUp: z.string().min(1, 'This field is required'),
    attachments: z.array(z.instanceof(File)).optional(),
  });

export type HomeRequestFormSchema = z.infer<ReturnType<typeof createHomeRequestFormSchema>>;