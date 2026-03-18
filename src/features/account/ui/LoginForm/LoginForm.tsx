'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthStore } from '@/features/account/store/auth';

import { EyeIcon, EyeOffIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './LoginForm.module.scss';

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
    } else {
      setError('root', { message: result.message ?? 'Login failed.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('title', { fallback: 'Welcome Back to Axelvior' })}</h1>
        <p className={styles.text}>
          {t('subtitle', {
            fallback:
              'Enter your credentials to log in. If you’ve forgotten your password, click “Forgot Password?” for assistance.',
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
            placeholder={t('placeHolderEmail', { fallback: 'Enter your username' })}
            className={errors.email ? styles.errorInput : ''}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">{t('password', { fallback: 'PASSWORD' })}</label>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              autoComplete="current-password"
              placeholder={t('placeHolderPassword', { fallback: 'Enter your password' })}
              className={errors.password ? styles.errorInput : ''}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className="custom_checkbox_label">
            <input type="checkbox" className="custom_checkbox_input" {...register('keepSigned')} />
            <span className="custom_checkbox_element"></span>
            <span className="custom_checkbox_label_title">
              {t('keepSigned', {
                fallback: 'Keep me signed in on this device',
              })}
            </span>
          </label>
        </div>
        {errors.root && <span className={styles.rootError}>{errors.root.message}</span>}
        <Button type="submit" variant="blue" disabled={isLoading}>
          {isLoading
            ? t('loggingIn', { fallback: 'Logging in...' })
            : t('login', { fallback: 'Log in' })}
        </Button>

        <Link href="/forgot-password" className={styles.signupLink}>
          {t('signupLink', { fallback: 'Forgot Password?' })}
        </Link>
      </div>
    </form>
  );
};
