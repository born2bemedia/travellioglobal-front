import { z } from 'zod';

export const contactDataSchema = z.object({
  firstName: z.string().min(1, 'Name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  zip: z.string().min(1, 'Zip is required'),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(1, 'New password is required'),
    repeatNewPassword: z.string().min(1, 'Repeat new password'),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: 'The passwords do not match.',
    path: ['repeatNewPassword'],
  });

export const registrationSchema = z
  .object({
    firstName: z.string().min(1, 'Please enter your first name.'),
    lastName: z.string().min(1, 'Please enter your last name.'),
    username: z.string().optional(),
    email: z
      .string()
      .min(1, 'Please enter your email address.')
      .email('Please enter a valid email address.'),
    phone: z.string().min(1, 'This field is required'),
    password: z.string().min(1, 'Please create a password.'),
    repeatPassword: z.string().min(1, 'Please repeat your password'),
    agreement: z
      .boolean()
      .refine((val) => val === true, { message: 'You must agree to the terms.' }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });

export type ContactDataSchema = z.infer<typeof contactDataSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type RegistrationSchema = z.infer<typeof registrationSchema>;
