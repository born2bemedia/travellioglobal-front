'use client';

import { useCallback, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { excludedCountries } from '@/shared/lib/helpers/excludedCountries';

import { submitHomeRequestForm } from '../api/submitHomeRequestForm';
import {
  createHomeRequestFormSchema,
  type HomeRequestFormSchema,
} from '../model/ContactForm.schema';
import { ContactFormSuccess } from './ContactFormSuccess';
import styles from './HomeRequestForm.module.scss';

import 'react-phone-input-2/lib/style.css';

const PROJECT_TYPE_OPTIONS = [
  'Business direction & clarity',
  'Offer refinement & positioning',
  'Growth planning & prioritisation',
  'Structural or operational setup',
  'Strategic review / second opinion',
  'Other',
];

const INVESTMENT_OPTIONS = [
  'Under €1,000',
  '€1,000 - €5,000',
  '€5,000 - €10,000',
  '€10,000 - €20,000',
  '€20,000+',
];

const TIMING_OPTIONS = [
  'Within the next month',
  '1–3 months',
  '3–6 months',
  'Flexible / not fixed yet',
];

const FOLLOW_UP_OPTIONS = ['Email', 'Phone', 'Video Call'];

export const HomeRequestForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('HomeRequestForm');

  const PROJECT_TYPE_OPTIONS = [
    t('projectTypeBusinessDirection', { fallback: 'Business direction & clarity' }),
    t('projectTypeOfferRefinement', { fallback: 'Offer refinement & positioning' }),
    t('projectTypeGrowthPlanning', { fallback: 'Growth planning & prioritisation' }),
    t('projectTypeStructuralSetup', { fallback: 'Structural or operational setup' }),
    t('projectTypeStrategicReview', { fallback: 'Strategic review / second opinion' }),
    t('projectTypeOtherOption', { fallback: 'Other' }),
  ];

  const INVESTMENT_OPTIONS = [
    t('investment.under', { fallback: 'Under' }) + ' €1,000',
    '€1,000 - €5,000',
    '€5,000 - €10,000',
    '€10,000 - €20,000',
    '€20,000+',
  ];

  const TIMING_OPTIONS = [
    t('timingNextMonth', { fallback: 'Within the next month' }),
    t('timingOneToThreeMonths', { fallback: '1–3 months' }),
    t('timingThreeToSixMonths', { fallback: '3–6 months' }),
    t('timingFlexible', { fallback: 'Flexible / not fixed yet' }),
  ];

  const FOLLOW_UP_OPTIONS = [
    t('followUpEmail', { fallback: 'Email' }),
    t('followUpPhone', { fallback: 'Phone' }),
    t('followUpVideoCall', { fallback: 'Video Call' }),
  ];

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<HomeRequestFormSchema>({
    resolver: zodResolver(createHomeRequestFormSchema()),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      website: '',
      projectType: '',
      projectTypeOther: '',
      investmentRange: '',
      goals: '',
      frictionPoints: '',
      clientContext: '',
      timing: '',
      followUp: '',
      attachments: [],
    },
  });

  const projectType = watch('projectType');

  const onSubmit = useCallback(
    async (data: HomeRequestFormSchema) => {
      try {
        setIsLoading(true);
        await submitHomeRequestForm({ ...data, attachments });
        setTimeout(() => {
          setIsSuccess(true);
          reset();
          setAttachments([]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    },
    [reset, attachments]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(files);
  };

  const specifyText = t('specifyText', {
    fallback: 'Please specify',
  });

  const optionalText = t('optionalText', {
    fallback: 'OPTIONAL',
  });

  return (
    <>
      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* ── Your details ─────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="fullName">{t('fullName', { fallback: 'FULL NAME' })}</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder={t('fullNamePlaceholder', { fallback: 'Enter your full name' })}
                  {...register('fullName')}
                  className={errors.fullName ? styles.errorInput : ''}
                />
                {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
              </div>

              <div className={styles.field}>
                <label htmlFor="email">{t('emailAddress', { fallback: 'EMAIL ADDRESS' })}</label>
                <input
                  id="email"
                  type="email"
                  placeholder={t('emailAddressPlaceholder', {
                    fallback: 'Enter your email address',
                  })}
                  {...register('email')}
                  className={errors.email ? styles.errorInput : ''}
                />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="phone">{t('phone', { fallback: 'PHONE NUMBER' })}</label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      country="gb"
                      value={field.value}
                      onChange={field.onChange}
                      excludeCountries={[...new Set(excludedCountries)]}
                      containerClass={`${styles.phoneContainer} ${errors.phone ? styles.phoneError : ''}`}
                      inputProps={{ id: 'phone' }}
                      enableSearch
                      preferredCountries={['gb']}
                    />
                  )}
                />
                {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
              </div>

              <div className={styles.field}>
                <label htmlFor="companyName">
                  {t('companyName', { fallback: 'COMPANY NAME' })}{' '}
                  <span className={styles.optional}>({optionalText})</span>
                </label>
                <input
                  id="companyName"
                  type="text"
                  placeholder={t('companyNamePlaceholder', { fallback: 'Enter your company name' })}
                  {...register('companyName')}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="website">
                {t('website', { fallback: 'YOUR WEBSITE' })}{' '}
                <span className={styles.optional}>({optionalText})</span>
              </label>
              <input
                id="website"
                type="url"
                placeholder={t('websitePlaceholder', { fallback: 'Enter your website URL' })}
                {...register('website')}
              />
            </div>
          </div>

          <div className={styles.divider} />

          {/* ── About your project ───────────────────────── */}
          <div className={styles.section}>
            <div className={styles.field}>
              <label htmlFor="projectType">
                {t('projectType', {
                  fallback: 'WHAT BEST DESCRIBES WHAT YOU’RE LOOKING FOR?',
                })}{' '}
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="projectType"
                  {...register('projectType')}
                  className={errors.projectType ? styles.errorInput : ''}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {specifyText}
                  </option>
                  {PROJECT_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <span className={styles.selectArrow} />
              </div>
              {errors.projectType && <p className={styles.error}>{errors.projectType.message}</p>}
            </div>

            {projectType === t('projectTypeOtherOption', { fallback: 'Other' }) && (
              <div className={styles.field}>
                <input
                  id="projectTypeOther"
                  type="text"
                  placeholder={specifyText}
                  {...register('projectTypeOther')}
                />
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="investmentRange">
                {t('investmentRange', {
                  fallback: 'Scope & investment',
                })}
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="investmentRange"
                  {...register('investmentRange')}
                  className={errors.investmentRange ? styles.errorInput : ''}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {specifyText}
                  </option>
                  {INVESTMENT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <span className={styles.selectArrow} />
              </div>
              {errors.investmentRange && (
                <p className={styles.error}>{errors.investmentRange.message}</p>
              )}
            </div>

            {/* ── Goals & friction points ───────────────────── */}

            <div className={styles.field}>
              <label htmlFor="goals">
                {t('goals', {
                  fallback: 'GOALS & FRICTION POINTS',
                })}
              </label>
              <textarea
                id="goals"
                placeholder={t('goalsPlaceholder', {
                  fallback: 'What are you trying to move forward with right now?',
                })}
                rows={4}
                {...register('goals')}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="frictionPoints">
                {t('frictionPoints', {
                  fallback: 'WHERE DOES IT CURRENTLY FEEL UNCLEAR, STUCK, OR INEFFICIENT?',
                })}
              </label>
              <textarea
                id="frictionPoints"
                placeholder={t('frictionPointsPlaceholder', {
                  fallback: 'You can use short notes or complete thoughts',
                })}
                rows={4}
                {...register('frictionPoints')}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="clientContext">
                {t('clientContext', {
                  fallback: 'Who do you work with or serve?',
                })}
              </label>
              <textarea
                id="clientContext"
                placeholder={t('clientContextPlaceholder', {
                  fallback: 'Any detail that helps us understand your context',
                })}
                rows={4}
                {...register('clientContext')}
              />
            </div>

            {/* ── Timing ───────────────────────────────────── */}

            <div className={styles.field}>
              <label htmlFor="timing">
                {t('timing', {
                  fallback: 'Timing',
                })}
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="timing"
                  {...register('timing')}
                  className={errors.timing ? styles.errorInput : ''}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t('timingPlaceholder', {
                      fallback: 'When would you ideally like to start?',
                    })}
                  </option>
                  {TIMING_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <span className={styles.selectArrow} />
              </div>
              {errors.timing && <p className={styles.error}>{errors.timing.message}</p>}
            </div>

            <div className={styles.field}>
              <label htmlFor="followUp">
                {t('followUp', {
                  fallback: 'How should we follow up?',
                })}
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="followUp"
                  {...register('followUp')}
                  className={errors.followUp ? styles.errorInput : ''}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t('followUpPlaceholder', {
                      fallback: 'Preferred way to continue the conversation',
                    })}
                  </option>
                  {FOLLOW_UP_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <span className={styles.selectArrow} />
              </div>
              {errors.followUp && <p className={styles.error}>{errors.followUp.message}</p>}
            </div>

            {/* ── Attachments ───────────────────────────────── */}

            <div className={styles.field}>
              <label htmlFor="attachments">
                {t('attachments', {
                  fallback: 'Attachments',
                })}{' '}
                <span className={styles.optional}>({optionalText})</span>
              </label>
              <div className={styles.fileUpload} onClick={() => fileInputRef.current?.click()}>
                <span className={styles.fileUploadText}>
                  {attachments.length > 0 ? (
                    attachments.map((f) => f.name).join(', ')
                  ) : (
                    <>
                      {t('attachmentsNotes', {
                        fallback: 'Upload any materials that help explain your situation',
                      })}
                      <br />
                      {t('attachmentsExamples', {
                        fallback: '(e.g., notes, outlines, links, drafts)',
                      })}
                    </>
                  )}
                </span>
                <svg
                  className={styles.fileIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1992 11.45L10.7492 12.9C10.3692 13.28 10.3692 13.9 10.7492 14.28C11.1292 14.66 11.7492 14.66 12.1292 14.28L14.6492 11.76C15.7192 10.69 15.7192 8.95 14.6492 7.88L14.3692 7.6C13.2992 6.53 11.5592 6.53 10.4892 7.6L7.59922 10.49C5.92922 12.16 5.92922 14.87 7.59922 16.54L7.87922 16.82C9.54922 18.49 12.2592 18.49 13.9292 16.82L17.2492 13.5"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  ref={fileInputRef}
                  id="attachments"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>
              <p className={styles.fileNote}>Max size: 10MB</p>
            </div>
          </div>

          {/* ── Submit ───────────────────────────────────── */}
          <div className={styles.submitArea}>
            <p className={styles.submitNote}>
              {t('notice', {
                fallback:
                  'Once submitted, we’ll review your request and follow up with the next steps or clarifying questions.',
              })}
            </p>
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading
                ? t('sending', { fallback: 'Sending...' })
                : t('submitRequest', { fallback: 'Submit a request' })}
            </button>
          </div>
        </form>
      </div>
      {isSuccess && <ContactFormSuccess onClose={() => setIsSuccess(false)} />}
    </>
  );
};
