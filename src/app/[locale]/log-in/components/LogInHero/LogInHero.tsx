'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { LoginForm } from '@/features/account/ui/LoginForm/LoginForm';

import { fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './LogInHero.module.scss';

export const LogInHero = () => {
  return (
    <motion.section
      className={styles.log_in_form}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="container">
        <LoginForm />

        <div className={styles.log_in_form__image_desktop}>
          <Image
            src="/images/logIn/log-in-image-desktop.png"
            alt="Hero"
            width={1312}
            height={373}
          />
        </div>

        <div className={styles.log_in_form__image_mobile}>
          <Image src="/images/logIn/log-in-image-mobile.png" alt="Hero" width={740} height={678} />
        </div>
      </div>
    </motion.section>
  );
};
