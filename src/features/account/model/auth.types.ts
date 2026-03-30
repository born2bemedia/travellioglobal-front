import type { WishlistItem } from './wishlist.types';

export type AuthUser = {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  zip?: string;
  wishlist?: WishlistItem[];
};
