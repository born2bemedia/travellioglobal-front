'use client';

import { useMemo, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useAuthStore } from '@/features/account/store/auth';
import { useTours } from '@/features/tours';

import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right';

import styles from './AccountPage.module.scss';

type WishlistDisplayItem = {
  product: string;
  title: string;
  image?: string;
};

function resolveWishlistImage(image: unknown) {
  if (!image) {
    return undefined;
  }

  if (typeof image === 'string') {
    return image;
  }

  if (typeof image === 'object' && image && 'url' in image) {
    const value = image as { url?: string };
    return value.url;
  }

  return undefined;
}

export const AccountWishlistPanel = () => {
  const t = useTranslations('accountPage');
  const tours = useTours();
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const removeFromWishlist = useAuthStore((state) => state.removeFromWishlist);
  const [message, setMessage] = useState<string | null>(null);
  const [busyProduct, setBusyProduct] = useState<string | null>(null);

  const items = useMemo<WishlistDisplayItem[]>(() => {
    const tourIdMap = new Map(tours.map((tour) => [tour.id, tour]));
    const tourTitleMap = new Map(tours.map((tour) => [tour.title, tour]));

    return (user?.wishlist ?? []).map((item) => {
      const matchedTour =
        tourTitleMap.get(item.product) ?? tourIdMap.get(item.product);

      return {
        product: item.product,
        title: matchedTour?.title ?? item.product,
        image: resolveWishlistImage(item.image) ?? matchedTour?.image,
      };
    });
  }, [tours, user?.wishlist]);

  const handleDelete = async (product: string) => {
    setBusyProduct(product);
    setMessage(null);

    const result = await removeFromWishlist(product);

    if (!result.ok) {
      setMessage(result.message ?? t('wishlist.updateFailed', { fallback: 'Wishlist update failed.' }));
    }

    setBusyProduct(null);
  };

  const handleSave = async () => {
    await fetchUser();
    setMessage(
      t('wishlist.saved', {
        fallback: 'Your wishlist is synced with your account.',
      })
    );
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>
          {t('wishlist.title', { fallback: 'Dream Now. Travel Soon.' })}
        </h2>
        <p className={styles.panelDescription}>
          {t('wishlist.description', {
            fallback:
              "Your saved escapes live here — the experiences that caught your eye and sparked inspiration. Review, manage, or remove items anytime, and turn today's ideas into tomorrow's adventures.",
          })}
        </p>
        <p className={styles.panelNote}>
          {t('wishlist.note', {
            fallback: 'As every great journey starts with a little wanderlust.',
          })}
        </p>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateTitle}>
            {t('wishlist.emptyTitle', { fallback: 'Your wishlist is empty.' })}
          </p>
          <p className={styles.emptyStateBody}>
            {t('wishlist.emptyBody', {
              fallback:
                'Save your favorite itineraries here so you can return to them whenever inspiration strikes.',
            })}
          </p>
        </div>
      ) : (
        <>
          <div className={styles.wishlistTable}>
            <div className={`${styles.wishlistRow} ${styles.wishlistHeaderRow}`}>
              <span>{t('wishlist.columns.tourName', { fallback: 'Tour Name' })}</span>
              <span>{t('wishlist.columns.preview', { fallback: 'Tour Preview' })}</span>
              <span>{t('wishlist.columns.manage', { fallback: 'Manage' })}</span>
            </div>

            {items.map((item) => (
              <div key={item.product} className={styles.wishlistRow}>
                <div className={styles.wishlistName}>{item.title}</div>
                <div className={styles.wishlistPreview}>
                  <div className={styles.wishlistPreviewFrame}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} className={styles.wishlistPreviewImage} />
                    ) : (
                      <span className={styles.wishlistPreviewPlaceholder}>[Image]</span>
                    )}
                  </div>
                </div>
                <div className={styles.wishlistManage}>
                  <button
                    type="button"
                    className={styles.inlineDelete}
                    disabled={busyProduct === item.product}
                    onClick={() => handleDelete(item.product)}
                  >
                    {t('wishlist.delete', { fallback: 'Delete' })}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.mobileWishlistList}>
            {items.map((item) => (
              <article key={item.product} className={styles.mobileWishlistCard}>
                <div className={styles.mobileWishlistSection}>
                  <span className={styles.mobileBookingLabel}>
                    {t('wishlist.columns.tourName', { fallback: 'Tour Name' })}
                  </span>
                  <span className={styles.mobileBookingValue}>{item.title}</span>
                </div>

                <div className={styles.mobileWishlistSection}>
                  <span className={styles.mobileBookingLabel}>
                    {t('wishlist.columns.preview', { fallback: 'Tour Preview' })}
                  </span>
                  <div className={styles.wishlistPreviewFrame}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} className={styles.wishlistPreviewImage} />
                    ) : (
                      <span className={styles.wishlistPreviewPlaceholder}>[Image]</span>
                    )}
                  </div>
                </div>

                <div className={styles.mobileWishlistSection}>
                  <span className={styles.mobileBookingLabel}>
                    {t('wishlist.columns.manage', { fallback: 'Manage' })}
                  </span>
                  <button
                    type="button"
                    className={styles.inlineDelete}
                    disabled={busyProduct === item.product}
                    onClick={() => handleDelete(item.product)}
                  >
                    {t('wishlist.delete', { fallback: 'Delete' })}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <div className={styles.panelFooter}>
        <button type="button" className={styles.primaryButton} onClick={handleSave}>
          <ArrowRightIcon />
          <span>{t('wishlist.save', { fallback: 'Save Wishlist' })}</span>
        </button>

        {message ? <p className={styles.feedbackSuccess}>{message}</p> : null}
      </div>
    </div>
  );
};
