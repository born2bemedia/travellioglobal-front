import { NextResponse } from 'next/server';

const SERVER_URL = process.env.SERVER_URL;

type PayloadErrorResponse = {
  message?: string;
  errors?: Array<{ message?: string }>;
};

const getErrorMessage = (data: PayloadErrorResponse, fallback: string) => {
  return data.errors?.[0]?.message ?? data.message ?? fallback;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json({ message: 'Server URL is not configured.' }, { status: 500 });
    }

    const body = (await request.json()) as { token?: string; password?: string };
    const token = body.token?.trim();
    const password = body.password?.trim();

    if (!token || !password) {
      return NextResponse.json(
        { message: 'Token and new password are required.' },
        { status: 400 }
      );
    }

    const payloadRes = await fetch(`${SERVER_URL}/api/users/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });

    const payloadData = (await payloadRes.json()) as PayloadErrorResponse;

    if (!payloadRes.ok) {
      return NextResponse.json(
        { message: getErrorMessage(payloadData, 'Reset password failed.') },
        { status: payloadRes.status }
      );
    }

    return NextResponse.json({ message: payloadData.message ?? 'Password updated successfully.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Reset password error:', message);
    return NextResponse.json({ message: 'Reset password failed.' }, { status: 500 });
  }
}
