'use server';

import { cookies } from 'next/headers';

import sgMail from '@sendgrid/mail';

import { verifyRecaptcha } from '@/shared/lib/recaptcha';

import type { CheckoutFormSchema } from '../model/checkout.schema';
import type { CartItem } from '../store/cart';
import { ensureUser } from './user';

const ENABLE_RECAPTCHA = true;

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export type CreateOrderPayload = {
  billing: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    country: string;
    zip: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  orderNotes?: string;
  items: CartItem[];
  total: number;
  recaptcha?: string;
  /** Logged-in user ID — links order to user in CMS */
  userId?: string;
};

const postOrder = async (
  data: CheckoutFormSchema,
  total: number,
  cart: CartItem[],
  passedUserId?: string
) => {
  if (!SERVER_URL) {
    throw new Error('SERVER_URL is not configured');
  }

  let userId: string;
  let isNewUser = false;
  let password: string | undefined;

  if (passedUserId) {
    userId = passedUserId;
  } else {
    const result = await ensureUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone ?? '',
    });
    userId = result.userId;
    isNewUser = result.isNewUser;
    password = result.password;
  }

  const orderNumber = `ORD_${Math.floor(Math.random() * 900000) + 100000}`;

  const orderNotes = [
    `Contact: ${data.email}, ${data.phone ?? ''}`,
    `Billing name: ${data.firstName} ${data.lastName}`,
    data.orderNotes ? `Notes: ${data.orderNotes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const orderData = {
    user: userId,
    items: cart.map((item) => ({
      product: item.title,
      quantity: item.quantity,
      price: item.price,
    })),
    total: total,
    status: 'pending',
    paymentMethod: 'Bank Transfer',
    orderNotes,
    billingAddress: {
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      zip: data.zip,
      country: data.country,
    },
  };

  console.log('Sending order data to Payload:', JSON.stringify(orderData, null, 2));

  // If Payload returns 500 "Something went wrong", check the CMS repo:
  // - Orders collection: beforeChange hook (e.g. find last order with sort "-createdAt") — ensure it handles empty collection and correct field name (createdAt vs createdAt).
  // - Run the CMS locally and check server logs for the real error/stack trace.
  const response = await fetch(`${SERVER_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Order creation failed with status: ${response.status}`);
    console.error('Error response:', errorText);
    // Payload often returns { errors: [{ message, name?, data? }] } — log full JSON for debugging
    try {
      const errJson = JSON.parse(errorText) as {
        errors?: Array<{ message?: string; name?: string; data?: unknown }>;
      };
      if (errJson.errors?.length) {
        console.error('Payload errors:', JSON.stringify(errJson.errors, null, 2));
      }
    } catch {
      // ignore
    }
    throw new Error(`Failed to create order: ${response.status} - ${errorText}`);
  }

  const orderResult = (await response.json()) as {
    doc?: { orderNumber?: string };
  };
  const createdOrderNumber = orderResult.doc?.orderNumber ?? orderNumber;

  // Після успішної покупки логінимо юзера, якщо він щойно створений
  if (isNewUser && password && data.email) {
    try {
      const loginRes = await fetch(`${SERVER_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: data.email, password }),
      });
      if (loginRes.ok) {
        const loginData = (await loginRes.json()) as { token?: string };
        if (loginData.token) {
          const cookieStore = await cookies();
          cookieStore.set(COOKIE_NAME as string, loginData.token ?? '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          });
        }
      }
    } catch (loginErr) {
      console.error('Auto-login after purchase failed:', loginErr);
    }
  }

  // Send emails if SendGrid is configured
  if (SENDGRID_API_KEY && FROM_EMAIL && ADMIN_EMAIL) {
    try {
      const adminMsg = {
        to: ADMIN_EMAIL,
        from: FROM_EMAIL,
        subject: `New Order Received - ${createdOrderNumber}`,
        html: `
          <h2>New Order Received - ${createdOrderNumber}</h2>
          <p><strong>User:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone ?? ''}</p>
          <p><strong>Address:</strong> ${data.address1}${
            data.address2 ? `, ${data.address2}` : ''
          }, ${data.city}, ${data.zip}, ${data.country}</p>
          ${data.orderNotes ? `<p><strong>Order Notes:</strong> ${data.orderNotes}</p>` : ''}
          <p><strong>Total:</strong> €${total.toFixed(2)}</p>
          <p><strong>Items:</strong></p>
          <ul>
            ${cart
              .map(
                (item) =>
                  `<li>${item.title} x ${item.quantity} - €${(item.price * item.quantity).toFixed(
                    2
                  )}</li>`
              )
              .join('')}
          </ul>
        `,
      };

      // Escape HTML to prevent XSS
      const escapeHtml = (text: string) => {
        return text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      };

      const safeFirstName = escapeHtml(data.firstName);

      const userMsg = {
        to: data.email,
        from: FROM_EMAIL,
        subject: "We've received your Axelvior order",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Received - Axelvior</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fff; color: #333;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 640px; width: 100%; border-collapse: collapse; background-color: #fff; overflow: hidden;">
          <tr>
            <td style="padding: 0; height: 100px;">
              <img style="width: 100%; height: auto;" src="https://travellioglobal.com/images/email-header.png" alt="Axelvior Logo">
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; background: #fff;">
              <p style="margin: 0 0 32px; color: #333;font-size: 24px;font-style: normal;font-weight: 400;line-height: 140%;">
                Dear ${safeFirstName},
              </p>
              <p style="margin: 0 0 24px; color: #333;font-size: 16px;font-style: normal;font-weight: 400;line-height: 140%;">
                Thank you for choosing Axelvior as your strategic partner. We have successfully received your request and are pleased to confirm your engagement.<br>
                Our team is currently reviewing your requirements to ensure our resources align with your business objectives.
              </p>
              <span style="display: block;padding: 20px;background:#384CE3;margin: 32px 0;color: #FFF;font-size: 14px;font-style: normal;font-weight: 400;line-height: 140%;">
                Engagement Summary:<br><br>

                ${cart
                  .map(
                    (item) => `
                  <ul>
                    <li>
                      Service: <strong>${escapeHtml(item.title)}</strong>
                    </li>
                    <li>
                      Quantity: <strong>${item.quantity}</strong>
                    </li>
                    <li>
                      Order ID: <strong>${createdOrderNumber}</strong>
                    </li>
                    <li>
                      Date: <strong>${new Date().toLocaleDateString()}</strong>
                    </li>
                    <li>
                      Total Amount: <strong>${escapeHtml(
                        (item.price * item.quantity).toFixed(2)
                      )}</strong>
                    </li>
                  </ul>
                  `
                  )
                  .join('')}
              </span>
              <p style="margin: 0 0 24px; color: #333;font-size: 16px;font-style: normal;font-weight: 400;line-height: 140%;">
                <b>What Happens Next?</b><br>
                You will receive an email shortly containing payment instructions. Once those details are finalized, we will move forward with the next phase of your project.<br>
                We look forward to a successful collaboration.
              </p>
              <p style="margin: 0 0 24px; color: #333;font-size: 16px;font-style: normal;font-weight: 400;line-height: 140%;">
                Best regards,<br>
                <strong style="color: #333;">The Axelvior Team</strong><br>
                <span style="font-size:16px;">
                  Strategic Solutions for Modern Business
                </span>
              </p>
              <p style="margin: 0; color: #333;font-size: 18px;font-style: normal;font-weight: 400;line-height: 140%;">
                <a href="https://travellioglobal.com" target="_blank" style="color: #333;font-weight: 400;text-decoration: underline;">travellioglobal.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0; height: 100px;">
              <img style="width: 100%; height: auto;" src="https://travellioglobal.com/images/email-footer.png" alt="Axelvior Logo">
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      };

      await sgMail.send(adminMsg);
      await sgMail.send(userMsg);
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      // Don't fail the order if email fails
    }
  }

  return orderResult;
};

export const createOrder = async (payload: CreateOrderPayload) => {
  if (ENABLE_RECAPTCHA) {
    const token = payload.recaptcha;
    if (!token || token === 'disabled') {
      throw new Error('reCAPTCHA verification is required.');
    }
    const valid = await verifyRecaptcha(token);
    if (!valid) {
      throw new Error('reCAPTCHA verification failed. Please try again.');
    }
  }

  const formData: CheckoutFormSchema = {
    firstName: payload.billing.firstName,
    lastName: payload.billing.lastName,
    address1: payload.billing.address1,
    address2: payload.billing.address2,
    city: payload.billing.city,
    country: payload.billing.country,
    zip: payload.billing.zip,
    email: payload.contact.email,
    phone: payload.contact.phone ?? '',
    orderNotes: payload.orderNotes,
    termsAccepted: true,
    refundPolicyAccepted: true,
    recaptcha: payload.recaptcha,
  };

  return postOrder(formData, payload.total, payload.items, payload.userId);
};
