'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthStore } from '@/features/account/store/auth';

import { Button } from '@/shared/ui/kit/button/Button';

import styles from './ForgotPasswordForm.module.scss';

import { useRouter } from '@/i18n/navigation';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Please enter username or email'),
});

type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const forgotPassword = useAuthStore((s) => s.forgotPassword);
  const isLoading = useAuthStore((s) => s.isLoading);
  const t = useTranslations('forgotPasswordPage');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormSchema) => {
    const result = await forgotPassword(data.email);
    if (result.ok) {
      router.push('/forgot-password/success');
    } else {
      setError('root', {
        message: result.message ?? 'Forgot password failed.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('title', { fallback: 'Forgot Password?' })}</h1>
        <p className={styles.text}>
          {t('subtitle', {
            fallback: 'Enter your email to reset your password.',
          })}
        </p>
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.formGroup}>
          <label htmlFor="email">{t('email', { fallback: 'USERNAME OR EMAIL' })} </label>
          <input
            id="email"
            type="text"
            {...register('email')}
            autoComplete="email"
            placeholder={t('placeHolderEmail', {
              fallback: 'Enter your username',
            })}
            className={errors.email ? styles.errorInput : ''}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        {errors.root && <span className={styles.rootError}>{errors.root.message}</span>}
        <Button type="submit" variant="blue" disabled={isLoading}>
          {isLoading
            ? t('resettingPassword', { fallback: 'Resetting password...' })
            : t('resetPassword', { fallback: 'Reset Password' })}
        </Button>
      </div>
    </form>
  );
};
