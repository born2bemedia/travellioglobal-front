import React from 'react';
import Link from 'next/link';

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getIdea } from '@/features/ideas/api/get-ideas';
import { IdeaArticle } from '@/features/ideas/ui/article/IdeaArticle';
import { InfoRenderer } from '@/features/ideas/ui/renderer/InfoRenderer';

import { IdeasCta } from '../components/IdeasCta/IdeasCta';
import st from './page.module.scss';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const idea = await getIdea({ slug: slug, locale });
  return {
    title: idea.title,
    description: idea.seo_description,
    openGraph: {
      title: idea.title,
      description: idea.seo_description,
      images: '',
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const t = await getTranslations('common');
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const idea = await getIdea({ slug: slug, locale });
  console.log(idea.content.root.children);

  const SERVER_URL = process.env.SERVER_URL;

  return (
    <>
      <section className={st.postTitle}>
        <div className="container">
          <div className={st.postTitle__content}>
            <Link href="/ideas">{t('back-to-ideas', { fallback: 'Back' })}</Link>
            <h1>{idea.title}</h1>
            <div className={st.postTitle__info}>
              <InfoRenderer content={idea.info.root.children} />
            </div>
          </div>
        </div>
      </section>
      {idea.content && (
        <section className={st.postContent}>
          <div className="container">
            <IdeaArticle content={idea.content.root.children} />
          </div>
        </section>
      )}
      <IdeasCta slug={slug} />
    </>
  );
}
