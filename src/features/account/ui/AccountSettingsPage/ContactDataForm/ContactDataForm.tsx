'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import {
  type ContactDataSchema,
  contactDataSchema,
} from '@/features/account/model/account-settings.schema';
import type { AuthUser } from '@/features/account/model/auth.types';
import { useAuthStore } from '@/features/account/store/auth';

import { Button } from '@/shared/ui/kit/button/Button';

import styles from '../AccountSettingsPage.module.scss';
import { DataUpdatedPopup } from '../DataUpdatedPopup/DataUpdatedPopup';

import 'react-phone-input-2/lib/style.css';

type ContactDataFormProps = {
  user: AuthUser;
};

export const ContactDataForm = ({ user }: ContactDataFormProps) => {
  const t = useTranslations('accountSettingsPage');
  const setUser = useAuthStore((s) => s.setUser);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ContactDataSchema>({
    resolver: zodResolver(contactDataSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      zip: '',
    },
  });

  useEffect(() => {
    form.reset({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phone: (user.phone as string) ?? '',
      email: user.email ?? '',
      address1: user.address1 ?? '',
      address2: user.address2 ?? '',
      city: user.city ?? '',
      country: user.country ?? '',
      zip: user.zip ?? '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when user loads
  }, [user]);

  const onSubmit = async (data: ContactDataSchema) => {
    setMessage(null);
    try {
      const res = await fetch('/api/account/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || undefined,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          country: data.country,
          zip: data.zip,
        }),
      });
      const json = (await res.json()) as { user?: Record<string, unknown>; message?: string };
      if (res.ok && json.user) {
        const u = json.user as {
          email?: string;
          firstName?: string;
          lastName?: string;
          phone?: string;
          address1?: string;
          address2?: string;
          city?: string;
          country?: string;
          zip?: string;
        };
        setUser({
          id: user.id,
          email: u.email ?? user.email,
          firstName: u.firstName ?? user.firstName,
          lastName: u.lastName ?? user.lastName,
          phone: u.phone ?? user.phone,
          address1: u.address1 ?? user.address1,
          address2: u.address2 ?? user.address2,
          city: u.city ?? user.city,
          country: u.country ?? user.country,
          zip: u.zip ?? user.zip,
        });
        fetchUser();
        setIsOpen(true);
      } else {
        setMessage({ type: 'error', text: json?.message ?? 'Update failed.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Update failed 2.' });
    }
  };

  return (
    <div className={styles.contactDataSection}>
      <form className={styles.contactDataForm} onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className={styles.contactDataForm__row}>
          <legend className={styles.contactDataForm__row_title}>
            {t('formTitle1', { fallback: 'Personal Information' })}
          </legend>
          <div
            className={`${styles.formGroup} ${form.formState.errors.firstName ? styles.errorInput : ''}`}
          >
            <label htmlFor="contact-firstName">
              {t('firstName', { fallback: 'FIRST NAME' })}{' '}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="contact-firstName"
              type="text"
              placeholder={t('yourNamePlaceholder', { fallback: 'Enter your first name' })}
              {...form.register('firstName')}
            />
            {form.formState.errors.firstName && (
              <p className={styles.error}>{form.formState.errors.firstName.message}</p>
            )}
          </div>

          <div
            className={`${styles.formGroup} ${form.formState.errors.lastName ? styles.errorInput : ''}`}
          >
            <label htmlFor="contact-lastName">
              {t('yourLastName', { fallback: 'LAST NAME' })}{' '}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="contact-lastName"
              type="text"
              placeholder={t('yourLastNamePlaceholder', { fallback: 'Enter your last name' })}
              {...form.register('lastName')}
            />
            {form.formState.errors.lastName && (
              <p className={styles.error}>{form.formState.errors.lastName.message}</p>
            )}
          </div>

          <div
            className={`${styles.formGroup} ${form.formState.errors.phone ? styles.errorInput : ''}`}
          >
            <label htmlFor="contact-phone">
              {t('yourPhone', { fallback: 'PHONE NUMBER' })}{' '}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="contact-phone"
              type="phone"
              placeholder="+1 23456789"
              {...form.register('phone')}
            />
            {form.formState.errors.phone && (
              <p className={styles.error}>{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div
            className={`${styles.formGroup} ${form.formState.errors.email ? styles.errorInput : ''}`}
          >
            <label htmlFor="contact-email">
              {t('yourEmail', { fallback: 'EMAIL' })} <span className={styles.required}>*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder={t('yourEmailPlaceholder', { fallback: 'Your Email' })}
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className={styles.error}>{form.formState.errors.email.message}</p>
            )}
          </div>

          <div
            className={`${styles.formGroup} ${form.formState.errors.address1 ? styles.errorInput : ''}`}
          >
            <label htmlFor="contact-address1">
              {t('yourAddress1', { fallback: 'STREET ADDRESS' })}{' '}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="contact-address1"
              type="text"
              placeholder={t('yourAddress1Placeholder', { fallback: 'Enter your street address' })}
              {...form.register('address1')}
            />
            {form.formState.errors.address1 && (
              <p className={styles.error}>{form.formState.errors.address1.message}</p>
            )}
          </div>

          <div
            className={`${styles.formGroup} ${form.formState.errors.address2 ? styles.errorInput : ''}`}
          >
            <label htmlFor="contact-address2">
              {t('yourAddress2', { fallback: 'APARTMENT/SUITE' })}{' '}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="contact-address2"
              type="text"
              placeholder={t('yourAddress2Placeholder', { fallback: 'Enter your apartment/suite' })}
              {...form.register('address2')}
            />
            {form.formState.errors.address2 && (
              <p className={styles.error}>{form.formState.errors.address2.message}</p>
            )}
          </div>

          <div
            className={`${styles.formGroup} ${form.formState.errors.city ? styles.errorInput : ''}`}
          >
            <label htmlFor="contact-city">
              {t('yourCity', { fallback: 'CITY' })} <span className={styles.required}>*</span>
            </label>
            <input
              id="contact-city"
              type="text"
              placeholder={t('yourCityPlaceholder', { fallback: 'Enter your city' })}
              {...form.register('city')}
            />
            {form.formState.errors.city && (
              <p className={styles.error}>{form.formState.errors.city.message}</p>
            )}
          </div>

          <div
            className={`${styles.formGroup} ${form.formState.errors.country ? styles.errorInput : ''}`}
          >
            <label htmlFor="contact-country">
              {t('yourCountry', { fallback: 'COUNTRY' })} <span className={styles.required}>*</span>
            </label>
            <input
              id="contact-country"
              type="text"
              placeholder={t('yourCountryPlaceholder', { fallback: 'Enter your country' })}
              {...form.register('country')}
            />
            {form.formState.errors.country && (
              <p className={styles.error}>{form.formState.errors.country.message}</p>
            )}
          </div>

          <div
            className={`${styles.formGroup} ${form.formState.errors.zip ? styles.errorInput : ''}`}
          >
            <label htmlFor="contact-zip">
              {t('yourZip', { fallback: 'POSTAL CODE' })} <span className={styles.required}>*</span>
            </label>
            <input
              id="contact-zip"
              type="text"
              placeholder={t('yourZipPlaceholder', { fallback: 'Enter your postal code' })}
              {...form.register('zip')}
            />
            {form.formState.errors.zip && (
              <p className={styles.error}>{form.formState.errors.zip.message}</p>
            )}
          </div>
        </fieldset>

        <Button type="submit" variant="white" disabled={form.formState.isSubmitting}>
          {t('updateData', { fallback: 'Save' })}
        </Button>
        {message && <p className={`${styles.message} ${styles[message.type]}`}>{message.text}</p>}
      </form>
      <DataUpdatedPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
