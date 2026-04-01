"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { getArticles } from "@/features/articles/api/get-articles";
import type { Article } from "@/features/articles/model/types";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./JournalCards.module.scss";

import { Link } from "@/i18n/navigation";

export const JournalCards = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("journalPage");
  const locale = useLocale();
  const isMountedRef = useRef(true);

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const fetchArticles = useCallback(async () => {
    if (!isMountedRef.current) return;

    setLoading(true);
    try {
      const fetchedArticles = await getArticles({ locale });
      if (isMountedRef.current) {
        setArticles(fetchedArticles);
        setLoading(false);
      }
    } catch (error) {
      if (isMountedRef.current) {
        setLoading(false);
      }
      console.error("Error fetching articles:", error);
    }
  }, [locale]);

  useEffect(() => {
    isMountedRef.current = true;
    queueMicrotask(() => {
      void fetchArticles();
    });

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchArticles]);

  return (
    <section className={styles.cards}>
      <div className="container">
        <motion.div
          className={styles.cards__grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={styles.cards__skeleton} />
              ))
            : articles.length > 0
              ? articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/journal/${article.slug}`}
                    className={styles.cards__card}
                  >
                    <Image
                      src={`${SERVER_URL}${article.image?.url}`}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 307px"
                      className={styles.cards__cardImage}
                    />
                    <div className={styles.cards__cardOverlay} />

                    <div className={styles.cards__cardArrow}>
                      <Image
                        src="/images/journal/arrow-right.svg"
                        alt=""
                        width={24}
                        height={24}
                      />
                    </div>

                    <div className={styles.cards__cardContent}>
                      <h3 className={styles.cards__cardTitle}>
                        {article.short_title}
                      </h3>
                      <p className={styles.cards__cardSubtitle}>
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                ))
              : (
                <div className={styles.cards__empty}>
                  <p>{t("noArticles", { fallback: "No articles found" })}</p>
                </div>
              )}
        </motion.div>
      </div>
    </section>
  );
};
