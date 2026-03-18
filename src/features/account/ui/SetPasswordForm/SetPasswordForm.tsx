'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthStore } from '@/features/account/store/auth';
import styles from '@/features/account/ui/LoginForm/LoginForm.module.scss';

import { EyeIcon, EyeOffIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import { useRouter } from '@/i18n/navigation';

const setPasswordSchema = z
  .object({
    newPassword: z.string().min(1, 'New password is required'),
    repeatNewPassword: z.string().min(1, 'Please repeat your new password'),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    path: ['repeatNewPassword'],
    message: 'Passwords do not match.',
  });

type SetPasswordFormSchema = z.infer<typeof setPasswordSchema>;

export const SetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const resetPassword = useAuthStore((s) => s.resetPassword);
  const isLoading = useAuthStore((s) => s.isLoading);
  const t = useTranslations('setPasswordPage');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SetPasswordFormSchema>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: { newPassword: '', repeatNewPassword: '' },
  });

  const onSubmit = async (data: SetPasswordFormSchema) => {
    const result = await resetPassword(token, data.newPassword);

    if (result.ok) {
      router.push('/set-password/success');
      return;
    }

    setError('root', { message: result.message ?? 'Reset password failed.' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('title', { fallback: 'Set New Password' })}</h1>
        <p className={styles.text}>
          {t('subtitle', {
            fallback: 'Enter your new password and repeat it to confirm.',
          })}
        </p>
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.formGroup}>
          <label htmlFor="newPassword">{t('newPassword', { fallback: 'NEW PASSWORD' })}</label>
          <div className={styles.passwordWrapper}>
            <input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              {...register('newPassword')}
              autoComplete="new-password"
              placeholder={t('newPasswordPlaceholder', { fallback: 'Enter new password' })}
              className={errors.newPassword ? styles.errorInput : ''}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowNewPassword((prev) => !prev)}
              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
            >
              {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.newPassword && <span className={styles.error}>{errors.newPassword.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="repeatNewPassword">
            {t('repeatNewPassword', { fallback: 'REPEAT NEW PASSWORD' })}
          </label>
          <div className={styles.passwordWrapper}>
            <input
              id="repeatNewPassword"
              type={showRepeatPassword ? 'text' : 'password'}
              {...register('repeatNewPassword')}
              autoComplete="new-password"
              placeholder={t('repeatNewPasswordPlaceholder', { fallback: 'Repeat new password' })}
              className={errors.repeatNewPassword ? styles.errorInput : ''}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowRepeatPassword((prev) => !prev)}
              aria-label={showRepeatPassword ? 'Hide password' : 'Show password'}
            >
              {showRepeatPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.repeatNewPassword && (
            <span className={styles.error}>{errors.repeatNewPassword.message}</span>
          )}
        </div>

        {errors.root && <span className={styles.rootError}>{errors.root.message}</span>}

        <Button type="submit" variant="blue" disabled={isLoading}>
          {isLoading
            ? t('savingPassword', { fallback: 'Saving password...' })
            : t('savePassword', { fallback: 'Save Password' })}
        </Button>
      </div>
    </form>
  );
};
