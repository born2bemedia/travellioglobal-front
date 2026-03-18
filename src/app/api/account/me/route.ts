import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;

export async function PATCH(request: Request): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json({ message: 'Server URL is not configured.' }, { status: 500 });
    }

    const token = (await cookies()).get(COOKIE_NAME as string)?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const meRes = await fetch(`${SERVER_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`,
      },
    });
    if (!meRes.ok) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const meData = (await meRes.json()) as { user?: { id: string } };
    const userId = meData.user?.id;
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      address1?: string;
      address2?: string;
      city?: string;
      country?: string;
      zip?: string;
    };

    const updateRes = await fetch(`${SERVER_URL}/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      const data = (() => {
        try {
          return JSON.parse(errText) as { errors?: Array<{ message?: string }> };
        } catch {
          return {};
        }
      })();
      const message = data.errors?.[0]?.message ?? 'Update failed.';
      return NextResponse.json({ message }, { status: updateRes.status });
    }

    const user = await updateRes.json();
    return NextResponse.json({ user });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Account me PATCH error:', message);
    return NextResponse.json({ message: 'Update failed.' }, { status: 500 });
  }
}
