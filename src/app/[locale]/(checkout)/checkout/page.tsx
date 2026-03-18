'use client';

import { useEffect } from 'react';

import type { Metadata } from 'next';

import { useCartStore } from '@/features/cart';
import { CheckoutForm } from '@/features/cart/ui/CheckoutForm/CheckoutForm';
import { EmptyCart } from '@/features/cart/ui/EmptyCart/EmptyCart';

import styles from './page.module.scss';

export default function CheckoutPage() {
  const setIsLoading = useCartStore((state) => state.setIsLoading);
  const isLoading = useCartStore((state) => state.isLoading);
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [totalItems, setIsLoading]);

  const isEmpty = totalItems === 0;
  if (isLoading) {
    return <section className={styles.loading}></section>;
  } else if (isEmpty && !isLoading) {
    return <EmptyCart />;
  } else {
    return <CheckoutForm />;
  }
}
