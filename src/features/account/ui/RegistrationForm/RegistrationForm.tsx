'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import {
  type RegistrationSchema,
  registrationSchema,
} from '@/features/account/model/account-settings.schema';
import { useAuthStore } from '@/features/account/store/auth';
import { AuthFieldIcon } from '@/features/account/ui/AuthFieldIcon';
import styles from '@/features/account/ui/AuthForm.module.scss';

import { cn } from '@/shared/lib/helpers/styles';
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from '@/shared/ui/icons';

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
        <h2 className={styles.successTitle}>
          {t('successTitle', { fallback: 'Your account has been created successfully!' })}
        </h2>
        <p className={styles.successText}>
          {t('successMessage', { fallback: 'You can now log in with your email and password.' })}
        </p>
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => router.push('/log-in')}
        >
          <ArrowRightIcon />
          {t('goToLogin', { fallback: 'Go to Login' })}
        </button>
      </div>
    );
  }

  const firstNameError = errors.firstName?.message;
  const lastNameError = errors.lastName?.message;
  const usernameError = errors.username?.message;
  const emailError = errors.email?.message;
  const phoneError = errors.phone?.message;
  const passwordError = errors.password?.message;
  const repeatPasswordError = errors.repeatPassword?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formWrapper}>
        <div className={styles.fields}>
          <div className={cn(styles.field, firstNameError && styles.fieldError)}>
            <div className={styles.fieldHeader}>
              <AuthFieldIcon name="user" className={styles.fieldIcon} />
              <label htmlFor="firstName" className={styles.label}>
                {t('firstNameLabel', { fallback: 'First name' })}
              </label>
            </div>
            <div className={styles.inputRow}>
              <input
                id="firstName"
                type="text"
                {...registerField('firstName')}
                autoComplete="given-name"
                aria-invalid={Boolean(firstNameError)}
                placeholder={t('firstNamePlaceholderText', { fallback: 'Enter your first name' })}
                className={styles.input}
              />
            </div>
            {firstNameError && <p className={styles.errorText}>{firstNameError}</p>}
          </div>

          <div className={cn(styles.field, lastNameError && styles.fieldError)}>
            <div className={styles.fieldHeader}>
              <AuthFieldIcon name="id-card" className={styles.fieldIcon} />
              <label htmlFor="lastName" className={styles.label}>
                {t('lastNameLabel', { fallback: 'Last name' })}
              </label>
            </div>
            <div className={styles.inputRow}>
              <input
                id="lastName"
                type="text"
                {...registerField('lastName')}
                autoComplete="family-name"
                aria-invalid={Boolean(lastNameError)}
                placeholder={t('lastNamePlaceholderText', { fallback: 'Enter your last name' })}
                className={styles.input}
              />
            </div>
            {lastNameError && <p className={styles.errorText}>{lastNameError}</p>}
          </div>

          <div className={cn(styles.field, usernameError && styles.fieldError)}>
            <div className={styles.fieldHeader}>
              <AuthFieldIcon name="user-circle" className={styles.fieldIcon} />
              <label htmlFor="username" className={styles.label}>
                {t('usernameLabel', { fallback: 'Username' })}
              </label>
            </div>
            <div className={styles.inputRow}>
              <input
                id="username"
                type="text"
                {...registerField('username')}
                autoComplete="username"
                aria-invalid={Boolean(usernameError)}
                placeholder={t('usernamePlaceholderText', { fallback: 'Enter your username' })}
                className={styles.input}
              />
            </div>
            {usernameError && <p className={styles.errorText}>{usernameError}</p>}
          </div>

          <div className={cn(styles.field, emailError && styles.fieldError)}>
            <div className={styles.fieldHeader}>
              <AuthFieldIcon name="email" className={styles.fieldIcon} />
              <label htmlFor="email" className={styles.label}>
                {t('emailLabel', { fallback: 'Email' })}
              </label>
            </div>
            <div className={styles.inputRow}>
              <input
                id="email"
                type="email"
                {...registerField('email')}
                autoComplete="email"
                aria-invalid={Boolean(emailError)}
                placeholder={t('emailPlaceholderText', { fallback: 'Enter your email' })}
                className={styles.input}
              />
            </div>
            {emailError && <p className={styles.errorText}>{emailError}</p>}
          </div>

          <div className={cn(styles.field, phoneError && styles.fieldError)}>
            <div className={styles.fieldHeader}>
              <AuthFieldIcon name="phone" className={styles.fieldIcon} />
              <label htmlFor="phone" className={styles.label}>
                {t('phoneLabel', { fallback: 'Phone number' })}
              </label>
            </div>
            <div className={styles.inputRow}>
              <input
                id="phone"
                type="tel"
                {...registerField('phone')}
                autoComplete="tel"
                aria-invalid={Boolean(phoneError)}
                placeholder={t('phonePlaceholderText', { fallback: 'Enter your phone number' })}
                className={styles.input}
              />
            </div>
            {phoneError && <p className={styles.errorText}>{phoneError}</p>}
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
                {...registerField('password')}
                autoComplete="new-password"
                aria-invalid={Boolean(passwordError)}
                placeholder={t('passwordPlaceholderText', { fallback: 'Enter your password' })}
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

          <div className={cn(styles.field, repeatPasswordError && styles.fieldError)}>
            <div className={styles.fieldHeader}>
              <AuthFieldIcon name="key" className={styles.fieldIcon} />
              <label htmlFor="repeatPassword" className={styles.label}>
                {t('repeatPasswordLabel', { fallback: 'Repeat password' })}
              </label>
            </div>
            <div className={styles.inputRow}>
              <input
                id="repeatPassword"
                type={showRepeatPassword ? 'text' : 'password'}
                {...registerField('repeatPassword')}
                autoComplete="new-password"
                aria-invalid={Boolean(repeatPasswordError)}
                placeholder={t('repeatPasswordPlaceholderText', {
                  fallback: 'Repeat your password',
                })}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setRepeatShowPassword(!showRepeatPassword)}
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

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              {...registerField('agreement')}
            />
            <span className={styles.checkboxBox}></span>
            <span className={cn(styles.checkboxText, styles.checkboxTextCompact)}>
              {t('agreementPartOne', {
                fallback:
                  'By registering, you confirm that you are at least 18 years old and agree to our',
              })}{' '}
              <Link href="/legal/terms-of-use">
                {t('agreementBoldOne', {
                  fallback: 'Terms and Conditions',
                })}
              </Link>{' '}
              {t('agreementPartTwo', {
                fallback: 'and',
              })}{' '}
              <Link href="/legal/privacy-policy">
                {t('agreementBoldTwo', {
                  fallback: 'Privacy Policy.',
                })}
              </Link>
            </span>
          </label>
          {errors.agreement && <p className={styles.errorText}>{errors.agreement.message}</p>}
        </div>

        {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          <ArrowRightIcon />
          {isLoading
            ? t('registering', { fallback: 'Registering...' })
            : t('register', { fallback: 'Join Now' })}
        </button>
      </div>
    </form>
  );
};
