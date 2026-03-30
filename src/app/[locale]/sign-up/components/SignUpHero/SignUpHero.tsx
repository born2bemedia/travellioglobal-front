'use client';

import { useTranslations } from 'next-intl';

import { RegistrationForm } from '@/features/account';
import { AuthPageShell } from '@/features/account/ui/AuthPageShell/AuthPageShell';

export const SignUpHero = () => {
  const t = useTranslations('SignUpHero');

  return (
    <AuthPageShell
      title={t('heroTitle', { fallback: 'Become Part of Travellio Global' })}
      subtitle={t('heroSubtitle', {
        fallback:
          'Create an account to manage your bookings and access exclusive travel benefits. Join Travellio Global and start planning smarter journeys today.',
      })}
    >
      <RegistrationForm />
    </AuthPageShell>
  );
};
