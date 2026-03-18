import type { Metadata } from 'next';

import { getPolicy } from '@/features/policies/api/get-policy';
import { PolicyArticle } from '@/features/policies/ui/article/PolicyArticle';

import st from './page.module.scss';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const policy = await getPolicy({ slug, locale });
  const pageTitle = policy.title;
  return {
    title: pageTitle,
    description: policy.seo_description,
    openGraph: {
      title: pageTitle,
      description: policy.seo_description,
      images: '',
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const policy = await getPolicy({ slug, locale });

  return (
    <>
      <section className={st.postTitle}>
        <div className="container">
          <div className={st.postTitle__content}>
            <h1>{policy.title}</h1>
          </div>
        </div>
      </section>
      {policy.content && (
        <section className={st.postContent}>
          <div className="container">
            <PolicyArticle content={policy.content.root.children} />
          </div>
        </section>
      )}
    </>
  );
}
