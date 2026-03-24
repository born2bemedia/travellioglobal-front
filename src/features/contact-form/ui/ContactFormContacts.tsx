'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/kit/button/Button';

import { submitContactFormNew } from '../api/submitContactFormNew';
import { type ContactFormNewSchema, createContactFormNewSchema } from '../model/ContactForm.schema';
import styles from './ContactFormContacts.module.scss';
import { ContactFormSuccess } from './ContactFormSuccess';

const ENABLE_RECAPTCHA = true;

export const ContactFormContacts = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaKey, setRecaptchaKey] = useState(0);
  const t = useTranslations('contactsForm');

  const {
    register,
    handleSubmit,
    setValue,
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
      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className={styles.formField}>
            <div className={styles.formLabel}>
              <Image
                src="/images/contacts/user.svg"
                alt=""
                width={24}
                height={24}
                className={styles.formIcon}
              />
              <span className={styles.formLabelText}>
                {t('name', { fallback: 'Name' })}
              </span>
            </div>
            <input
              id="contactName"
              type="text"
              {...register('fullName')}
              className={errors.fullName ? styles.errorInput : ''}
              placeholder={t('namePlaceholder', { fallback: 'Enter your name' })}
            />
            {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div className={styles.formField}>
            <div className={styles.formLabel}>
              <Image
                src="/images/contacts/envelope.svg"
                alt=""
                width={24}
                height={25}
                className={styles.formIcon}
              />
              <span className={styles.formLabelText}>
                {t('email', { fallback: 'Email' })}
              </span>
            </div>
            <input
              id="contactEmail"
              type="email"
              {...register('email')}
              className={errors.email ? styles.errorInput : ''}
              placeholder={t('emailPlaceholder', { fallback: 'Enter your email' })}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          {/* Message */}
          <div className={styles.formField}>
            <div className={styles.formLabel}>
              <span className={styles.formLabelText}>
                {t('message', { fallback: 'Message' })}
              </span>
            </div>
            <div className={styles.formTextareaWrap}>
              <textarea
                id="contactMessage"
                {...register('message')}
                placeholder={t('messagePlaceholder', {
                  fallback: 'Leave your message here',
                })}
                className={errors.message ? styles.errorInput : ''}
              />
            </div>
          </div>

          {/* reCAPTCHA */}
          {ENABLE_RECAPTCHA && (
            <div className={styles.formRecaptcha}>
              <ReCAPTCHA
                key={recaptchaKey}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={handleRecaptchaChange}
              />
              {errors.recaptcha && (
                <p className={styles.error}>{errors.recaptcha.message}</p>
              )}
            </div>
          )}

          {/* Submit */}
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            <Image
              src="/images/contacts/send-arrow.svg"
              alt=""
              width={20}
              height={20}
              className={styles.submitIcon}
            />
            <span>
              {isLoading
                ? t('loading', { fallback: 'Loading...' })
                : t('submit', { fallback: 'Send Message' })}
            </span>
          </button>
        </form>
      </div>
      {isSuccess && <ContactFormSuccess onClose={() => setIsSuccess(false)} />}
    </>
  );
};
