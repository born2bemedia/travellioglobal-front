import type { CSSProperties } from "react";

import type { Children } from "@/features/articles/model/types";

import { JournalArticleBody } from "../JournalArticleBody";
import styles from "./JournalArticlePage.module.scss";

type JournalArticlePageProps = {
  title: string;
  heroImage: string;
  introNodes: Children[];
  contentNodes: Children[];
  contentsLabel: string;
};

export const JournalArticlePage = ({
  title,
  heroImage,
  introNodes,
  contentNodes,
  contentsLabel,
}: JournalArticlePageProps) => {
  return (
    <main className={styles.page}>
      <section
        className={styles.hero}
        style={
          {
            "--journal-hero-image": `url("${heroImage}")`,
          } as CSSProperties
        }
      >
        <div className="container">
          <div className={styles.hero__inner}>
            <h1 className={styles.hero__title}>{title}</h1>
          </div>
        </div>
      </section>

      <section className={styles.surface}>
        <div className="container">
          <JournalArticleBody
            introNodes={introNodes}
            contentNodes={contentNodes}
            contentsLabel={contentsLabel}
          />
        </div>
      </section>
    </main>
  );
};
