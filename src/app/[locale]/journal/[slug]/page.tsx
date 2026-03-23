import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getArticle } from "@/features/articles/api/get-articles";

import { JournalArticlePage } from "./components";

type PageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

const FALLBACK_HERO_IMAGE = "/images/journal/article-hero-fallback.png";

const resolveArticleImage = (
  imageUrl?: string,
  serverUrl?: string,
) => {
  if (!imageUrl) {
    return FALLBACK_HERO_IMAGE;
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (serverUrl) {
    return `${serverUrl}${imageUrl}`;
  }

  return FALLBACK_HERO_IMAGE;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticle({ slug, locale });

  if (!article) {
    return {
      title: "Journal | Travellio Global",
      description:
        "Explore travel stories, local insights, and curated inspiration from Travellio Global.",
    };
  }

  const heroImage = resolveArticleImage(
    article?.image?.url,
    process.env.SERVER_URL,
  );

  return {
    title: article.title,
    description: article.seo_description,
    openGraph: {
      title: article.title,
      description: article.seo_description,
      images: heroImage ? [heroImage] : undefined,
    },
  };
}

export default async function JournalArticleRoute({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = await getArticle({ slug, locale });

  if (!article) {
    notFound();
  }

  const t = await getTranslations("journalPage");

  return (
    <JournalArticlePage
      title={article.title}
      heroImage={resolveArticleImage(article?.image?.url, process.env.SERVER_URL)}
      introNodes={article.info?.root?.children ?? []}
      contentNodes={article.content?.root?.children ?? []}
      contentsLabel={t("articleContents", { fallback: "Article contents" })}
    />
  );
}
