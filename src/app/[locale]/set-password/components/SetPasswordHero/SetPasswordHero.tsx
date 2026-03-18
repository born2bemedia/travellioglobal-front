'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { SetPasswordForm } from '@/features/account/ui/SetPasswordForm/SetPasswordForm';

import { fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './SetPasswordHero.module.scss';

export const SetPasswordHero = ({ token }: { token: string }) => {
  return (
    <motion.section
      className={styles.set_password_form}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="container">
        <SetPasswordForm token={token} />

        <div className={styles.set_password_form__image_desktop}>
          <Image
            src="/images/logIn/log-in-image-desktop.png"
            alt="Hero"
            width={1312}
            height={373}
          />
        </div>

        <div className={styles.set_password_form__image_mobile}>
          <Image src="/images/logIn/log-in-image-mobile.png" alt="Hero" width={740} height={678} />
        </div>
      </div>
    </motion.section>
  );
};
