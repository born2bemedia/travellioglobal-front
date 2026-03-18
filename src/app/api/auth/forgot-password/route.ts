import { NextResponse } from 'next/server';

const SERVER_URL = process.env.SERVER_URL;

type PayloadErrorResponse = {
  message?: string;
  errors?: Array<{ message?: string }>;
};

const getErrorMessage = (data: PayloadErrorResponse, fallback: string) => {
  return data.errors?.[0]?.message ?? data.message ?? fallback;
};

async function resolveUserEmail(loginInput: string): Promise<string | null> {
  if (!SERVER_URL) return null;

  const queryField = loginInput.includes('@') ? 'email' : 'username';
  const res = await fetch(
    `${SERVER_URL}/api/users?where[${queryField}][equals]=${encodeURIComponent(loginInput)}&limit=1`,
    {
      headers: { Accept: 'application/json' },
    }
  );

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as { docs?: Array<{ email?: string }> };
  return data.docs?.[0]?.email ?? null;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json({ message: 'Server URL is not configured.' }, { status: 500 });
    }

    const body = (await request.json()) as { email?: string };
    const loginInput = body.email?.trim();

    if (!loginInput) {
      return NextResponse.json({ message: 'Email or username is required.' }, { status: 400 });
    }

    const email = await resolveUserEmail(loginInput);

    if (!email) {
      return NextResponse.json({ message: 'User is not registered.' }, { status: 404 });
    }

    const payloadRes = await fetch(`${SERVER_URL}/api/users/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const payloadData = (await payloadRes.json()) as PayloadErrorResponse;

    if (!payloadRes.ok) {
      return NextResponse.json(
        { message: getErrorMessage(payloadData, 'Forgot password failed.') },
        { status: payloadRes.status }
      );
    }

    return NextResponse.json({
      message: payloadData.message ?? 'Password reset email sent.',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Forgot password error:', message);
    return NextResponse.json({ message: 'Forgot password failed.' }, { status: 500 });
  }
}
