export type WishlistImage =
  | string
  | {
      url?: string;
      filename?: string;
    }
  | null
  | undefined;

export type WishlistItem = {
  product: string;
  image?: WishlistImage;
};
