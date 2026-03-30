import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { AuthUser } from '@/features/account/model/auth.types';
import type { WishlistItem } from '@/features/account/model/wishlist.types';

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;

function resolveWishlistImage(image: WishlistItem['image']) {
  if (!image) {
    return undefined;
  }

  if (typeof image === 'string') {
    if (image.startsWith('http')) {
      return image;
    }

    return SERVER_URL ? `${SERVER_URL}${image}` : image;
  }

  if (typeof image === 'object' && image.url) {
    if (image.url.startsWith('http')) {
      return image.url;
    }

    return SERVER_URL ? `${SERVER_URL}${image.url}` : image.url;
  }

  return undefined;
}

function normalizeUser(user?: AuthUser | null): AuthUser | null {
  if (!user?.id) {
    return null;
  }

  return {
    ...user,
    wishlist: (user.wishlist ?? [])
      .filter((item): item is WishlistItem => Boolean(item?.product))
      .map((item) => ({
        product: item.product,
        image: resolveWishlistImage(item.image),
      })),
  };
}

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

    const data = (await res.json()) as { user?: AuthUser | null };
    return NextResponse.json({ user: normalizeUser(data.user) });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Me error:', message);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
