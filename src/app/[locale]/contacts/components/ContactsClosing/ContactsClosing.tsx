'use client';

import { useTranslations } from 'next-intl';

import styles from './ContactsClosing.module.scss';

export const ContactsClosing = () => {
  const t = useTranslations('contactsPage');

  return (
    <section className={styles.closing}>
      <div className="container">
        <h2 className={styles.closing__title}>
          {t('closingTitle', { fallback: "We're Here for You" })}
        </h2>
        <div className={styles.closing__text}>
          <p>
            {t('closingLine1', {
              fallback:
                "Big trip or small question - we're just one message away.",
            })}
          </p>
          <p>
            {t('closingLine2', {
              fallback: "Let's plan something unforgettable.",
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
