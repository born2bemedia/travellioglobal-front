'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import PhoneInput from 'react-phone-input-2';
import Select, { type StylesConfig } from 'react-select';
import { Controller, useForm } from 'react-hook-form';

import type { AuthUser } from '@/features/account/model/auth.types';
import { useAuthStore } from '@/features/account/store/auth';
import { formCountries } from '@/features/forms/lib/countries';

import { excludedCountries } from '@/shared/lib/countries';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right';

import styles from './AccountPage.module.scss';
import 'react-phone-input-2/lib/style.css';

type AccountProfilePanelProps = {
  user: AuthUser;
};

type AccountProfileValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  zip: string;
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const WRONG_PASSWORD_MESSAGE = 'The wrong password. Try again.';
type CountryOption = (typeof formCountries)[number];

type AccountFieldProps = {
  id: keyof AccountProfileValues;
  label: string;
  placeholder: string;
  registerReturn: ReturnType<ReturnType<typeof useForm<AccountProfileValues>>['register']>;
  error?: string;
  type?: 'email' | 'password' | 'tel' | 'text';
  hint?: string;
};

const AccountField = ({
  id,
  label,
  placeholder,
  registerReturn,
  error,
  type = 'text',
  hint,
}: AccountFieldProps) => {
  const inputClassName = error ? `${styles.fieldInput} ${styles.fieldInputError}` : styles.fieldInput;

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.fieldLabel}>
        {hint ? (
          <span>
            {label} <span className={styles.fieldHint}>({hint})</span>
          </span>
        ) : (
          <span>{label}</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputClassName}
        {...registerReturn}
      />
      {error ? <p className={styles.fieldError}>{error}</p> : null}
    </div>
  );
};

const getCountryOption = (value: string) =>
  formCountries.find(
    (option) =>
      option.label.toLowerCase() === value.toLowerCase() ||
      option.value.toLowerCase() === value.toLowerCase(),
  ) ?? null;

const getCountrySelectStyles = (
  hasError: boolean,
): StylesConfig<CountryOption, false> => ({
  container: (base) => ({
    ...base,
    width: '100%',
  }),
  control: (base) => ({
    ...base,
    minHeight: '20px',
    border: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:hover': {
      border: 0,
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: hasError ? '#cc3e0d' : '#000',
    fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
    fontSize: '16px',
    lineHeight: 'normal',
  }),
  placeholder: (base) => ({
    ...base,
    margin: 0,
    color: 'rgba(64, 61, 56, 0.5)',
    fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
    fontSize: '16px',
    lineHeight: 'normal',
  }),
  singleValue: (base) => ({
    ...base,
    margin: 0,
    color: hasError ? '#cc3e0d' : '#000',
    fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
    fontSize: '16px',
    lineHeight: 'normal',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 0,
    color: '#403d38',
    '&:hover': {
      color: '#403d38',
    },
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  menu: (base) => ({
    ...base,
    marginTop: 8,
    border: '1px solid rgba(64, 61, 56, 0.15)',
    borderRadius: 16,
    backgroundColor: '#fffdf1',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',
  }),
  menuList: (base) => ({
    ...base,
    padding: 8,
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: 10,
    backgroundColor: state.isSelected
      ? 'rgba(235, 94, 40, 0.14)'
      : state.isFocused
        ? 'rgba(235, 94, 40, 0.08)'
        : 'transparent',
    color: '#000',
    fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
    fontSize: '16px',
    lineHeight: 'normal',
    cursor: 'pointer',
  }),
});

export const AccountProfilePanel = ({ user }: AccountProfilePanelProps) => {
  const t = useTranslations('accountPage');
  const setUser = useAuthStore((state) => state.setUser);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const form = useForm<AccountProfileValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      zip: '',
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
  });

  useEffect(() => {
    form.reset({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      email: user.email ?? '',
      phone: user.phone ?? '',
      address1: user.address1 ?? '',
      address2: user.address2 ?? '',
      city: user.city ?? '',
      country: user.country ?? '',
      zip: user.zip ?? '',
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    });
  }, [form, user]);

  const onSubmit = async (data: AccountProfileValues) => {
    setMessage(null);
    form.clearErrors(['currentPassword', 'newPassword', 'repeatNewPassword']);

    const hasPasswordInput = [
      data.currentPassword.trim(),
      data.newPassword.trim(),
      data.repeatNewPassword.trim(),
    ].some(Boolean);

    let hasPasswordError = false;

    if (hasPasswordInput) {
      if (!data.currentPassword.trim()) {
        form.setError('currentPassword', {
          message: t('account.validation.currentPassword', {
            fallback: 'Current password is required.',
          }),
        });
        hasPasswordError = true;
      }

      if (!data.newPassword.trim()) {
        form.setError('newPassword', {
          message: t('account.validation.newPassword', {
            fallback: 'New password is required.',
          }),
        });
        hasPasswordError = true;
      }

      if (!data.repeatNewPassword.trim()) {
        form.setError('repeatNewPassword', {
          message: t('account.validation.repeatNewPassword', {
            fallback: 'Please confirm your new password.',
          }),
        });
        hasPasswordError = true;
      } else if (data.newPassword !== data.repeatNewPassword) {
        form.setError('repeatNewPassword', {
          message: t('account.validation.passwordMismatch', {
            fallback: 'The passwords do not match.',
          }),
        });
        hasPasswordError = true;
      }
    }

    if (hasPasswordError) {
      return;
    }

    const profileResponse = await fetch('/api/account/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        firstName: data.firstName || user.firstName || '',
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || undefined,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        country: data.country,
        zip: data.zip,
      }),
    }).catch(() => null);

    if (!profileResponse) {
      setMessage({
        type: 'error',
        text: t('account.updateFailed', { fallback: 'We could not update your account details.' }),
      });
      return;
    }

    const profileJson = (await profileResponse.json()) as {
      user?: Partial<AuthUser>;
      message?: string;
    };

    if (!profileResponse.ok || !profileJson.user) {
      setMessage({
        type: 'error',
        text:
          profileJson.message ??
          t('account.updateFailed', { fallback: 'We could not update your account details.' }),
      });
      return;
    }

    const nextUser: AuthUser = {
      id: user.id,
      firstName: profileJson.user.firstName ?? user.firstName,
      lastName: profileJson.user.lastName ?? user.lastName,
      email: profileJson.user.email ?? user.email,
      phone: profileJson.user.phone ?? user.phone,
      address1: profileJson.user.address1 ?? user.address1,
      address2: profileJson.user.address2 ?? user.address2,
      city: profileJson.user.city ?? user.city,
      country: profileJson.user.country ?? user.country,
      zip: profileJson.user.zip ?? user.zip,
    };

    setUser(nextUser);

    if (hasPasswordInput) {
      const passwordResponse = await fetch('/api/account/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      }).catch(() => null);

      if (!passwordResponse) {
        setMessage({
          type: 'error',
          text: t('account.passwordPartialFailure', {
            fallback: 'Your details were saved, but the password could not be updated.',
          }),
        });
        return;
      }

      const passwordJson = (await passwordResponse.json()) as { message?: string };

      if (!passwordResponse.ok) {
        const passwordMessage =
          passwordResponse.status === 400 &&
          passwordJson.message &&
          (passwordJson.message.toLowerCase().includes('wrong') ||
            passwordJson.message.toLowerCase().includes('password'))
            ? WRONG_PASSWORD_MESSAGE
            : passwordJson.message;

        setMessage({
          type: 'error',
          text:
            passwordMessage ??
            t('account.passwordPartialFailure', {
              fallback: 'Your details were saved, but the password could not be updated.',
            }),
        });
        return;
      }
    }

    await fetchUser();

    form.reset({
      firstName: nextUser.firstName ?? '',
      lastName: nextUser.lastName ?? '',
      email: nextUser.email ?? '',
      phone: nextUser.phone ?? '',
      address1: nextUser.address1 ?? '',
      address2: nextUser.address2 ?? '',
      city: nextUser.city ?? '',
      country: nextUser.country ?? '',
      zip: nextUser.zip ?? '',
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    });

    setMessage({
      type: 'success',
      text: hasPasswordInput
        ? t('account.updatedWithPassword', {
            fallback: 'Your account details and password have been updated.',
          })
        : t('account.updated', { fallback: 'Your account details have been updated.' }),
    });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>
          {t('account.title', { fallback: 'Your Travel History & Upcoming Adventures' })}
        </h2>
        <p className={styles.panelDescription}>
          {t('account.description', {
            fallback:
              'Keep your personal information up to date to ensure smooth bookings and effortless travel support. From contact details to password management, everything you need to manage your account securely is right here.',
          })}
        </p>
      </div>

      <form className={styles.accountForm} onSubmit={form.handleSubmit(onSubmit)}>
        <input type="hidden" {...form.register('firstName')} />

        <div className={styles.settingsCard}>
          <section className={styles.settingsSection}>
            <h3 className={styles.settingsSectionTitle}>
              {t('account.personalInformation', { fallback: 'Personal Information' })}
            </h3>

            <div className={styles.fieldsGrid}>
              <AccountField
                id="lastName"
                label={t('account.fields.lastName', { fallback: 'Last name' })}
                placeholder={t('account.placeholders.lastName', { fallback: 'Enter your last name' })}
                registerReturn={form.register('lastName', {
                  required: t('account.validation.lastName', { fallback: 'Last name is required.' }),
                })}
                error={form.formState.errors.lastName?.message}
              />

              <AccountField
                id="email"
                type="email"
                label={t('account.fields.email', { fallback: 'Email' })}
                placeholder={t('account.placeholders.email', { fallback: 'Enter your email address' })}
                registerReturn={form.register('email', {
                  required: t('account.validation.email', { fallback: 'Email is required.' }),
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: t('account.validation.emailFormat', {
                      fallback: 'Please enter a valid email address.',
                    }),
                  },
                })}
                error={form.formState.errors.email?.message}
              />

              <div className={styles.field}>
                <label htmlFor="phone" className={styles.fieldLabel}>
                  {t('account.fields.phone', { fallback: 'Phone number' })}
                </label>
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <PhoneInput
                      country="gb"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      excludeCountries={[...new Set(excludedCountries)]}
                      enableSearch
                      preferredCountries={['gb']}
                      containerClass={`${styles.phoneInput} ${
                        form.formState.errors.phone ? styles.phoneInputError : ''
                      }`}
                      inputProps={{
                        id: 'phone',
                        name: field.name,
                      }}
                    />
                  )}
                />
                {form.formState.errors.phone?.message ? (
                  <p className={styles.fieldError}>{form.formState.errors.phone.message}</p>
                ) : null}
              </div>

              <AccountField
                id="address1"
                label={t('account.fields.address1', { fallback: 'Street Address' })}
                placeholder={t('account.placeholders.address1', {
                  fallback: 'Enter your street address',
                })}
                registerReturn={form.register('address1', {
                  required: t('account.validation.address1', {
                    fallback: 'Street address is required.',
                  }),
                })}
                error={form.formState.errors.address1?.message}
              />

              <AccountField
                id="address2"
                label={t('account.fields.address2', { fallback: 'Apartment/Suite' })}
                placeholder={t('account.placeholders.address2', {
                  fallback: 'Enter your apartment or suite',
                })}
                registerReturn={form.register('address2', {
                  required: t('account.validation.address2', {
                    fallback: 'Apartment or suite is required.',
                  }),
                })}
                error={form.formState.errors.address2?.message}
              />

              <AccountField
                id="city"
                label={t('account.fields.city', { fallback: 'City' })}
                placeholder={t('account.placeholders.city', { fallback: 'Enter your city' })}
                registerReturn={form.register('city', {
                  required: t('account.validation.city', { fallback: 'City is required.' }),
                })}
                error={form.formState.errors.city?.message}
              />

              <div className={styles.field}>
                <label htmlFor="country" className={styles.fieldLabel}>
                  {t('account.fields.country', { fallback: 'Country' })}
                </label>
                <Controller
                  name="country"
                  control={form.control}
                  rules={{
                    required: t('account.validation.country', {
                      fallback: 'Country is required.',
                    }),
                  }}
                  render={({ field }) => (
                    <Select<CountryOption>
                      instanceId="account-profile-country"
                      inputId="country"
                      options={formCountries}
                      value={getCountryOption(field.value)}
                      onChange={(option) => field.onChange(option?.label ?? '')}
                      onBlur={field.onBlur}
                      placeholder={t('account.placeholders.country', {
                        fallback: 'Enter your country',
                      })}
                      menuPortalTarget={
                        typeof document !== 'undefined' ? document.body : undefined
                      }
                      menuPosition="fixed"
                      styles={getCountrySelectStyles(Boolean(form.formState.errors.country))}
                    />
                  )}
                />
                {form.formState.errors.country?.message ? (
                  <p className={styles.fieldError}>{form.formState.errors.country.message}</p>
                ) : null}
              </div>

              <AccountField
                id="zip"
                label={t('account.fields.zip', { fallback: 'Postal Code' })}
                placeholder={t('account.placeholders.zip', { fallback: 'Enter your postal code' })}
                registerReturn={form.register('zip', {
                  required: t('account.validation.zip', { fallback: 'Postal code is required.' }),
                })}
                error={form.formState.errors.zip?.message}
              />
            </div>
          </section>

          <section className={styles.settingsSection}>
            <h3 className={styles.settingsSectionTitle}>
              {t('account.accountAccess', { fallback: 'Account Access' })}
            </h3>

            <div className={styles.accountAccessGrid}>
              <AccountField
                id="currentPassword"
                type="password"
                label={t('account.fields.currentPassword', { fallback: 'Current password' })}
                hint={t('account.fields.passwordHint', {
                  fallback: 'Leave blank to leave unchanged',
                })}
                placeholder={t('account.placeholders.currentPassword', {
                  fallback: 'Enter your current password',
                })}
                registerReturn={form.register('currentPassword')}
                error={form.formState.errors.currentPassword?.message}
              />

              <AccountField
                id="newPassword"
                type="password"
                label={t('account.fields.newPassword', { fallback: 'New password' })}
                hint={t('account.fields.passwordHint', {
                  fallback: 'Leave blank to leave unchanged',
                })}
                placeholder={t('account.placeholders.newPassword', {
                  fallback: 'Enter your new password',
                })}
                registerReturn={form.register('newPassword')}
                error={form.formState.errors.newPassword?.message}
              />

              <AccountField
                id="repeatNewPassword"
                type="password"
                label={t('account.fields.repeatNewPassword', { fallback: 'Confirm new password' })}
                placeholder={t('account.placeholders.repeatNewPassword', {
                  fallback: 'Enter your new password again',
                })}
                registerReturn={form.register('repeatNewPassword')}
                error={form.formState.errors.repeatNewPassword?.message}
              />
            </div>
          </section>

          <button
            type="submit"
            className={`${styles.primaryButton} ${styles.profileButton}`}
            disabled={form.formState.isSubmitting}
          >
            <ArrowRightIcon />
            <span>{t('account.save', { fallback: 'Save' })}</span>
          </button>
        </div>

        <div className={styles.panelFooter}>
          {message ? (
            <p
              className={
                message.type === 'success' ? styles.feedbackSuccess : styles.feedbackError
              }
            >
              {message.text}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
};
