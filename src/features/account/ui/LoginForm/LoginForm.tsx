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

import { Link, useRouter } from '@/i18n/navigation';

const loginSchema = z.object({
  email: z.string().min(1, 'Please enter username or email'),
  password: z.string().min(1, 'Password is required'),
  keepSigned: z.boolean(),
});

type LoginFormSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const t = useTranslations('account');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', keepSigned: false },
  });

  const onSubmit = async (data: LoginFormSchema) => {
    const result = await login(data.email, data.password, data.keepSigned);

    if (result.ok) {
      router.push('/account');
      return;
    }

    setError('email', {
      message:
        result.message ??
        t('identifierError', { fallback: 'Oops! That email doesn’t match our records.' }),
    });
  };

  const identifierError = errors.email?.message;
  const passwordError = errors.password?.message;

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
                  fallback: 'Enter your username or email',
                })}
                className={styles.input}
              />
            </div>

            {identifierError && <p className={styles.errorText}>{identifierError}</p>}
          </div>

          <div className={cn(styles.field, passwordError && styles.fieldError)}>
            <div className={styles.fieldHeader}>
              <AuthFieldIcon name="key" className={styles.fieldIcon} />
              <label htmlFor="password" className={styles.label}>
                {t('passwordLabel', { fallback: 'Password' })}
              </label>
            </div>

            <div className={styles.inputRow}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                autoComplete="current-password"
                aria-invalid={Boolean(passwordError)}
                placeholder={t('passwordPlaceholder', { fallback: 'Enter your password' })}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? t('hidePassword', { fallback: 'Hide password' })
                    : t('showPassword', { fallback: 'Show password' })
                }
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {passwordError && <p className={styles.errorText}>{passwordError}</p>}
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkboxInput} {...register('keepSigned')} />
            <span className={styles.checkboxBox}></span>
            <span className={styles.checkboxText}>
              {t('keepSigned', {
                fallback: 'Keep me signed in on this device',
              })}
            </span>
          </label>
        </div>

        {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          <ArrowRightIcon />
          {isLoading
            ? t('loggingIn', { fallback: 'Logging in...' })
            : t('login', { fallback: 'Log in' })}
        </button>

        <Link href="/forgot-password" className={styles.secondaryLink}>
          {t('forgotPasswordLink', { fallback: 'Forgot Password?' })}
        </Link>
      </div>
    </form>
  );
};
