'use client';

import styles from '@/features/account/ui/LoginForm/LoginForm.module.scss';

import { Button } from '@/shared/ui/kit/button/Button';

import { Link } from '@/i18n/navigation';

type AuthSuccessMessageProps = {
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export const AuthSuccessMessage = ({
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: AuthSuccessMessageProps) => {
  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{description}</p>
      </div>

      <div className={styles.formWrapper}>
        <Button type="link" variant="blue" url={primaryCtaHref}>
          {primaryCtaLabel}
        </Button>

        {secondaryCtaLabel && secondaryCtaHref && (
          <Link href={secondaryCtaHref} className={styles.signupLink}>
            {secondaryCtaLabel}
          </Link>
        )}
      </div>
    </div>
  );
};
