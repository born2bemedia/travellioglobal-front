'use client';

import { useTranslations } from 'next-intl';

import { AuthPageShell } from '@/features/account/ui/AuthPageShell/AuthPageShell';
import { ForgotPasswordForm } from '@/features/account/ui/ForgotPasswordForm/ForgotPasswordForm';

export const ForgotPasswordHero = () => {
  const t = useTranslations('forgotPasswordPage');

  return (
    <AuthPageShell
      title={t('heroTitle', { fallback: 'Forgot Password?' })}
      subtitle={t('heroSubtitle', {
        fallback:
          'Enter your username or email address, and we’ll send you a secure link to set a new password.',
      })}
    >
      <ForgotPasswordForm />
    </AuthPageShell>
  );
};
