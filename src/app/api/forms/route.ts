import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

import { verifyRecaptcha } from '@/shared/lib/recaptcha';

const ENABLE_RECAPTCHA = true;

type RequestPayload = {
  service: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  website: string;
  message: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as {
      formType: 'request';
      data: RequestPayload & { recaptcha?: string };
    };

    const { formType } = body;
    const rawData = body.data as RequestPayload & { recaptcha?: string };

    const recaptcha = rawData.recaptcha;

    if (ENABLE_RECAPTCHA) {
      if (!recaptcha || recaptcha === 'disabled') {
        return NextResponse.json(
          { message: 'reCAPTCHA verification is required.' },
          { status: 400 }
        );
      }
      const isValid = await verifyRecaptcha(recaptcha);
      if (!isValid) {
        return NextResponse.json(
          { message: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    const { recaptcha: _recaptcha, ...data } = rawData as Record<string, unknown> & {
      recaptcha?: string;
    };
    void _recaptcha;

    const apiKey = process.env.SENDGRID_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;

    if (!apiKey || !adminEmail || !fromEmail) {
      console.error('SENDGRID_API_KEY, ADMIN_EMAIL or FROM_EMAIL is not set');
      return NextResponse.json({ message: 'Email configuration is missing.' }, { status: 500 });
    }

    sgMail.setApiKey(apiKey);

    // Escape HTML to prevent XSS
    const escapeHtml = (text: string | undefined | null) => {
      if (text == null) return '';
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    let subject: string;
    let html: string;
    let userEmail: string | undefined;

    if (formType === 'request') {
      const d = data as RequestPayload;
      console.log(d);
      userEmail = d.email;
      subject = 'Request';
      html = `
        <h2>Request</h2>
        <p><strong>Service:</strong> ${escapeHtml(d.service)}</p>
        <p><strong>Company name:</strong> ${escapeHtml(d.companyName)}</p>
        <p><strong>Website:</strong> ${escapeHtml(d.website)}</p>
        <p><strong>Message:</strong> ${escapeHtml(d.message)}</p>
        <p><strong>Full name:</strong> ${escapeHtml(d.fullName)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(d.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
      `;

      const msg = {
        to: adminEmail,
        from: fromEmail,
        subject,
        html,
      };

      const safeFirstName = escapeHtml(d.fullName.split(' ')[0] || d.fullName);

      const userMsg = {
        to: d.email,
        from: fromEmail,
        subject: "We've Received Your Request",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Request Received - Axelvior</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fff; color: #333;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 640px; width: 100%; border-collapse: collapse; background-color: #fff; overflow: hidden;">
          <tr>
            <td style="padding: 0; height: 100px;">
              <img style="width: 100%; height: auto;" src="https://travellioglobal.com/images/email-header.png" alt="Axelvior Logo">
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; background: #fff;">
              <p style="margin: 0 0 32px; color: #333;font-size: 24px;font-style: normal;font-weight: 400;line-height: 140%;">
                Dear ${safeFirstName},
              </p>
              <p style="margin: 0 0 24px; color: #333;font-size: 16px;font-style: normal;font-weight: 400;line-height: 140%;">
                Thank you for choosing Axelvior as your strategic partner. We have successfully received your request and are pleased to confirm your engagement.<br>
                Our team is currently reviewing your requirements to ensure our resources align with your business objectives.
              </p>
              <span style="display: block;padding: 20px;background:#384CE3;margin: 32px 0;color: #FFF;font-size: 14px;font-style: normal;font-weight: 400;line-height: 140%;">
                Engagement Summary:<br><br>
                <ul style="margin: 0;padding-left: 16px;">
                  <li>
                    Service: <strong>${escapeHtml(d.service)}</strong>
                  </li>
                </ul>
              </span>
              <p style="margin: 0 0 24px; color: #333;font-size: 16px;font-style: normal;font-weight: 400;line-height: 140%;">
                <b>What Happens Next?</b><br>
                You will receive an email shortly containing payment instructions. Once those details are finalized, we will move forward with the next phase of your project.<br>
                We look forward to a successful collaboration.
              </p>
              <p style="margin: 0 0 24px; color: #333;font-size: 16px;font-style: normal;font-weight: 400;line-height: 140%;">
                Best regards,<br>
                <strong style="color: #333;">The Axelvior Team</strong><br>
                <span style="font-size:16px;">
                  Strategic Solutions for Modern Business
                </span>
              </p>
              <p style="margin: 0; color: #333;font-size: 18px;font-style: normal;font-weight: 400;line-height: 140%;">
                <a href="https://travellioglobal.com" target="_blank" style="color: #333;font-weight: 400;text-decoration: underline;">travellioglobal.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0; height: 100px;">
              <img style="width: 100%; height: auto;" src="https://travellioglobal.com/images/email-footer.png" alt="Axelvior Logo">
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      };

      await sgMail.send(msg);
      await sgMail.send(userMsg);

      console.log(`Request confirmation email sent to ${userEmail}`);
    }
  } catch (error) {
    console.error('Error submitting request:', error);
    return NextResponse.json({ message: 'Failed to submit request' }, { status: 500 });
  }
  return NextResponse.json({ message: 'Request submitted successfully' }, { status: 200 });
}
