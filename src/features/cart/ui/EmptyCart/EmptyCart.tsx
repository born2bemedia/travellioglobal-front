import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/kit/button/Button';

import styles from './EmptyCart.module.scss';

export const EmptyCart = () => {
  const t = useTranslations('emptyCart');

  return (
    <section className={styles.wrap} aria-labelledby="empty-cart-title">
      <div className={'container'}>
        <div className={styles.content}>
          <h1 id="empty-cart-title" className={styles.title}>
            {t('heading', { fallback: 'Your Cart Is Empty' })}
          </h1>
          <p className={styles.text}>
            {t('description', {
              fallback:
                "It looks like you haven't selected any services yet. Ready to start your next project? Browse our consulting tiers and expert resources to get started.",
            })}
          </p>
          <div className={styles.action}>
            <Button type="link" url="/pricing" variant="blue">
              {t('cta', { fallback: 'View Consulting Solutions' })}
            </Button>
          </div>
        </div>
      </div>
      <Image
        src="/images/cart-empty.png"
        alt="Empty Cart"
        width={1312}
        height={373}
        className={styles.illustration}
      />
    </section>
  );
};
