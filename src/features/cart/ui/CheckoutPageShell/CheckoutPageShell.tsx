'use client';

import Image from 'next/image';

import type { ReactNode } from 'react';

import styles from './CheckoutPageShell.module.scss';

type CheckoutPageShellProps = {
  children: ReactNode;
  contentClassName?: string;
};

export const CheckoutPageShell = ({ children, contentClassName }: CheckoutPageShellProps) => {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/images/legal/dashed-path.svg"
          alt=""
          width={1858}
          height={513}
          className={styles.hero__decoration}
          priority
        />

        <div className="container">
          <div
            className={
              contentClassName
                ? `${styles.hero__content} ${contentClassName}`
                : styles.hero__content
            }
          >
            {children}
          </div>
        </div>
      </section>
    </main>
  );
};
