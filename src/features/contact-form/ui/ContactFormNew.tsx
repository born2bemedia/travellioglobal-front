'use client';

import { useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { excludedCountries } from '@/shared/lib/helpers/excludedCountries';
import { Button } from '@/shared/ui/kit/button/Button';

import { submitContactFormNew } from '../api/submitContactFormNew';
import { type ContactFormNewSchema, createContactFormNewSchema } from '../model/ContactForm.schema';
import styles from './ContactForm.module.scss';
import { ContactFormSuccess } from './ContactFormSuccess';

import 'react-phone-input-2/lib/style.css';

// Set to false to disable reCAPTCHA (useful for development/testing)
const ENABLE_RECAPTCHA = true;

export const ContactFormNew = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaKey, setRecaptchaKey] = useState(0);
  const t = useTranslations('contactFormNew');

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createContactFormNewSchema()),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
      recaptcha: '',
    },
  });

 

  const onSubmit = useCallback(
    async (data: ContactFormNewSchema) => {
      try {
        setIsLoading(true);
        await submitContactFormNew(data);
        setTimeout(() => {
          setIsSuccess(true);
          reset();
          setRecaptchaKey((k) => k + 1);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setRecaptchaKey((k) => k + 1);
      }
    },
    [reset]
  );

  const handleRecaptchaChange = (token: string | null) => {
    if (ENABLE_RECAPTCHA) {
      setValue('recaptcha', token || '', { shouldValidate: true });
    } else {
      setValue('recaptcha', 'disabled', { shouldValidate: false });
    }
  };

  return (
    <>
      <div className={styles.contactForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className={styles.formGroup}>
            <label htmlFor="fullName">
              {t('fullName', { fallback: 'Full name' })}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              className={errors.fullName ? styles.errorInput : ''}
            />
            {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email">
              {t('email', { fallback: 'Email address' })}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={errors.email ? styles.errorInput : ''}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              {t('phone', { fallback: 'Phone number' })}
              <span className={styles.optional}>{t('optional', { fallback: '(Optional)' })}</span>
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country="gb"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  excludeCountries={[...new Set(excludedCountries)]}
                  inputProps={{
                    id: 'phone',
                    name: 'phone',
                  }}
                  containerClass={styles.phoneInputContainer}
                  inputClass={errors.phone ? `${styles.phoneInput} ${styles.errorInput}` : styles.phoneInput}
                  enableSearch
                  preferredCountries={['gb']}
                />
              )}
            />
            {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
          </div>

          {/* Description */}
          <div className={`${styles.formGroup} ${styles.textarea}`}>
            <label htmlFor="message">
              {t('message', { fallback: 'Your message' })}
              <span className={styles.required}>*</span>
            </label>
            <textarea
              id="message"
              {...register('message')}
              className={errors.message ? styles.errorInput : ''}
              placeholder={t('messagePlaceholder', { fallback: 'Please describe the property, your objective, and any known concerns (pricing, risk, timing, legal, financing, etc.).' })}
            />
            {errors.message && (
              <p className={styles.error}>{errors.message.message}</p>
            )}
          </div>

          {/* reCAPTCHA */}
          {ENABLE_RECAPTCHA && (
            <div className={styles.formGroup}>
              <ReCAPTCHA
                key={recaptchaKey}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={handleRecaptchaChange}
              />
              {errors.recaptcha && <p className={styles.error}>{errors.recaptcha.message}</p>}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" variant="white" disabled={isLoading}>
            {isLoading
              ? t('loading', { fallback: 'Loading...' })
              : t('submit', { fallback: 'Submit' })}
          </Button>

          <p className={styles.formNote}>{t('formNote', { fallback: 'All enquiries are confidential. We respond within one business day.' })}</p>

        </form>
      </div>
      {isSuccess && <ContactFormSuccess onClose={() => setIsSuccess(false)} />}
    </>
  );
};
