import { useTranslations } from 'next-intl';

import { CheckoutPageShell } from '@/features/cart/ui/CheckoutPageShell/CheckoutPageShell';
import { CheckoutStatusCard } from '@/features/cart/ui/CheckoutStatusCard/CheckoutStatusCard';

export const EmptyCart = () => {
  const t = useTranslations('emptyCart');

  return (
    <CheckoutPageShell>
      <CheckoutStatusCard
        title={t('heading', {
          fallback: 'Your Cart Is Waiting for Adventure',
        })}
        paragraphs={[
          t('descriptionLead', {
            fallback: "Looks like it's feeling a little empty here.",
          }),
          t('description', {
            fallback:
              'No worries - the world is full of experiences ready to be added. From unforgettable tours to curated excursions, your next journey is just a few clicks away.',
          }),
        ]}
        prompt={t('prompt', {
          fallback: 'Why not start planning something extraordinary?',
        })}
        ctaLabel={t('cta', {
          fallback: "Let's Go Touring!",
        })}
        ctaHref="/tours"
      />
    </CheckoutPageShell>
  );
};
