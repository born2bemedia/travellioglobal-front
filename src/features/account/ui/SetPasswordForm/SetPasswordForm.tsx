'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthStore } from '@/features/account/store/auth';
import { AuthFieldIcon } from '@/features/account/ui/AuthFieldIcon';
import styles from '@/features/account/ui/AuthForm.module.scss';

import { cn } from '@/shared/lib/helpers/styles';
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from '@/shared/ui/icons';

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

  const newPasswordError = errors.newPassword?.message;
  const repeatPasswordError = errors.repeatNewPassword?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formWrapper}>
        <div className={styles.fields}>
          <div className={cn(styles.field, newPasswordError && styles.fieldError)}>
            <div className={styles.fieldHeader}>
              <AuthFieldIcon name="key" className={styles.fieldIcon} />
              <label htmlFor="newPassword" className={styles.label}>
                {t('newPasswordLabel', { fallback: 'New password' })}
              </label>
            </div>
            <div className={styles.inputRow}>
              <input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                {...register('newPassword')}
                autoComplete="new-password"
                aria-invalid={Boolean(newPasswordError)}
                placeholder={t('newPasswordPlaceholderText', {
                  fallback: 'Enter new password',
                })}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowNewPassword((prev) => !prev)}
                aria-label={
                  showNewPassword
                    ? t('hidePassword', { fallback: 'Hide password' })
                    : t('showPassword', { fallback: 'Show password' })
                }
              >
                {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {newPasswordError && <p className={styles.errorText}>{newPasswordError}</p>}
          </div>

          <div className={cn(styles.field, repeatPasswordError && styles.fieldError)}>
            <div className={styles.fieldHeader}>
              <AuthFieldIcon name="key" className={styles.fieldIcon} />
              <label htmlFor="repeatNewPassword" className={styles.label}>
                {t('repeatNewPasswordLabel', { fallback: 'Repeat new password' })}
              </label>
            </div>
            <div className={styles.inputRow}>
              <input
                id="repeatNewPassword"
                type={showRepeatPassword ? 'text' : 'password'}
                {...register('repeatNewPassword')}
                autoComplete="new-password"
                aria-invalid={Boolean(repeatPasswordError)}
                placeholder={t('repeatNewPasswordPlaceholderText', {
                  fallback: 'Repeat new password',
                })}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowRepeatPassword((prev) => !prev)}
                aria-label={
                  showRepeatPassword
                    ? t('hidePassword', { fallback: 'Hide password' })
                    : t('showPassword', { fallback: 'Show password' })
                }
              >
                {showRepeatPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {repeatPasswordError && <p className={styles.errorText}>{repeatPasswordError}</p>}
          </div>
        </div>

        {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          <ArrowRightIcon />
          {isLoading
            ? t('savingPassword', { fallback: 'Saving password...' })
            : t('savePassword', { fallback: 'Save Password' })}
        </button>
      </div>
    </form>
  );
};
