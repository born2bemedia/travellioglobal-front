import { AuthSuccessMessage } from '@/features/account/ui/AuthSuccessMessage/AuthSuccessMessage';

export default function SetPasswordSuccessPage() {
  return (
    <section style={{ paddingTop: '80px', paddingBottom: '80px', background: '#f1f6fd' }}>
      <div className="container">
        <AuthSuccessMessage
          title="Password updated"
          description="Your password has been changed successfully. You can now log in with your new password."
          primaryCtaLabel="Go to log in"
          primaryCtaHref="/log-in"
        />
      </div>
    </section>
  );
}
