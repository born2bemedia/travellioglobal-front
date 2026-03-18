'use client';

import React from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { RegistrationForm } from '@/features/account';

import { fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './SignUpHero.module.scss';

export const SignUpHero = () => {
  const t = useTranslations('SignUpHero');

  return (
    <motion.section
      className={styles.sign_up_hero}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="container">
        <div className={styles.sign_up_hero__top}>
          <h1 className={`main-heading-title ${styles.sign_up_hero__title}`}>
            {t('title', { fallback: 'Join Axelvior Today' })}
          </h1>
          <p className={`main-heading-subtitle ${styles.header_text}`}>
            {t('subtitle', {
              fallback:
                'Register to manage your engagements and unlock exclusive strategic insights. Partner with Axelvior to scale your impact today.',
            })}
          </p>
        </div>

        <RegistrationForm />

        <div className={styles.sign_up_hero__image_desktop}>
          <Image src="/images/signUp/hero-desktop.png" alt="Hero" width={1312} height={373} />
        </div>

        <div className={styles.sign_up_hero__image_mobile}>
          <Image src="/images/signUp/hero-mobile.png" alt="Hero" width={740} height={800} />
        </div>
      </div>
    </motion.section>
  );
};
