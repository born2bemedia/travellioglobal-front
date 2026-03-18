import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;

export async function GET(): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json({ message: 'Server URL is not configured.' }, { status: 500 });
    }

    const token = (await cookies()).get(COOKIE_NAME as string)?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const res = await fetch(`${SERVER_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`,
      },
    });

    if (res.status === 401 || res.status === 403) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    if (!res.ok) {
      return NextResponse.json({ message: 'Failed to get user.', user: null }, { status: 200 });
    }

    const data = (await res.json()) as {
      user?: { id: string; email?: string; firstName?: string; lastName?: string; phone?: string };
    };
    return NextResponse.json({ user: data.user ?? null });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Me error:', message);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
