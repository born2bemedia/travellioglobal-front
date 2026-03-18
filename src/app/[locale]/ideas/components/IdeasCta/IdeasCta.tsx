'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './IdeasCta.module.scss';

export const IdeasCta = ({ slug }: { slug: string }) => {
  const t = useTranslations('ideasCta');

  let title1 = '';
  let title2 = '';
  let subtitle1 = '';

  if (slug === 'building-a-scalable-business-key-decisions-to-make-early-on') {
    title1 = t('title1', {
      fallback: 'Ready to build a scalable business',
    });
    title2 = t('title2', {
      fallback: 'with clarity and purpose?',
    });
    subtitle1 = t('subtitle1', {
      fallback: 'Start with a conversation today.',
    });
  } else if (slug === 'from-instinct-to-structure-how-clarity-transforms-your-business') {
    title1 = t('title1_1', {
      fallback: 'Ready to create a structured path',
    });
    title2 = t('title2_1', {
      fallback: 'for your business?',
    });
    subtitle1 = t('subtitle1_1', {
      fallback: 'Start with a conversation today.',
    });
  } else if (slug === 'the-power-of-saying-no-why-focus-is-the-key-to-entrepreneurial-success') {
    title1 = t('title1_2', {
      fallback: 'Ready to embrace the power of focus',
    });
    title2 = t('title2_2', {
      fallback: 'and take your business to the next level?',
    });
    subtitle1 = t('subtitle1_2', {
      fallback: 'Start with a conversation today.',
    });
  } else if (slug === 'navigating-growth-when-to-push-forward-and-when-to-step-back') {
    title1 = t('title1_3', {
      fallback: 'Ready to take the next step',
    });
    title2 = t('title2_3', {
      fallback: 'in scaling your business?',
    });
    subtitle1 = t('subtitle1_3', {
      fallback: 'Start with a conversation today.',
    });
  }

  return (
    <>
      <section className={styles.ideas_cta}>
        <Image src="/images/home/independence1.svg" alt="Independence" width={350} height={350} />
        <Image src="/images/home/independence2.svg" alt="Independence" width={350} height={350} />
        <div className={styles.ideas_cta__wrapper}>
          <div className={'container'}>
            <div className={styles.ideas_cta__content}>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {title1} <br />
                {title2}
              </motion.h2>
              <motion.p>{subtitle1}</motion.p>
              <Button variant="blue" url="/#home-form" type="link">
                {t('button', { fallback: 'Submit a request' })}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
