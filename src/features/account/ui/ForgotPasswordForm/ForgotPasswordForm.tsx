'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthStore } from '@/features/account/store/auth';
import { AuthFieldIcon } from '@/features/account/ui/AuthFieldIcon';
import styles from '@/features/account/ui/AuthForm.module.scss';

import { cn } from '@/shared/lib/helpers/styles';
import { ArrowRightIcon } from '@/shared/ui/icons';

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
      return;
    }

    setError('email', {
      message:
        result.message ??
        t('identifierError', { fallback: 'Oops! That email doesn’t match our records.' }),
    });
  };

  const identifierError = errors.email?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formWrapper}>
        <div className={styles.fields}>
          <div className={cn(styles.field, identifierError && styles.fieldError)}>
            <div className={styles.fieldHeader}>
              <AuthFieldIcon name="user" className={styles.fieldIcon} />
              <label htmlFor="email" className={styles.label}>
                {t('identifierLabel', { fallback: 'Username or email' })}
              </label>
            </div>

            <div className={styles.inputRow}>
              <input
                id="email"
                type="text"
                {...register('email')}
                autoComplete="username"
                aria-invalid={Boolean(identifierError)}
                placeholder={t('identifierPlaceholder', {
                  fallback: 'Enter your username or email address',
                })}
                className={styles.input}
              />
            </div>

            {identifierError && <p className={styles.errorText}>{identifierError}</p>}
          </div>
        </div>

        {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          <ArrowRightIcon />
          {isLoading
            ? t('resettingPassword', { fallback: 'Resetting password...' })
            : t('resetPassword', { fallback: 'Reset Password' })}
        </button>
      </div>
    </form>
  );
};
