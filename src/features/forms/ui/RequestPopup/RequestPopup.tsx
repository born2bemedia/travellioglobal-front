'use client';

import { useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { submitRequestForm } from '@/features/forms/api/submitForm';
import { type RequestFormSchema, requestFormSchema } from '@/features/forms/model/schemas';

import { excludedCountries } from '@/shared/lib/helpers/excludedCountries';

import { FormPopup } from '../FormPopup/FormPopup';
import styles from './RequestPopup.module.scss';

import 'react-phone-input-2/lib/style.css';

const ENABLE_RECAPTCHA = true;

type RequestPopupProps = {
  service: string;
  isOpen: boolean;
  onClose: () => void;
  onReturnHome?: () => void;
};

export const RequestPopup = ({ service, isOpen, onClose, onReturnHome }: RequestPopupProps) => {
  const t = useTranslations('forms');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RequestFormSchema>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      website: '',
      message: '',
      recaptcha: '',
    },
  });

  const handleRecaptchaChange = (token: string | null) => {
    if (ENABLE_RECAPTCHA) {
      form.setValue('recaptcha', token ?? '', { shouldValidate: true });
    } else {
      form.setValue('recaptcha', 'disabled', { shouldValidate: false });
    }
  };

  const onSubmit = async (data: RequestFormSchema) => {
    setError(null);
    setIsLoading(true);
    try {
      await submitRequestForm(data, service);
      setIsSuccess(true);
      form.reset();
      recaptchaRef.current?.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
      recaptchaRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnHome = () => {
    setIsSuccess(false);
    onReturnHome?.();
    onClose();
  };

  return (
    <FormPopup
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy="request-popup-title"
      panelClassName={styles.panel}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
        &times;
      </button>

      {isSuccess ? (
        <div className={styles.successWrapper}>
          <div className={styles.successContent}>
            <h2 id="request-popup-title" className={styles.successTitle}>
              {t('requestForm.successTitle', { fallback: 'Thank you!' })}
            </h2>
            <p className={styles.successDesc}>
              {t('requestForm.successMessage1', {
                service,
                fallback:
                  'Your request for our service has been successfully submitted. Our team will review the information provided and get in touch with you shortly to discuss the next steps and how we can assist you.',
              })}
            </p>
            <button type="button" className={styles.returnBtn} onClick={handleReturnHome}>
              {t('returnHome', { fallback: 'Return to home page' })}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <h2 id="request-popup-title" className={styles.title}>
              {service}
            </h2>
          </div>

          <div className={styles.right}>
            <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <input type="hidden" name="service" value={service} />
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="req-fullName">
                    {t('fullName', { fallback: 'Full name' })}
                  </label>
                  <input
                    id="req-fullName"
                    type="text"
                    className={`${styles.input} ${form.formState.errors.fullName ? styles.inputError : ''}`}
                    placeholder={t('fullNamePlaceholder', {
                      fallback: 'Enter your full name',
                    })}
                    {...form.register('fullName')}
                  />
                  {form.formState.errors.fullName && (
                    <span className={styles.error}>{form.formState.errors.fullName.message}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="req-email">
                    {t('email', { fallback: 'Email address' })}
                  </label>
                  <input
                    id="req-email"
                    type="email"
                    className={`${styles.input} ${form.formState.errors.email ? styles.inputError : ''}`}
                    placeholder={t('emailPlaceholder', {
                      fallback: 'Enter your email address',
                    })}
                    {...form.register('email')}
                  />
                  {form.formState.errors.email && (
                    <span className={styles.error}>{form.formState.errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="req-phone">
                    {t('phone', { fallback: 'Phone number' })}
                  </label>
                  <Controller
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                      <PhoneInput
                        country="gb"
                        value={field.value}
                        onChange={field.onChange}
                        excludeCountries={[...new Set(excludedCountries)]}
                        containerClass={`${styles.phoneContainer} ${form.formState.errors.phone ? styles.phoneError : ''}`}
                        inputProps={{ id: 'req-phone' }}
                        enableSearch
                        preferredCountries={['gb']}
                      />
                    )}
                  />
                  {form.formState.errors.phone && (
                    <span className={styles.error}>{form.formState.errors.phone.message}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="req-companyName">
                    {t('companyName', { fallback: 'Company name' })}{' '}
                    <span className={styles.labelOptional}>
                      {t('optional', { fallback: '(optional)' })}
                    </span>
                  </label>
                  <input
                    id="req-companyName"
                    type="text"
                    className={styles.input}
                    placeholder={t('companyNamePlaceholder', {
                      fallback: 'Enter your company name',
                    })}
                    {...form.register('companyName')}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="req-website">
                  {t('website', { fallback: 'Your website' })}{' '}
                  <span className={styles.labelOptional}>
                    {t('optional', { fallback: '(optional)' })}
                  </span>
                </label>
                <input
                  id="req-website"
                  type="text"
                  className={styles.input}
                  placeholder={t('websitePlaceholder', {
                    fallback: 'Enter your website URL',
                  })}
                  {...form.register('website')}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="req-message">
                  {t('message', { fallback: 'Message' })}{' '}
                  <span className={styles.labelOptional}>
                    {t('optional', { fallback: '(optional)' })}
                  </span>
                </label>
                <textarea
                  id="req-message"
                  className={styles.textarea}
                  placeholder={t('messagePlaceholder', {
                    fallback: 'Enter your message',
                  })}
                  {...form.register('message')}
                />
              </div>

              {ENABLE_RECAPTCHA && (
                <div className={styles.recaptcha}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
                    onChange={handleRecaptchaChange}
                    theme="dark"
                  />
                  {form.formState.errors.recaptcha && (
                    <span className={styles.error}>{form.formState.errors.recaptcha.message}</span>
                  )}
                </div>
              )}

              {error && <p className={styles.submitError}>{error}</p>}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={form.formState.isSubmitting || isLoading}
              >
                {isLoading
                  ? t('loading', { fallback: 'Sending…' })
                  : t('submit', { fallback: 'Submit' })}
              </button>
            </form>
          </div>
        </div>
      )}
    </FormPopup>
  );
};
