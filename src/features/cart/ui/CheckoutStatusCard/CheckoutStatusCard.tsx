import styles from './CheckoutStatusCard.module.scss';

import { Link } from '@/i18n/navigation';

type CheckoutStatusCardProps = {
  title: string;
  paragraphs: string[];
  prompt: string;
  ctaLabel: string;
  ctaHref: string;
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

export const CheckoutStatusCard = ({
  title,
  paragraphs,
  prompt,
  ctaLabel,
  ctaHref,
}: CheckoutStatusCardProps) => {
  return (
    <section className={styles.card} aria-labelledby="checkout-status-title">
      <div className={styles.card__body}>
        <h1 id="checkout-status-title" className={styles.card__title}>
          {title}
        </h1>

        <div className={styles.card__text}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className={styles.card__footer}>
        <p className={styles.card__prompt}>{prompt}</p>
        <Link href={ctaHref} className={styles.card__cta}>
          <ArrowIcon />
          <span>{ctaLabel}</span>
        </Link>
      </div>
    </section>
  );
};
