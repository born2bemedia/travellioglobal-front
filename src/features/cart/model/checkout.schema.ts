import { z } from "zod";

// Set to false to disable reCAPTCHA (e.g. development)
const ENABLE_RECAPTCHA = true;

export const checkoutFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    address1: z.string().min(1, "Address Line 1 is required"),
    address2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    zip: z.string().min(1, "ZIP Code is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    phone: z.string().optional(),
    orderNotes: z.string().optional(),
    termsAccepted: z.boolean().refine((val) => val, {
      message: "You must accept the Terms of Use",
    }),
    refundPolicyAccepted: z.boolean().refine((val) => val, {
      message: "You must accept the Refund Policy",
    }),
    recaptcha: ENABLE_RECAPTCHA
      ? z.string().min(1, "Please complete the reCAPTCHA verification")
      : z.string().optional(),
  })
  .strict();

export type CheckoutFormSchema = z.infer<typeof checkoutFormSchema>;
