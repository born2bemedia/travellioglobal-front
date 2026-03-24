'use client';

import { useTranslations } from 'next-intl';

import { ContactFormContacts } from '@/features/contact-form/ui/ContactFormContacts';

import styles from './ContactsGetInTouch.module.scss';

export const ContactsGetInTouch = () => {
  const t = useTranslations('contactsPage');

  return (
    <section className={styles.getInTouch}>
      <div className="container">
        <div className={styles.getInTouch__header}>
          <h2 className={styles.getInTouch__title}>
            {t('getInTouchTitle', {
              fallback: 'Get in Touch with Travellio Global',
            })}
          </h2>
          <p className={styles.getInTouch__subtitle}>
            {t('getInTouchSubtitle', {
              fallback: 'Great journeys start with great conversations.',
            })}
          </p>
        </div>
        <ContactFormContacts />
      </div>
    </section>
  );
};
