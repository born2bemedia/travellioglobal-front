import { redirect } from 'next/navigation';

import { SetPasswordHero } from './components';

export default async function SetPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { locale } = await params;
  const awaitedSearchParams = await searchParams;
  const tokenParam = awaitedSearchParams.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

  if (!token) {
    redirect(`/${locale}/forgot-password`);
  }

  return <SetPasswordHero token={token} />;
}
