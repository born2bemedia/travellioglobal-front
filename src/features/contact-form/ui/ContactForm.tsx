'use client';

import { useCallback, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';

import { excludedCountries } from '@/shared/lib/helpers/excludedCountries';
import { FileIcon } from '@/shared/ui/icons/file';
import { Button } from '@/shared/ui/kit/button/Button';

import { submitContactForm } from '../api/submitContactForm';
import { type ContactFormSchema, createContactFormSchema } from '../model/ContactForm.schema';
import styles from './ContactForm.module.scss';
import { ContactFormSuccess } from './ContactFormSuccess';

import 'react-phone-input-2/lib/style.css';

const PRIMARY_OBJECTIVES = [
  { value: "Buy", label: "Buy" },
  { value: "Sell", label: "Sell" },
  { value: "Hold", label: "Hold" },
  { value: "Rent", label: "Rent" },
  { value: "Portfolio", label: "Portfolio" },
];

// Set to false to disable reCAPTCHA (useful for development/testing)
const ENABLE_RECAPTCHA = true;

export const ContactForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const t = useTranslations('contactForm');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createContactFormSchema()),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      propertyLocation: '',
      primaryObjective: '',
      inheritance: '',
      description: '',
      documents: [],
      recaptcha: '',
    },
  });

  const documents = watch('documents');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentFiles = documents || [];
      setValue('documents', [...currentFiles, ...acceptedFiles], { shouldValidate: true });
    },
    [documents, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 10 * 1024 * 1024, // 10 MB
  });

  const removeFile = (index: number) => {
    const currentFiles = documents || [];
    const newFiles = currentFiles.filter((_, i) => i !== index);
    setValue('documents', newFiles, { shouldValidate: true });
  };

  const onSubmit = useCallback(
    async (data: ContactFormSchema) => {
      try {
        setIsLoading(true);
        await submitContactForm(data);
        setTimeout(() => {
          setIsSuccess(true);
          reset();
          recaptchaRef.current?.reset();
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        recaptchaRef.current?.reset();
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

          {/* Property Location */}
          <div className={styles.formGroup}>
            <label htmlFor="propertyLocation">
              {t('propertyLocation', { fallback: 'Property location (city, country)' })}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="propertyLocation"
              type="text"
              {...register('propertyLocation')}
              className={errors.propertyLocation ? styles.errorInput : ''}
            />
            {errors.propertyLocation && (
              <p className={styles.error}>{errors.propertyLocation.message}</p>
            )}
          </div>

          {/* Primary Objective */}
          <div className={styles.formGroup}>
            <label htmlFor="primaryObjective">
              {t('primaryObjective', { fallback: 'Primary objective' })}
              <span className={styles.required}>*</span>
            </label>
            <Controller
              name="primaryObjective"
              control={control}
              render={({ field }) => (
                <Select
                  inputId="primaryObjective"
                  options={PRIMARY_OBJECTIVES}
                  placeholder={t('selectObjective', { fallback: 'Select objective' })}
                  isSearchable={false}
                  className={styles.select}
                  classNamePrefix="select"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      borderColor: errors.primaryObjective
                        ? '#ff2d30'
                        : state.isFocused
                          ? 'rgba(255, 255, 255, 0.3)'
                          : 'rgba(255, 255, 255, 0.05)',
                      boxShadow: 'none',
                      minHeight: '38px',
                      '&:hover': {
                        borderColor: errors.primaryObjective
                          ? '#ff2d30'
                          : 'rgba(255, 255, 255, 0.2)',
                      },
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '14px',
                      fontWeight: 300,
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 300,
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: '#1a1a1a',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? 'rgba(255, 255, 255, 0.1)'
                        : state.isFocused
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'transparent',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 300,
                      cursor: 'pointer',
                      '&:active': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }),
                    indicatorSeparator: () => ({
                      display: 'none',
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      width: '16px',
                      height: '16px',
                      padding: '0',
                      marginRight: '12px',
                      color: 'rgba(204, 204, 204, 0.30)',
                      '&:hover': {
                        color: 'rgba(255, 255, 255, 0.9)',
                      },
                      svg: {
                        width: '16px',
                        height: '16px',
                      },
                    }),
                  }}
                  value={PRIMARY_OBJECTIVES.find((option) => option.value === field.value) || null}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption ? selectedOption.value : '');
                  }}
                />
              )}
            />
            {errors.primaryObjective && (
              <p className={styles.error}>{errors.primaryObjective.message}</p>
            )}
          </div>

          {/* Inheritance */}
          <div className={styles.formGroup}>
            <label htmlFor="inheritance">
              {t('inheritance', { fallback: 'Inheritance' })}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="inheritance"
              type="text"
              {...register('inheritance')}
              className={errors.inheritance ? styles.errorInput : ''}
            />
            {errors.inheritance && (
              <p className={styles.error}>{errors.inheritance.message}</p>
            )}
          </div>

          {/* Description */}
          <div className={`${styles.formGroup} ${styles.textarea}`}>
            <label htmlFor="description">
              {t('description', { fallback: 'Brief description of the situation' })}
              <span className={styles.required}>*</span>
            </label>
            <p className={styles.descriptionPlaceholder}>
            {t('descriptionPlaceholder', {
                fallback:
                  'Please describe the property, your objective, and any known concerns (pricing, risk, timing, legal, financing, etc.).',
              })}
            </p>
            <textarea
              id="description"
              {...register('description')}
              className={errors.description ? styles.errorInput : ''}
            />
            {errors.description && (
              <p className={styles.error}>{errors.description.message}</p>
            )}
          </div>

          {/* File Upload */}
          <div className={styles.formGroup}>
            <label>
              {t('uploadDocuments', { fallback: 'Upload relevant documents' })}
              <span className={styles.optional}>{t('optional', { fallback: '(Optional)' })}</span>
            </label>
            <div
              {...getRootProps()}
              className={`${styles.fileUpload} ${isDragActive ? styles.dragActive : ''}`}
            >
              <input {...getInputProps()} />
              <div className={styles.fileUploadContent}>
                <FileIcon />
                <p>{t('chooseFiles', { fallback: 'Choose files to upload' })}</p>
              </div>
              <p className={styles.fileUploadInfo}>
                {t('acceptedFormats', {
                  fallback: 'Accepted formats: PDF, JPG, PNG • Max file size: 10 MB per file',
                })}
              </p>
            </div>
            {documents && documents.length > 0 && (
              <div className={styles.fileList}>
                {documents.map((file, index) => (
                  <div key={index} className={styles.fileItem}>
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className={styles.removeFile}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* reCAPTCHA */}
          {ENABLE_RECAPTCHA && (
            <div className={styles.formGroup}>
              <ReCAPTCHA
                ref={recaptchaRef}
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
              : t('submit', { fallback: 'REQUEST ANALYSIS' })}
          </Button>

          <p className={styles.formNote}>{t('formNote', { fallback: 'All enquiries are confidential. We respond within one business day.' })}</p>

        </form>
      </div>
      {isSuccess && <ContactFormSuccess onClose={() => setIsSuccess(false)} />}
    </>
  );
};
