import { AuthSuccessMessage } from '@/features/account/ui/AuthSuccessMessage/AuthSuccessMessage';

export default function ForgotPasswordSuccessPage() {
  return (
    <section style={{ paddingTop: '80px', paddingBottom: '80px', background: '#f1f6fd' }}>
      <div className="container">
        <AuthSuccessMessage
          title="Check your email"
          description="If your account exists, we sent a password reset link to your email address."
          primaryCtaLabel="Back to log in"
          primaryCtaHref="/log-in"
          secondaryCtaLabel="Try another email"
          secondaryCtaHref="/forgot-password"
        />
      </div>
    </section>
  );
}
