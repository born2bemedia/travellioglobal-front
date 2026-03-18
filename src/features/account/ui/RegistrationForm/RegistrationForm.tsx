'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import {
  type RegistrationSchema,
  registrationSchema,
} from '@/features/account/model/account-settings.schema';
import { useAuthStore } from '@/features/account/store/auth';

import { EyeIcon, EyeOffIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './RegistrationForm.module.scss';

import { Link, useRouter } from '@/i18n/navigation';

export const RegistrationForm = () => {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.isLoading);
  const t = useTranslations('registration');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setRepeatShowPassword] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      repeatPassword: '',
      agreement: false,
    },
  });

  const onSubmit = async (data: RegistrationSchema) => {
    const result = await register(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.username || '',
      data.phone,
      data.agreement
    );
    if (result.ok) {
      setIsSuccess(true);
    } else {
      if (result.message?.toLowerCase().includes('email')) {
        setError('email', { message: result.message });
      } else {
        setError('root', { message: result.message ?? 'Registration failed.' });
      }
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.successMessage}>
        <h2>{t('successTitle', { fallback: 'Your account has been created successfully!' })}</h2>
        <p>
          {t('successMessage', { fallback: 'You can now log in with your email and password.' })}
        </p>
        <Button type="button" variant="white" onClick={() => router.push('/log-in')}>
          {t('goToLogin', { fallback: 'Go to Login' })}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formWrapper}>
        {/* ── First name ───────────────────────── */}
        <div className={styles.formGroup}>
          <label htmlFor="firstName">
            {t('firstName', { fallback: 'FIRST NAME' })} <span className={styles.required}>*</span>
          </label>
          <input
            id="firstName"
            type="text"
            {...registerField('firstName')}
            autoComplete="given-name"
            placeholder={t('firstNamePlaceholder', { fallback: 'Enter your name' })}
            className={errors.firstName ? styles.errorInput : ''}
          />
          {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
        </div>

        {/* ── Last name ───────────────────────── */}
        <div className={styles.formGroup}>
          <label htmlFor="lastName">
            {t('lastName', { fallback: 'LAST NAME' })} <span className={styles.required}>*</span>
          </label>
          <input
            id="lastName"
            type="text"
            {...registerField('lastName')}
            autoComplete="family-name"
            placeholder={t('lastNamePlaceholder', { fallback: 'Enter your last name' })}
            className={errors.lastName ? styles.errorInput : ''}
          />
          {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
        </div>

        {/* ── User name ───────────────────────── */}
        <div className={styles.formGroup}>
          <label htmlFor="username">{t('username', { fallback: 'USERNAME' })}</label>
          <input
            id="username"
            type="text"
            {...registerField('username')}
            autoComplete="family-name"
            placeholder={t('usernamePlaceholder', { fallback: 'Enter your username' })}
            className={errors.lastName ? styles.errorInput : ''}
          />
          {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        </div>

        {/* ── Email ───────────────────────── */}
        <div className={styles.formGroup}>
          <label htmlFor="email">
            {t('email', { fallback: 'EMAIL' })} <span className={styles.required}>*</span>
          </label>
          <input
            id="email"
            type="email"
            {...registerField('email')}
            autoComplete="email"
            placeholder={t('emailPlaceholder', { fallback: 'Enter your email' })}
            className={errors.email ? styles.errorInput : ''}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        {/* ── Phone ───────────────────────── */}
        <div className={styles.formGroup}>
          <label htmlFor="phone">
            {t('phone', { fallback: 'PHONE NUMBER' })} <span className={styles.required}>*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...registerField('phone')}
            placeholder="+1 23456789"
            className={errors.phone ? styles.errorInput : ''}
          />
          {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
        </div>

        {/* ── Password ───────────────────────── */}
        <div className={styles.formGroup}>
          <label htmlFor="password">
            {t('password', { fallback: 'PASSWORD' })} <span className={styles.required}>*</span>
          </label>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...registerField('password')}
              autoComplete="new-password"
              placeholder={t('passwordPlaceholder', { fallback: 'Enter your password' })}
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

        {/* ── Repeat Password ───────────────────────── */}
        <div className={styles.formGroup}>
          <label htmlFor="repeatPassword">
            {t('repeatPassword', { fallback: 'REPEAT PASSWORD' })}{' '}
            <span className={styles.required}>*</span>
          </label>
          <div className={styles.passwordWrapper}>
            <input
              id="repeatPassword"
              type={showRepeatPassword ? 'text' : 'password'}
              {...registerField('repeatPassword')}
              placeholder={t('repeatPasswordPlaceholder', { fallback: 'Repeat your password' })}
              className={errors.repeatPassword ? styles.errorInput : ''}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setRepeatShowPassword(!showRepeatPassword)}
              aria-label={showRepeatPassword ? 'Hide password' : 'Show password'}
            >
              {showRepeatPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.repeatPassword && (
            <span className={styles.error}>{errors.repeatPassword.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className="custom_checkbox_label">
            <input
              type="checkbox"
              className="custom_checkbox_input"
              {...registerField('agreement')}
            />
            <span className="custom_checkbox_element"></span>
            <span className="custom_checkbox_label_title">
              {t('agreementPartOne', {
                fallback:
                  'By signing up, you confirm that you are over 18 years old and agree to our',
              })}{' '}
              <Link href={'/legal/terms-of-use'}>
                {t('agreementBoldOne', {
                  fallback: 'Terms of Use',
                })}
              </Link>{' '}
              {t('agreementPartTwo', {
                fallback: 'and',
              })}{' '}
              <Link href={'/legal/privacy-policy'}>
                {t('agreementBoldTwo', {
                  fallback: 'Privacy Policy.',
                })}
              </Link>
            </span>
          </label>
          {errors.agreement && <div className={styles.error}>{errors.agreement.message}</div>}
        </div>

        {errors.root && <span className={styles.rootError}>{errors.root.message}</span>}
        <Button type="submit" variant="blue" disabled={isLoading}>
          {isLoading
            ? t('registering', { fallback: 'Registering...' })
            : t('register', { fallback: 'Join Now' })}
        </Button>
      </div>
    </form>
  );
};
