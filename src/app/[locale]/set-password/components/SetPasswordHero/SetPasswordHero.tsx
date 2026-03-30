'use client';

import { useTranslations } from 'next-intl';

import { AuthPageShell } from '@/features/account/ui/AuthPageShell/AuthPageShell';
import { SetPasswordForm } from '@/features/account/ui/SetPasswordForm/SetPasswordForm';

export const SetPasswordHero = ({ token }: { token: string }) => {
  const t = useTranslations('setPasswordPage');

  return (
    <AuthPageShell
      title={t('heroTitle', { fallback: 'Set New Password' })}
      subtitle={t('heroSubtitle', {
        fallback: 'Enter your new password and repeat it to confirm.',
      })}
    >
      <SetPasswordForm token={token} />
    </AuthPageShell>
  );
};
