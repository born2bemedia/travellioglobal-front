import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { AuthUser } from '@/features/account/model/auth.types';
import type { WishlistItem } from '@/features/account/model/wishlist.types';

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;

type PayloadMeResponse = {
  user?: AuthUser | null;
};

type AuthorizedUserResult =
  | {
      ok: true;
      token: string;
      user: AuthUser;
    }
  | {
      ok: false;
      error: NextResponse;
    };

async function getAuthorizedUser(): Promise<AuthorizedUserResult> {
  const token = (await cookies()).get(COOKIE_NAME as string)?.value;

  if (!SERVER_URL) {
    return {
      ok: false,
      error: NextResponse.json({ message: 'Server URL is not configured.' }, { status: 500 }),
    };
  }

  if (!token) {
    return { ok: false, error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }) };
  }

  const meResponse = await fetch(`${SERVER_URL}/api/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `JWT ${token}`,
    },
  });

  if (!meResponse.ok) {
    return { ok: false, error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }) };
  }

  const meData = (await meResponse.json()) as PayloadMeResponse;
  const user = meData.user;

  if (!user?.id) {
    return { ok: false, error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }) };
  }

  return { ok: true, token, user };
}

async function patchWishlist(userId: string, token: string, wishlist: WishlistItem[]) {
  const updateResponse = await fetch(`${SERVER_URL}/api/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({ wishlist }),
  });

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    return NextResponse.json(
      { message: errorText || 'Wishlist update failed.' },
      { status: updateResponse.status }
    );
  }

  const user = (await updateResponse.json()) as AuthUser;

  return NextResponse.json({ user });
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const auth = await getAuthorizedUser();

    if (!auth.ok) {
      return auth.error;
    }

    const body = (await request.json()) as WishlistItem;
    const product = body.product?.trim();

    if (!product) {
      return NextResponse.json({ message: 'Product is required.' }, { status: 400 });
    }

    const currentWishlist = auth.user.wishlist ?? [];
    const nextWishlist = currentWishlist.some((item) => item.product === product)
      ? currentWishlist
      : [...currentWishlist, { product }];

    return patchWishlist(auth.user.id, auth.token, nextWishlist);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Wishlist POST error:', message);
    return NextResponse.json({ message: 'Wishlist update failed.' }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const auth = await getAuthorizedUser();

    if (!auth.ok) {
      return auth.error;
    }

    const body = (await request.json()) as { product?: string };
    const product = body.product?.trim();

    if (!product) {
      return NextResponse.json({ message: 'Product is required.' }, { status: 400 });
    }

    const nextWishlist = (auth.user.wishlist ?? []).filter((item) => item.product !== product);

    return patchWishlist(auth.user.id, auth.token, nextWishlist);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Wishlist DELETE error:', message);
    return NextResponse.json({ message: 'Wishlist update failed.' }, { status: 500 });
  }
}
