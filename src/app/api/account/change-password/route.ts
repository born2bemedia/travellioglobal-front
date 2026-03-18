import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json(
        { message: "Server URL is not configured." },
        { status: 500 },
      );
    }

    const token = (await cookies()).get(COOKIE_NAME as string)?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const meRes = await fetch(`${SERVER_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    if (!meRes.ok) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const meData = (await meRes.json()) as { user?: { id: string; email?: string } };
    const userId = meData.user?.id;
    const email = meData.user?.email;
    if (!userId || !email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { currentPassword: string; newPassword: string };
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Current password and new password are required." },
        { status: 400 },
      );
    }

    const loginRes = await fetch(`${SERVER_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password: currentPassword }),
    });

    if (!loginRes.ok) {
      return NextResponse.json(
        { message: "The wrong password. Try again." },
        { status: 400 },
      );
    }

    const updateRes = await fetch(`${SERVER_URL}/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({ password: newPassword }),
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      const data = (() => {
        try {
          return JSON.parse(errText) as { errors?: Array<{ message?: string }> };
        } catch {
          return {};
        }
      })();
      return NextResponse.json(
        { message: data.errors?.[0]?.message ?? "Password update failed." },
        { status: updateRes.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Change password error:", message);
    return NextResponse.json({ message: "Password update failed." }, { status: 500 });
  }
}
