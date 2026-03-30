'use client';

import { useTranslations } from 'next-intl';

import { AuthPageShell } from '@/features/account/ui/AuthPageShell/AuthPageShell';
import { LoginForm } from '@/features/account/ui/LoginForm/LoginForm';

export const LogInHero = () => {
  const t = useTranslations('account');

  return (
    <AuthPageShell
      title={t('heroTitle', { fallback: 'Welcome Back to Travellio Global' })}
      subtitle={t('heroSubtitle', {
        fallback:
          'Enter your login details to access your account. If you can’t remember your password, select “Forgot Password?” and we’ll help you reset it.',
      })}
    >
      <LoginForm />
    </AuthPageShell>
  );
};
