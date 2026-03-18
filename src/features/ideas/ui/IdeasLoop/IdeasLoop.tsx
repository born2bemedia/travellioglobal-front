'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

import { getIdeas } from '@/features/ideas/api/get-ideas';
import { Idea } from '@/features/ideas/model/types';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './IdeasLoop.module.scss';

export const IdeasLoop = ({ title }: { title?: string }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('ideasLoop');
  const locale = useLocale();
  const isMountedRef = useRef(true);

  const fetchIdeas = useCallback(async () => {
    if (!isMountedRef.current) return;

    setLoading(true);
    try {
      const fetchedIdeas = await getIdeas({ locale: locale });
      if (isMountedRef.current) {
        console.log(fetchedIdeas[0].image.url);
        setIdeas(fetchedIdeas);
        setLoading(false);
      }
    } catch (error) {
      if (isMountedRef.current) {
        setLoading(false);
      }
      console.error('Error fetching ideas:', error);
    }
  }, [locale]);

  useEffect(() => {
    isMountedRef.current = true;
    queueMicrotask(() => {
      void fetchIdeas();
    });

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchIdeas]);

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  return (
    <section className={styles.ideas_loop}>
      <div className={'container'}>
        <div className={styles.ideas_loop__content}>
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={styles.ideas_loop__skeleton_item} />
            ))
          ) : ideas.length > 0 ? (
            ideas.map((idea) => (
              <motion.div
                key={idea.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={styles.ideas_loop__item}
              >
                <div
                  className={styles.ideas_loop__image}
                  style={{
                    backgroundImage: `url(${SERVER_URL}${idea?.image?.url || ''})`,
                  }}
                >
                  <Image
                    src={SERVER_URL + idea?.image?.url || `/images/articles/${idea.slug}.png`}
                    alt={idea.title}
                    width={760}
                    height={400}
                  />
                </div>
                <div className={styles.ideas_loop__details}>
                  <h3>{idea.title}</h3>
                  <p>{idea.excerpt}</p>
                  <Button variant="black" url={`/ideas/${idea.slug}`} type="link">
                    {t('button', { fallback: 'Read Article' })}
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className={styles.ideas_loop__empty}>
              <p>{t('empty', { fallback: 'No guides found' })}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
