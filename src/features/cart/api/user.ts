"use server";

import sgMail from "@sendgrid/mail";

const SERVER_URL = process.env.SERVER_URL;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export type UserData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type User = {
  id: string;
  email: string;
  [key: string]: unknown;
};

/**
 * Генерує випадковий пароль
 */
function generatePassword(): string {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

/**
 * Перевіряє чи існує користувач з вказаним email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  if (!SERVER_URL) {
    throw new Error("SERVER_URL is not configured");
  }

  try {
    const response = await fetch(
      `${SERVER_URL}/api/users?where[email][equals]=${encodeURIComponent(email)}&limit=1`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      const errorText = await response.text();
      console.error(`Failed to find user: ${response.status} - ${errorText}`);
      throw new Error(`Failed to find user: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as { docs?: User[] };
    
    if (data.docs && data.docs.length > 0) {
      return data.docs[0];
    }

    return null;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}

/**
 * Створює нового користувача з автоматично згенерованим паролем
 */
export async function createUser(userData: UserData): Promise<{ user: User; password: string }> {
  if (!SERVER_URL) {
    throw new Error("SERVER_URL is not configured");
  }

  const password = generatePassword();

  const userPayload = {
    email: userData.email,
    password: password,
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone,
  };

  try {
    const response = await fetch(`${SERVER_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to create user: ${response.status} - ${errorText}`);
      try {
        const errJson = JSON.parse(errorText) as { errors?: Array<{ message?: string }> };
        if (errJson.errors?.length) {
          console.error("Payload errors:", JSON.stringify(errJson.errors, null, 2));
        }
      } catch {
        // ignore
      }
      throw new Error(`Failed to create user: ${response.status} - ${errorText}`);
    }

    const user = (await response.json()) as User;

    // Відправляємо email з credentials
    if (SENDGRID_API_KEY && FROM_EMAIL) {
      try {
        // Escape HTML to prevent XSS
        const escapeHtml = (text: string) => {
          return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        };

        const safeFirstName = escapeHtml(userData.firstName);
        const safeEmail = escapeHtml(userData.email);
        const safePassword = escapeHtml(password);

        const welcomeEmailHtml = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Received - Estanora</title>
</head>

<body
    style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #121212;">

        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation"
                    style="max-width: 640px; width: 100%; border-collapse: collapse; background-color: #121212;overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 0;height: 100px;">

                            <img style="width: 100%;height: auto;" src="https://estanora.com/images/mail-header.png"
                                alt="Estanora Logo">
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 32px;background: #000;">
                            <p style="margin: 0 0 32px; color: rgba(204, 204, 204, 0.40);
                            font-size: 42px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;">
                                Dear ${safeFirstName},
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                Congratulations! You have successfully registered an account with <b>Estanora</b>.
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                Here are your account credentials for reference:
                            </p>

                            <p style="margin: 0 0 12px; 
                            background: rgba(255, 255, 255, 0.05);
                            padding: 12px;
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;
                            width: fit-content;">
                                Email:&nbsp;&nbsp;
                                <span style="color: #FFF;font-weight: 400;">${safeEmail}</span>
                            </p>
                            <p style="margin: 0 0 24px; 
                            background: rgba(255, 255, 255, 0.05);
                            padding: 12px;
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;
                            width: fit-content;">
                                Password:&nbsp;&nbsp;
                                <span style="color: #FFF;font-weight: 400;">${safePassword}</span>
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                You can now log in and start exploring our real estate consulting services.
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                We're excited to help you make informed property decisions.
                            </p>

                            <p style="margin: 0; color: #FFF;
                            font-size: 20px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;">
                                Happy real estate consulting!<br>
                                <strong style="color: #ffffff;">The Estanora Team</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="border-top: 1px solid #222; padding: 24px 30px; background: #000;">
                            <a href="mailto:info@estanora.com" style="color: #FFF;
                            font-size: 10px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;
                            text-transform: uppercase;
                            float: left;
                            text-decoration: none;">
                                <img style="margin-right: 8px;margin-bottom: -2px;" width="14" height="14"
                                    src="https://estanora.com/images/mail-icon.png" alt="Estanora Mail Icon">
                                info@estanora.com
                            </a>
                            <img style="width: 124.695px;height: 20px; float: right;"
                                src="https://estanora.com/images/mail-logo.png" alt="Estanora Mail Icon">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
        `;

        const registrationMsg = {
          to: userData.email,
          from: FROM_EMAIL,
          subject: "Welcome to Estanora – Your Account is Ready",
          html: welcomeEmailHtml,
        };

        await sgMail.send(registrationMsg);
        console.log(`Registration email sent to ${userData.email}`);
      } catch (emailError) {
        console.error("Error sending registration email:", emailError);
        // Не зупиняємо процес, якщо email не відправився
      }
    }

    return { user, password };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export type EnsureUserResult = {
  userId: string;
  isNewUser: boolean;
  /** Тільки якщо isNewUser — тимчасовий пароль для автоматичного логіну після покупки */
  password?: string;
};

/**
 * Перевіряє чи існує користувач, якщо ні - створює нового.
 * Повертає userId, чи був створений новий користувач, та пароль (якщо новий) для логіну після покупки.
 */
export async function ensureUser(userData: UserData): Promise<EnsureUserResult> {
  try {
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
      console.log(`User already exists: ${userData.email}`);
      return { userId: existingUser.id, isNewUser: false };
    }

    console.log(`Creating new user: ${userData.email}`);
    const { user, password } = await createUser(userData);
    return { userId: user.id, isNewUser: true, password };
  } catch (error) {
    console.error("Error ensuring user:", error);
    throw error;
  }
}
