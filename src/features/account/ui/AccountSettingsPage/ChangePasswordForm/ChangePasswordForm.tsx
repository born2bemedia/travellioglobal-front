'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import {
  type ChangePasswordSchema,
  changePasswordSchema,
} from '@/features/account/model/account-settings.schema';

import { EyeIcon, EyeOffIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from '../AccountSettingsPage.module.scss';
import { DataUpdatedPopup } from '../DataUpdatedPopup/DataUpdatedPopup';

const WRONG_PASSWORD_MESSAGE = 'The wrong password. Try again.';

export const ChangePasswordForm = () => {
  const t = useTranslations('accountSettingsPage');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordSchema) => {
    setMessage(null);
    try {
      const res = await fetch('/api/account/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });
      const json = (await res.json()) as { message?: string; ok?: boolean };
      if (res.ok) {
        form.reset({
          currentPassword: '',
          newPassword: '',
          repeatNewPassword: '',
        });
        setIsOpen(true);
      } else {
        const msg = json.message ?? 'Password update failed.';
        if (
          res.status === 400 &&
          (msg.toLowerCase().includes('wrong') || msg.toLowerCase().includes('password'))
        ) {
          setMessage({ type: 'error', text: WRONG_PASSWORD_MESSAGE });
        } else {
          setMessage({ type: 'error', text: msg });
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Password update failed.' });
    }
  };

  return (
    <div className={styles.formSection}>
      <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className={styles.contactDataForm__row}>
          <legend className={styles.contactDataForm__row_title}>
            {t('formPasswordTitle', { fallback: 'Account Access' })}
          </legend>
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">
              {t('currentPassword', { fallback: 'CURRENT PASSWORD' })}{' '}
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="currentPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('currentPasswordPlaceholder', { fallback: 'Enter your password' })}
                {...form.register('currentPassword')}
                className={form.formState.errors.currentPassword ? styles.errorInput : ''}
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
            {form.formState.errors.currentPassword && (
              <p className={styles.error}>{form.formState.errors.currentPassword.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">
              {t('newPassword', { fallback: 'NEW PASSWORD' })}{' '}
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                placeholder={t('newPasswordPlaceholder', { fallback: 'Enter your password' })}
                {...form.register('newPassword')}
                className={form.formState.errors.newPassword ? styles.errorInput : ''}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              >
                {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {form.formState.errors.newPassword && (
              <p className={styles.error}>{form.formState.errors.newPassword.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="repeatNewPassword">
              {t('repeatNewPassword', { fallback: 'CONFIRM NEW PASSWORD' })}{' '}
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="repeatNewPassword"
                type={showConfirmNewPassword ? 'text' : 'password'}
                placeholder={t('repeatNewPasswordPlaceholder', { fallback: 'Repeat New Password' })}
                {...form.register('repeatNewPassword')}
                className={form.formState.errors.repeatNewPassword ? styles.errorInput : ''}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                aria-label={showConfirmNewPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmNewPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {form.formState.errors.repeatNewPassword && (
              <p className={styles.error}>{form.formState.errors.repeatNewPassword.message}</p>
            )}
          </div>
        </fieldset>

        <Button type="submit" variant="white" disabled={form.formState.isSubmitting}>
          {t('updateData', { fallback: 'Update Data' })}
        </Button>
        {message && <p className={`${styles.message} ${styles[message.type]}`}>{message.text}</p>}
      </form>
      <DataUpdatedPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
