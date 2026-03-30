'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

import { useAuthStore } from '@/features/account';
import { createOrder } from '@/features/cart/api/createOrder';
import { type CheckoutFormSchema, checkoutFormSchema } from '@/features/cart/model/checkout.schema';
import { useCartStore } from '@/features/cart/store/cart';
import { CheckoutPageShell } from '@/features/cart/ui/CheckoutPageShell/CheckoutPageShell';

import styles from './CheckoutForm.module.scss';

import { useRouter } from '@/i18n/navigation';

const ENABLE_RECAPTCHA = true;

const defaultValues: CheckoutFormSchema = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  country: '',
  zip: '',
  email: '',
  phone: '',
  orderNotes: '',
  termsAccepted: false,
  refundPolicyAccepted: false,
  recaptcha: '',
};

const formatPrice = (value: number) =>
  `€${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const getBookingDateLabel = (description?: string, bookingDetails?: { date: string; time: string }) => {
  if (bookingDetails?.date && bookingDetails?.time) {
    return `${bookingDetails.date} • ${bookingDetails.time}`;
  }

  if (bookingDetails?.date) {
    return bookingDetails.date;
  }

  return description?.trim() || '';
};

const ArrowIcon = () => (
  <svg width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden="true">
    <path
      d="M2 10H21.5M21.5 10L13.75 2.25M21.5 10L13.75 17.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CheckoutForm = () => {
  const t = useTranslations('checkoutForm');
  const router = useRouter();
  const [recaptchaKey, setRecaptchaKey] = useState(0);

  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const total = getTotalPrice();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!isInitialized) {
      fetchUser();
    }
  }, [fetchUser, isInitialized]);

  useEffect(() => {
    if (!user || !isInitialized) return;

    reset({
      ...defaultValues,
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      email: user.email ?? '',
      phone: (user.phone as string) ?? '',
    });
  }, [isInitialized, reset, user]);

  const handleRecaptchaChange = (token: string | null) => {
    if (ENABLE_RECAPTCHA) {
      setValue('recaptcha', token ?? '', { shouldValidate: true });
      return;
    }

    setValue('recaptcha', 'disabled', { shouldValidate: false });
  };

  const handleQuantityStep = (id: string, quantity: number, delta: number) => {
    updateQuantity(id, quantity + delta);
  };

  const onSubmit = async (data: CheckoutFormSchema) => {
    try {
      const result = await createOrder({
        billing: {
          firstName: data.firstName,
          lastName: data.lastName,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          country: data.country,
          zip: data.zip,
        },
        contact: {
          email: data.email,
          phone: data.phone ?? '',
        },
        orderNotes: data.orderNotes,
        items,
        total,
        recaptcha: data.recaptcha,
        userId: user?.id,
      });

      const orderNumber = (result as { doc?: { orderNumber?: string } })?.doc?.orderNumber ?? '';

      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('lastOrder', JSON.stringify({ orderNumber, items, total }));
      }

      clearCart();
      setRecaptchaKey((current) => current + 1);
      await fetchUser();
      router.push('/thank-you');
    } catch (error) {
      console.error(error);
      setRecaptchaKey((current) => current + 1);
    }
  };

  return (
    <CheckoutPageShell>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.shell}>
          <div className={styles.content}>
            <section className={styles.cartSection} aria-labelledby="checkout-cart-title">
              <h1 id="checkout-cart-title" className={styles.cartTitle}>
                {t('inYourCart', { fallback: 'In Your Cart' })}
              </h1>

              <div className={styles.cartDesktop}>
                <div className={styles.cartTable}>
                  <div className={`${styles.cartGrid} ${styles.cartGridHeader}`}>
                    <div className={styles.nameColumn}>
                      {t('tourName', { fallback: 'Tour Name' })}
                    </div>
                    <div className={`${styles.altColumn} ${styles.centerCell}`}>
                      {t('tourDate', { fallback: 'Tour Date' })}
                    </div>
                    <div className={styles.centerCell}>
                      {t('pricePerPerson', { fallback: 'Price per person' })}
                    </div>
                    <div className={`${styles.altColumn} ${styles.centerCell}`}>
                      {t('participants', { fallback: 'Participants' })}
                    </div>
                    <div className={styles.centerCell}>
                      {t('subtotalLabel', { fallback: 'Subtotal' })}
                    </div>
                  </div>

                  {items.map((item) => (
                    <div key={item.id} className={styles.cartGrid}>
                      <div className={styles.nameColumn}>{item.title}</div>
                      <div className={`${styles.altColumn} ${styles.centerCell}`}>
                        {getBookingDateLabel(item.description, item.bookingDetails) ||
                          t('tourDateFallback', { fallback: 'To be confirmed' })}
                      </div>
                      <div className={styles.centerCell}>{formatPrice(item.price)}</div>
                      <div className={`${styles.altColumn} ${styles.centerCell}`}>
                        <div className={styles.quantityControl}>
                          <button
                            type="button"
                            onClick={() => handleQuantityStep(item.id, item.quantity, -1)}
                            aria-label={t('decreaseQuantity', { fallback: 'Decrease quantity' })}
                          >
                            <span />
                          </button>
                          <strong>{item.quantity}</strong>
                          <button
                            type="button"
                            onClick={() => handleQuantityStep(item.id, item.quantity, 1)}
                            aria-label={t('increaseQuantity', { fallback: 'Increase quantity' })}
                          >
                            <span />
                            <span className={styles.vertical} />
                          </button>
                        </div>
                      </div>
                      <div className={styles.centerCell}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}

                  <div className={styles.desktopTotal}>
                    {t('total', { fallback: 'Total' })}: {formatPrice(total)}
                  </div>
                </div>
              </div>

              <div className={styles.cartMobile}>
                {items.map((item, index) => (
                  <div key={item.id} className={styles.mobileSummaryCard}>
                    <div className={styles.mobileSummaryLabel}>
                      {t('tourName', { fallback: 'Tour Name' })}
                    </div>
                    <div className={styles.mobileSummaryValue}>{item.title}</div>

                    <div className={styles.mobileSummaryLabel}>
                      {t('pricePerPerson', { fallback: 'Price per person' })}
                    </div>
                    <div className={styles.mobileSummaryValue}>{formatPrice(item.price)}</div>

                    <div className={styles.mobileSummaryLabel}>
                      {t('tourDate', { fallback: 'Tour Date' })}
                    </div>
                    <div className={styles.mobileSummaryValue}>
                      {getBookingDateLabel(item.description, item.bookingDetails) ||
                        t('tourDateFallback', { fallback: 'To be confirmed' })}
                    </div>

                    <div className={styles.mobileSummaryLabel}>
                      {t('participants', { fallback: 'Participants' })}
                    </div>
                    <div className={styles.mobileSummaryQuantity}>
                      <div className={styles.quantityControl}>
                        <button
                          type="button"
                          onClick={() => handleQuantityStep(item.id, item.quantity, -1)}
                          aria-label={t('decreaseQuantity', { fallback: 'Decrease quantity' })}
                        >
                          <span />
                        </button>
                        <strong>{item.quantity}</strong>
                        <button
                          type="button"
                          onClick={() => handleQuantityStep(item.id, item.quantity, 1)}
                          aria-label={t('increaseQuantity', { fallback: 'Increase quantity' })}
                        >
                          <span />
                          <span className={styles.vertical} />
                        </button>
                      </div>
                    </div>

                    <div className={styles.mobileSummaryLabel}>
                      {t('subtotalLabel', { fallback: 'Subtotal' })}
                    </div>
                    <div className={styles.mobileSummaryValue}>
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    {index === items.length - 1 && (
                      <>
                        <div className={styles.mobileSummaryLabel}>
                          {t('total', { fallback: 'Total' })}
                        </div>
                        <div
                          className={`${styles.mobileSummaryValue} ${styles.mobileSummaryTotal}`}
                        >
                          {formatPrice(total)}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.infoCard} aria-labelledby="checkout-billing-title">
              <h2 id="checkout-billing-title" className={styles.cardTitle}>
                {t('billingDetails', { fallback: 'Billing Details' })}
              </h2>

              <div className={styles.fieldsList}>
                <div className={styles.fieldRow}>
                  <label htmlFor="firstName" className={styles.fieldLabel}>
                    {t('firstName', { fallback: 'First name' })}
                  </label>
                  <input
                    id="firstName"
                    {...register('firstName')}
                    className={errors.firstName ? styles.errorInput : ''}
                  />
                  {errors.firstName && (
                    <span className={styles.error}>{errors.firstName.message}</span>
                  )}
                </div>

                <div className={styles.fieldRow}>
                  <label htmlFor="lastName" className={styles.fieldLabel}>
                    {t('lastName', { fallback: 'Last name' })}
                  </label>
                  <input
                    id="lastName"
                    {...register('lastName')}
                    className={errors.lastName ? styles.errorInput : ''}
                  />
                  {errors.lastName && (
                    <span className={styles.error}>{errors.lastName.message}</span>
                  )}
                </div>

                <div className={styles.fieldRow}>
                  <label htmlFor="address1" className={styles.fieldLabel}>
                    {t('address1', { fallback: 'Address line 1' })}
                  </label>
                  <input
                    id="address1"
                    {...register('address1')}
                    className={errors.address1 ? styles.errorInput : ''}
                  />
                  {errors.address1 && (
                    <span className={styles.error}>{errors.address1.message}</span>
                  )}
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.fieldLabelStack}>
                    <label htmlFor="address2" className={styles.fieldLabel}>
                      {t('address2', { fallback: 'Address line 2' })}
                    </label>
                    <span className={styles.fieldHint}>
                      {t('optional', { fallback: '(optional)' })}
                    </span>
                  </div>
                  <input id="address2" {...register('address2')} />
                </div>

                <div className={styles.fieldRow}>
                  <label htmlFor="city" className={styles.fieldLabel}>
                    {t('city', { fallback: 'City' })}
                  </label>
                  <input
                    id="city"
                    {...register('city')}
                    className={errors.city ? styles.errorInput : ''}
                  />
                  {errors.city && <span className={styles.error}>{errors.city.message}</span>}
                </div>

                <div className={styles.fieldRow}>
                  <label htmlFor="country" className={styles.fieldLabel}>
                    {t('country', { fallback: 'Country' })}
                  </label>
                  <input
                    id="country"
                    {...register('country')}
                    className={errors.country ? styles.errorInput : ''}
                  />
                  {errors.country && <span className={styles.error}>{errors.country.message}</span>}
                </div>

                <div className={styles.fieldRow}>
                  <label htmlFor="zip" className={styles.fieldLabel}>
                    {t('zip', { fallback: 'Postal Code' })}
                  </label>
                  <input
                    id="zip"
                    {...register('zip')}
                    className={errors.zip ? styles.errorInput : ''}
                  />
                  {errors.zip && <span className={styles.error}>{errors.zip.message}</span>}
                </div>

                <div className={styles.fieldRow}>
                  <label htmlFor="phone" className={styles.fieldLabel}>
                    {t('phone', { fallback: 'Phone number' })}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={errors.phone ? styles.errorInput : ''}
                  />
                  {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                </div>

                <div className={styles.fieldRow}>
                  <label htmlFor="email" className={styles.fieldLabel}>
                    {t('email', { fallback: 'Email' })}
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={errors.email ? styles.errorInput : ''}
                  />
                  {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>
              </div>
            </section>

            {/**<section
              className={`${styles.infoCard} ${styles.centeredCard}`}
              aria-labelledby="checkout-currency-title"
            >
              <div className={styles.narrowContent}>
                <h2 id="checkout-currency-title" className={styles.cardTitle}>
                  {t('currencyTitle', { fallback: 'Your Currency' })}
                </h2>
                <div className={styles.staticRow}>
                  <span className={styles.fieldLabel}>
                    {t('currencyValue', { fallback: 'EUR' })}
                  </span>
                  <svg width="24" height="19" viewBox="0 0 24 19" fill="none" aria-hidden="true">
                    <path
                      d="M5 7L12 14L19 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </section> */}

            <section className={styles.infoCard} aria-labelledby="checkout-payment-title">
              <h2 id="checkout-payment-title" className={styles.cardTitle}>
                {t('paymentMethod', { fallback: 'Payment Method' })}
              </h2>
              <div className={styles.staticRow}>
                <span className={styles.fieldLabel}>
                  {t('bankTransferShort', { fallback: 'Bank Transfer *' })}
                </span>
              </div>
              <p className={styles.paymentText}>
                {t('paymentMethodNote', {
                  fallback:
                    '* Please check your inbox for a detailed overview of your selected experience along with our secure bank transfer instructions.',
                })}
              </p>
              <p className={styles.paymentText}>
                {t('paymentMethodFollowup', {
                  fallback: 'Your journey is already taking shape.',
                })}
              </p>
            </section>

            <section
              className={styles.complianceSection}
              aria-label={t('orderRequirements', { fallback: 'Order requirements' })}
            >
              <label className={styles.checkboxRow}>
                <input type="checkbox" {...register('termsAccepted')} />
                <span>
                  {t('termsOfUse', {
                    fallback: "I have read and agree to the website's Terms of Use.",
                  })}
                </span>
              </label>
              {errors.termsAccepted && (
                <span className={styles.error}>{errors.termsAccepted.message}</span>
              )}

              <label className={styles.checkboxRow}>
                <input type="checkbox" {...register('refundPolicyAccepted')} />
                <span>
                  {t('refundPolicy', {
                    fallback: 'I have read and agree to the Refund Policy.',
                  })}
                </span>
              </label>
              {errors.refundPolicyAccepted && (
                <span className={styles.error}>{errors.refundPolicyAccepted.message}</span>
              )}

              {ENABLE_RECAPTCHA && (
                <div className={styles.captchaWrap}>
                  <ReCAPTCHA
                    key={recaptchaKey}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
                    onChange={handleRecaptchaChange}
                  />
                  {errors.recaptcha && (
                    <span className={styles.error}>{errors.recaptcha.message}</span>
                  )}
                </div>
              )}
            </section>
          </div>

          <div className={styles.submitRow}>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              <ArrowIcon />
              <span>
                {isSubmitting
                  ? t('submitting', { fallback: 'Submitting...' })
                  : t('submitOrder', { fallback: 'Submit Order' })}
              </span>
            </button>
          </div>
        </div>
      </form>
    </CheckoutPageShell>
  );
};
