'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { isOrderCompleted, type Order } from '@/features/account/model/orders.types';

import styles from './AccountPage.module.scss';

type OrderRow = {
  id: string;
  orderId: string;
  tourName: string;
  quantity: number;
  purchaseDate: string;
  totalPrice: string;
  paymentMethod: string;
  orderStatus: string;
  invoiceUrl?: string | null;
};

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value);
}

function formatTitle(value: string) {
  if (!value) {
    return '—';
  }

  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function mapOrdersToRows(orders: Order[]): OrderRow[] {
  console.log(orders);
  return orders.map((order) => {
    const orderId = order.orderNumber ?? order.id;
    const tourName =
      order.items
        ?.map((item) => item.product?.trim())
        .filter(Boolean)
        .join(', ') || '—';
    const quantity = order.items?.reduce((total, item) => total + (item.quantity ?? 0), 0) ?? 0;

    console.log(order.status);
    console.log(isOrderCompleted(order.status) ? order.invoiceDownloadUrl : null);

    return {
      id: order.id,
      orderId,
      tourName,
      quantity,
      purchaseDate: formatDate(order.createdAt),
      totalPrice: formatCurrency(order.total ?? 0),
      paymentMethod: formatTitle(order.paymentMethod),
      orderStatus: formatTitle(order.status),
      invoiceUrl: isOrderCompleted(order.status) ? order.invoiceDownloadUrl : null,
    };
  });
}

export const AccountBookingsPanel = () => {
  const t = useTranslations('accountPage');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/account/orders', { credentials: 'include' });
        const payload = (await response.json()) as { orders?: Order[] };

        if (!cancelled) {
          setOrders(payload.orders ?? []);
        }
      } catch {
        if (!cancelled) {
          setOrders([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  const rows = mapOrdersToRows(orders);
  const columns = [
    t('bookings.columns.orderId', { fallback: 'Order ID' }),
    t('bookings.columns.tourName', { fallback: 'Tour Name' }),
    t('bookings.columns.quantity', { fallback: 'Quantity' }),
    t('bookings.columns.purchaseDate', { fallback: 'Purchase Date' }),
    t('bookings.columns.totalPrice', { fallback: 'Total Price' }),
    t('bookings.columns.paymentMethod', { fallback: 'Payment Method' }),
    t('bookings.columns.orderStatus', { fallback: 'Order Status' }),
    t('bookings.columns.invoice', { fallback: 'Invoice' }),
  ];

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>
          {t('bookings.title', { fallback: 'Your Travel History & Upcoming Adventures' })}
        </h2>
        <p className={styles.panelDescription}>
          {t('bookings.description', {
            fallback:
              "Here you'll find a complete overview of your past and upcoming experiences. Review order details, download invoices, and track the status of your bookings — all with clarity and ease.",
          })}
        </p>
        <p className={styles.panelNote}>
          {t('bookings.note', {
            fallback: 'Every trip tells a story. This is where yours are stored.',
          })}
        </p>
      </div>

      {loading ? (
        <p className={styles.stateText}>{t('bookings.loading', { fallback: 'Loading your bookings...' })}</p>
      ) : rows.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateTitle}>
            {t('bookings.emptyTitle', { fallback: 'No bookings just yet.' })}
          </p>
          <p className={styles.emptyStateBody}>
            {t('bookings.emptyBody', {
              fallback:
                'When your first journey is booked, it will appear here with payment details and invoice access.',
            })}
          </p>
        </div>
      ) : (
        <>
          <div className={styles.bookingsTableWrap}>
            <table className={styles.bookingsTable}>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.orderId}</td>
                    <td className={styles.tourNameCell}>{row.tourName}</td>
                    <td>{row.quantity}</td>
                    <td>{row.purchaseDate}</td>
                    <td>{row.totalPrice}</td>
                    <td>{row.paymentMethod}</td>
                    <td>{row.orderStatus}</td>
                    <td>
                      {row.invoiceUrl ? (
                        <a
                          href={row.invoiceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.inlineAction}
                        >
                          {t('bookings.download', { fallback: 'Download' })}
                        </a>
                      ) : (
                        <span className={styles.inlineActionMuted}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.mobileBookingList}>
            {rows.map((row) => (
              <article key={row.id} className={styles.mobileBookingCard}>
                <div className={styles.mobileBookingGrid}>
                  <div className={styles.mobileBookingItem}>
                    <span className={styles.mobileBookingLabel}>
                      {t('bookings.columns.orderId', { fallback: 'Order ID' })}
                    </span>
                    <span className={styles.mobileBookingValue}>{row.orderId}</span>
                  </div>

                  <div className={styles.mobileBookingItem}>
                    <span className={styles.mobileBookingLabel}>
                      {t('bookings.columns.quantity', { fallback: 'Quantity' })}
                    </span>
                    <span className={styles.mobileBookingValue}>{row.quantity}</span>
                  </div>

                  <div className={`${styles.mobileBookingItem} ${styles.mobileBookingItemWide}`}>
                    <span className={styles.mobileBookingLabel}>
                      {t('bookings.columns.tourName', { fallback: 'Tour Name' })}
                    </span>
                    <span className={styles.mobileBookingValue}>{row.tourName}</span>
                  </div>

                  <div className={styles.mobileBookingItem}>
                    <span className={styles.mobileBookingLabel}>
                      {t('bookings.columns.purchaseDate', { fallback: 'Purchase Date' })}
                    </span>
                    <span className={styles.mobileBookingValue}>{row.purchaseDate}</span>
                  </div>

                  <div className={styles.mobileBookingItem}>
                    <span className={styles.mobileBookingLabel}>
                      {t('bookings.columns.totalPrice', { fallback: 'Total Price' })}
                    </span>
                    <span className={styles.mobileBookingValue}>{row.totalPrice}</span>
                  </div>

                  <div className={styles.mobileBookingItem}>
                    <span className={styles.mobileBookingLabel}>
                      {t('bookings.columns.paymentMethod', { fallback: 'Payment Method' })}
                    </span>
                    <span className={styles.mobileBookingValue}>{row.paymentMethod}</span>
                  </div>

                  <div className={styles.mobileBookingItem}>
                    <span className={styles.mobileBookingLabel}>
                      {t('bookings.columns.orderStatus', { fallback: 'Order Status' })}
                    </span>
                    <span className={styles.mobileBookingValue}>{row.orderStatus}</span>
                  </div>

                  <div className={`${styles.mobileBookingItem} ${styles.mobileBookingItemWide}`}>
                    <span className={styles.mobileBookingLabel}>
                      {t('bookings.columns.invoice', { fallback: 'Invoice' })}
                    </span>
                    {row.invoiceUrl ? (
                      <a
                        href={row.invoiceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.inlineAction}
                      >
                        {t('bookings.download', { fallback: 'Download' })}
                      </a>
                    ) : (
                      <span className={styles.inlineActionMuted}>—</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
