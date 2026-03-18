import { NextResponse } from 'next/server';

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json({ message: 'Server URL is not configured.' }, { status: 500 });
    }

    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    const { email: loginInput, password } = body;

    if (!loginInput || !password) {
      return NextResponse.json(
        { message: 'Email/username and password are required.' },
        { status: 400 }
      );
    }

    // Payload login accepts only email — resolve username to email if needed
    let email = loginInput.trim();
    if (!email.includes('@')) {
      const userRes = await fetch(
        `${SERVER_URL}/api/users?where[username][equals]=${encodeURIComponent(email)}&limit=1`,
        {
          headers: { Accept: 'application/json' },
        }
      );
      if (!userRes.ok) {
        return NextResponse.json({ message: 'Invalid username or password.' }, { status: 401 });
      }
      const userList = (await userRes.json()) as { docs?: Array<{ email?: string }> };
      const user = userList.docs?.[0];
      if (!user?.email) {
        return NextResponse.json({ message: 'Invalid username or password.' }, { status: 401 });
      }
      email = user.email;
    }

    const res = await fetch(`${SERVER_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = (await res.json()) as {
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

    if (!res.ok) {
      const message = data.errors?.[0]?.message ?? 'Login failed.';
      return NextResponse.json({ message }, { status: res.status });
    }

    const token = data.token;
    if (!token) {
      return NextResponse.json({ message: 'No token received from server.' }, { status: 500 });
    }

    const response = NextResponse.json({ user: data.user });
    response.cookies.set(COOKIE_NAME as string, token ?? '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Login error:', message);
    return NextResponse.json({ message: 'Login failed.', error: message }, { status: 500 });
  }
}
