'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { isOrderCompleted, type Order } from '@/features/account/model/orders.types';
import { useAuthStore } from '@/features/account/store/auth';

import { Button } from '@/shared/ui/kit/button/Button';

import styles from './MyOrdersPage.module.scss';

import { useRouter } from '@/i18n/navigation';

type OrderRow = {
  orderId: string;
  orderNumber: string;
  date: string;
  service: string;
  quantity: number;
  total: number;
  status: string;
  order: Order;
  paymentMethod: string;
  deliverables: string;
};

function formatDate(createdAt: string): string {
  try {
    const d = new Date(createdAt);

    const year = d.getFullYear();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');

    return `${year}-${day}-${month}`;
  } catch {
    return createdAt;
  }
}

function formatNumber(value: number): string {
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const MyOrdersPage = () => {
  const t = useTranslations('myOrdersPage');
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isInitialized) return;
    if (!user) {
      router.replace('/log-in');
    }
  }, [isInitialized, user, router]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/account/orders', { credentials: 'include' });
        const data = (await res.json()) as { orders?: Order[] };
        if (!cancelled) setOrders(data.orders ?? []);
      } catch {
        if (!cancelled) setOrders([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const rows: OrderRow[] = orders.map((order) => {
    const orderNumber = order.orderNumber ?? order.id;
    const date = formatDate(order.createdAt);
    const status = order.status ?? 'Pending';
    const service =
      (
        order.items?.map((item) => {
          return item.product ?? '—';
        }) ?? []
      ).join('\n') || '—';
    const quantity = order.items?.reduce((sum, item) => sum + (item.quantity ?? 0), 0) ?? 0;
    const total = order.total ?? 0;
    return {
      orderId: order.id,
      orderNumber,
      date,
      service,
      quantity,
      total,
      status,
      order,
      paymentMethod: order.paymentMethod,
      deliverables: order.deliverables,
    };
  });

  const labels = {
    serviceOrdered: t('serviceOrdered', { fallback: 'Service Ordered' }),
    orderId: t('orderId', { fallback: 'Order ID' }),
    total: t('total', { fallback: 'Total Price' }),
    paymentMethod: t('paymentMethod', { fallback: 'Payment Method' }),
    status: t('status', { fallback: 'Order Status' }),
    invoice: t('invoice', { fallback: 'Invoice' }),
    deliverables: t('deliverablesBold', { fallback: 'Deliverables' }),
    download: t('download', { fallback: 'Download' }),
  };

  if (!isInitialized || !user) {
    return (
      <section className={styles.section}>
        <div className="container">
          <p className={styles.loadingText}>{t('loading', { fallback: 'Loading...' })}</p>
        </div>
      </section>
    );
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{t('title', { fallback: 'Project History' })}</h2>
      {loading ? (
        <p className={styles.loadingText}>{t('loading', { fallback: 'Loading orders...' })}</p>
      ) : rows.length === 0 ? (
        <p className={styles.empty}>{t('noOrders', { fallback: 'You have no orders yet.' })}</p>
      ) : (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{labels.orderId}</th>
                  <th>{labels.serviceOrdered}</th>
                  <th>{t('date', { fallback: 'Purchase Date' })}</th>
                  <th>{labels.total}</th>
                  <th>{labels.paymentMethod}</th>
                  <th>{labels.status}</th>
                  <th>{labels.invoice}</th>
                  <th>
                    {t('deliverablesBold', { fallback: 'Deliverables' })}
                    <br />
                    <span>{labels.deliverables}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.orderId}>
                    <td className={styles.date}>{row.orderNumber}</td>
                    <td className={styles.serviceCell}>{row.service}</td>
                    <td className={styles.orderNumber}>{row.date}</td>
                    <td className={styles.total}>€{formatNumber(row.total)}</td>
                    <td className={styles.paymentMethod}>{row.paymentMethod}</td>
                    <td className={styles.status}>{row.status}</td>
                    <td className={styles.invoice}>
                      {isOrderCompleted(row.status) && row.order.invoiceDownloadUrl ? (
                        <Button url={row.order.invoiceDownloadUrl} variant="white" type="link">
                          {labels.download}
                        </Button>
                      ) : (
                        <span className={styles.downloadBtnDisabled}>{labels.download}</span>
                      )}
                    </td>
                    <td className={styles.deliverables}>
                      {row.deliverables ? (
                        <Button url={row.deliverables} variant="white" type="link">
                          {labels.download}
                        </Button>
                      ) : (
                        <span className={styles.downloadBtnDisabled}>{labels.download}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.tableWrap_mobile}>
            {rows.map((row) => (
              <div key={row.orderId} className={styles.tableWrap_mobile__item}>
                <p className={styles.tableWrap_mobile__item_date}>{row.date}</p>
                <p className={styles.tableWrap_mobile__item_title}>{labels.serviceOrdered}</p>
                <p className={styles.tableWrap_mobile__item_service}>{row.service}</p>
                <div className={styles.tableWrap_mobile__item_row}>
                  <div>
                    <p className={styles.tableWrap_mobile__item_title}>{labels.orderId}</p>
                    <p className={styles.tableWrap_mobile__item_value}>{row.orderNumber}</p>
                  </div>

                  <div>
                    <p className={styles.tableWrap_mobile__item_title}>{labels.total}</p>
                    <p className={styles.tableWrap_mobile__item_value}>{row.total}</p>
                  </div>

                  <div>
                    <p className={styles.tableWrap_mobile__item_title}>{labels.paymentMethod}</p>
                    <p className={styles.tableWrap_mobile__item_value}>{row.paymentMethod}</p>
                  </div>

                  <div>
                    <p className={styles.tableWrap_mobile__item_title}>{labels.status}</p>
                    <p className={styles.tableWrap_mobile__item_value}>{row.status}</p>
                  </div>

                  <div>
                    <p className={styles.tableWrap_mobile__item_title}>{labels.invoice}</p>
                    {isOrderCompleted(row.status) && row.order.invoiceDownloadUrl ? (
                      <Button url={row.order.invoiceDownloadUrl} variant="white" type="link">
                        {labels.download}
                      </Button>
                    ) : (
                      <span className={styles.downloadBtnDisabled}>{labels.download}</span>
                    )}
                  </div>

                  <div>
                    <p className={styles.tableWrap_mobile__item_title}>{labels.deliverables}</p>
                    <p>
                      {row.deliverables ? (
                        <Button url={row.deliverables} variant="white" type="link">
                          {labels.download}
                        </Button>
                      ) : (
                        <span className={styles.downloadBtnDisabled}>{labels.download}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
