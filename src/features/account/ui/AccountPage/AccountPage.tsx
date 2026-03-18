'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { MyOrdersPage } from '@/features/account';
import { useAuthStore } from '@/features/account/store/auth';
import { ChangePasswordForm } from '@/features/account/ui/AccountSettingsPage/ChangePasswordForm/ChangePasswordForm';
import { ContactDataForm } from '@/features/account/ui/AccountSettingsPage/ContactDataForm/ContactDataForm';

import { Button } from '@/shared/ui/kit/button/Button';

import styles from './AccountPage.module.scss';

import { useRouter } from '@/i18n/navigation';

export const AccountPage = () => {
  const t = useTranslations('accountPage');
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const logout = useAuthStore((s) => s.logout);

  const tabTwoTitle = t('tabTwoTitle', { fallback: 'Account Management' });

  const tabs = [
    {
      id: 'tab1',
      title: t('tabOneTitle', {
        fallback: 'Project History',
      }),
    },
    {
      id: 'tab2',
      title: tabTwoTitle,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isInitialized) return;
    if (!user) {
      router.replace('/log-in');
    }
  }, [isInitialized, user, router]);

  if (!isInitialized || !user) {
    return (
      <section className={styles.section}>
        <p className={styles.loadingText}>{t('loading', { fallback: 'Loading...' })}</p>
      </section>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/log-in');
  };

  return (
    <section className={styles.account}>
      <div className="container">
        <div className={styles.account__top}>
          <h1 className={styles.account__title}>
            {t('mainTitle', { fallback: 'Welcome' })}, {user?.firstName} {user?.lastName}
          </h1>
          <Button type="button" variant="black" onClick={handleLogout}>
            {t('logOutLinkTitle', { fallback: 'Log Out' })}
          </Button>
        </div>

        <div className={styles.account__content}>
          <div className={styles.account__left_column}>
            <p className={styles.account__content_title}>
              {t('contentTitle', {
                fallback:
                  'This is your strategic hub for managing engagements, refining your profile, and downloading strategic documents.',
              })}
            </p>
            <ul className={styles.account__content_list}>
              <li className={styles.account__content_item}>
                <p className={styles.account__content_item_info}>
                  <strong>
                    {t('itemOneTitle', {
                      fallback: 'Project History:',
                    })}
                  </strong>{' '}
                  {t('itemOneDescription', {
                    fallback: 'Review past engagements, download invoices, and deliverables.',
                  })}
                </p>
              </li>
              <li className={styles.account__content_item}>
                <p className={styles.account__content_item_info}>
                  <strong>
                    {t('itemTwoTitle', {
                      fallback: 'Account Management:',
                    })}
                  </strong>{' '}
                  {t('itemTwoDescription', {
                    fallback: 'Update your professional details and preferences.',
                  })}
                </p>
              </li>
            </ul>
          </div>

          <div className={styles.account__right_column}>
            <div className={styles.account__right_column_image_wrapper}>
              <Image
                src="/images/clients/hero-icon.svg"
                alt="Clients Hero"
                width={132}
                height={132}
                className="adaptive-image"
              />
            </div>
          </div>
        </div>

        <div className={styles.account__info}>
          <div className={styles.account__tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.account__tab} ${activeTab === tab.id ? styles.account__tab_active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {activeTab === 'tab1' && <MyOrdersPage />}

          {activeTab === 'tab2' && (
            <div className={styles.account__tab_inner}>
              <h2 className={styles.account__tab_title}>{tabTwoTitle}</h2>
              <div>
                <ContactDataForm user={user} />

                <div className={styles.account__tab_divider}></div>

                <ChangePasswordForm />
              </div>
              <div className={styles.account__info_image}>
                <Image
                  src="/images/connect/form-image.png"
                  alt="Image"
                  width={948}
                  height={1264}
                  className="adaptive-image"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>

    // <section className={styles.section}>
    //   <div className="container">
    //     <h1 className={styles.title}>{t('title', { fallback: 'My orders' })}</h1>
    //     {loading ? (
    //       <p className={styles.loadingText}>{t('loading', { fallback: 'Loading...' })}</p>
    //     ) : rows.length === 0 ? (
    //       <p className={styles.empty}>{t('noServices', { fallback: 'You have no orders yet.' })}</p>
    //     ) : (
    //       <div className={styles.orders}>
    //         {rows.slice(0, 2).map((row) => (
    //           <div className={styles.order} key={`${row.orderId}-${row.itemIndex}`}>
    //             <h3 className={styles.serviceName}>{row.service}</h3>
    //             {row.description && <p className={styles.description}>{row.description}</p>}
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //     <p className={styles.back}>
    //       <Button url="/account/my-orders" variant="white" type="link">
    //         {t('allOrders', { fallback: 'Check all orders' })}
    //       </Button>
    //     </p>
    //   </div>
    // </section>
  );
};
