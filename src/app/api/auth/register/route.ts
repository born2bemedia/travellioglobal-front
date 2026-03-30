import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

import {
  createBrandedEmailHtml,
  escapeHtml,
  renderEmailDetailsList,
  renderEmailParagraph,
} from '@/shared/lib/email/brandedEmail';

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json({ message: 'Server URL is not configured.' }, { status: 500 });
    }

    const body = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      username?: string;
      phone?: string;
    };
    const { firstName, lastName, email, password, username, phone } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: 'Please fill in all required fields.' }, { status: 400 });
    }

    const userPayload: Record<string, unknown> = {
      firstName,
      lastName,
      email,
      password,
    };
    if (username != null && username !== '') userPayload.username = username;
    if (phone != null && phone !== '') userPayload.phone = phone;

    const res = await fetch(`${SERVER_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userPayload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to register user: ${res.status} - ${errorText}`);
      try {
        const errJson = JSON.parse(errorText) as { errors?: Array<{ message?: string }> };
        if (errJson.errors?.length) {
          const message = errJson.errors[0]?.message ?? 'Registration failed.';
          return NextResponse.json({ message }, { status: res.status });
        }
      } catch {
        // ignore JSON parse error
      }
      return NextResponse.json({ message: 'Registration failed.' }, { status: res.status });
    }

    const user = (await res.json()) as {
      id: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
    };

    // Send welcome email to the user
    if (SENDGRID_API_KEY && FROM_EMAIL && email) {
      try {
        const safeFirstName = escapeHtml(firstName);
        const safeEmail = escapeHtml(email);
        const safePassword = escapeHtml(password);

        const welcomeEmailHtml = createBrandedEmailHtml({
          previewTitle: 'Welcome to Travellio Global',
          title: `Welcome to Travellio Global, ${safeFirstName}!`,
          bodyHtml: [
            renderEmailParagraph(
              'Congratulations. Your account has been created successfully, and you can now start exploring Travellio Global.'
            ),
            renderEmailDetailsList('Here are your account details for reference:', [
              { label: 'Email', value: safeEmail },
              { label: 'Password', value: safePassword },
            ]),
            renderEmailParagraph(
              'You can now log in and begin planning your next experience with us.'
            ),
            renderEmailParagraph(
              'We’re excited to have you with us and look forward to helping you discover unforgettable journeys.'
            ),
          ].join('<div style="height: 24px; line-height: 24px;">&nbsp;</div>'),
          signoffLine1: 'Warm regards,',
          signoffLine2: 'Travellio Global',
        });

        const welcomeMsg = {
          to: email,
          from: FROM_EMAIL,
          subject: 'Welcome to Travellio Global - Your Account is Ready',
          html: welcomeEmailHtml,
        };

        await sgMail.send(welcomeMsg);
        console.log(`Registration email sent to ${email}`);
      } catch (emailError) {
        console.error('Error sending registration email:', emailError);
        // Не зупиняємо процес, якщо email не відправився
      }
    }

    // Automatically log in the user after registration to get a token
    const loginRes = await fetch(`${SERVER_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
      // Registration succeeded but login failed - return user anyway
      console.error(`Failed to auto-login after registration: ${loginRes.status}`);
      return NextResponse.json({ user });
    }

    const loginData = (await loginRes.json()) as {
      user?: {
        id: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
      };
      token?: string;
      exp?: number;
      errors?: Array<{ message?: string }>;
    };

    const token = loginData.token;
    const response = NextResponse.json({ user: loginData.user ?? user });

    if (token && COOKIE_NAME) {
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Registration error:', message);
    return NextResponse.json({ message: 'Registration failed.', error: message }, { status: 500 });
  }
}
