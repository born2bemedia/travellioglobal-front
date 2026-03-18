import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { ThankYou } from '@/features/cart/ui/ThankYou/ThankYou';

import styles from './page.module.scss';
export default async function ThankYouPage() {
  const t = await getTranslations('thankYou');
  return (
    <>
      <section className={styles.thankYou}>
        <div className="container">
          <ThankYou />
        </div>
        <div className={styles.thankYou__image_desktop}>
          <Image
            src="/images/logIn/log-in-image-desktop.png"
            alt="Hero"
            width={1312}
            height={373}
          />
        </div>

        <div className={styles.thankYou__image_mobile}>
          <Image src="/images/logIn/log-in-image-mobile.png" alt="Hero" width={740} height={678} />
        </div>
      </section>
    </>
  );
}
