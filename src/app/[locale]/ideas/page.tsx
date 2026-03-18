import type { Metadata } from 'next';

import { IdeasHero, IdeasLoop } from './components';

export const metadata: Metadata = {
  title: 'Ideas | Axelvior Business Insights & Articles',
  description:
    'Axelvior shares expert insights, strategies, and thought leadership on business development, focus, scalability, and entrepreneurship. Read our latest articles and empower your business.',
  openGraph: {
    title: 'Ideas | Axelvior Business Insights & Articles',
    description:
      'Axelvior shares expert insights, strategies, and thought leadership on business development, focus, scalability, and entrepreneurship. Read our latest articles and empower your business.',
    images: 'https://travellioglobal.com/images/meta.png',
  },
};

export default async function Home() {
  return (
    <>
      <IdeasHero />
      <IdeasLoop />
    </>
  );
}
