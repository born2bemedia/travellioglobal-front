'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './AuthPageShell.module.scss';

type AuthPageShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export const AuthPageShell = ({ title, subtitle, children }: AuthPageShellProps) => {
  return (
    <main className={styles.page}>
      <motion.section
        className={styles.hero}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Image
          src="/images/legal/dashed-path.svg"
          alt=""
          width={1858}
          height={513}
          className={styles.hero__decoration}
          priority
        />

        <div className="container">
          <div className={styles.hero__inner}>
            <div className={styles.hero__content}>
              <h1 className={styles.hero__title}>{title}</h1>
              <p className={styles.hero__subtitle}>{subtitle}</p>
            </div>

            <div className={styles.hero__card}>{children}</div>
          </div>
        </div>
      </motion.section>
    </main>
  );
};
