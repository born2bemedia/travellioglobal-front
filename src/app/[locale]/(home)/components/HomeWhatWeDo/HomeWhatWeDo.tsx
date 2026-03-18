'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './HomeWhatWeDo.module.scss';



export const HomeWhatWeDo = () => {
  const t = useTranslations('homeWhatWeDo');

  const FEATURE_KEYS = [
    {
      title: t('featureOneTitle', { fallback: 'Memorable Adventures' }),
      description: t('featureOneDescription', { fallback: 'From turquoise coastlines to buzzing city lights — we curate trips that feel like stories worth telling.' }),
    },
    {
      title: t('featureTwoTitle', { fallback: 'Inspiring Journeys' }),
      description: t('featureTwoDescription', { fallback: 'Ancient ruins. Secret alleyways. Crystal waters. Your camera roll is about to work overtime.' }),
    },
    {
      title: t('featureThreeTitle', { fallback: 'Custom Travel Experiences' }),
      description: t('featureThreeDescription', { fallback: 'Not into “standard”? Good. We personalise journeys that match your vibe, budget, and bucket list.' }),
    },
  ] as const;

  return (
    <section className={styles.home_what_we_do}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeInUp}
          className={styles.home_what_we_do__content}
        >
          <div className={styles.home_what_we_do__media}>
            <div className={styles.home_what_we_do__media_image}>
              <Image
                src="/images/home/section-best/mountains.webp"
                alt={t('imageAlt', { fallback: 'Mountain landscape' })}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            <div className={styles.home_what_we_do__media_copy}>
              <h2>{t('title', { fallback: 'What We Do Best' })}</h2>
              <p>{t('caption', { fallback: 'Travel, upgraded.' })}</p>
            </div>
          </div>

          <div className={styles.home_what_we_do__features}>
            {FEATURE_KEYS.map((feature, index) => (
              <article key={index} className={styles.home_what_we_do__feature}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
