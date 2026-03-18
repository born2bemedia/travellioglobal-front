import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;

type FilePayload = {
  file?: { url?: string; filename?: string } | number;
  filename?: string;
};

export type OrderItemPayload = {
  product: string;
  quantity: number;
  price: number;
  files?: FilePayload[];
};

type InvoicePayload = { url?: string; filename?: string } | number | null;

export type OrderPayload = {
  id: string;
  createdAt: string;
  orderNumber?: string;
  user: string | { id: string };
  items: OrderItemPayload[];
  total: number;
  status: string;
  invoice?: InvoicePayload;
};

export type OrderFileWithUrl = { name: string; url: string };

export async function GET(): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json(
        { message: "Server URL is not configured." },
        { status: 500 },
      );
    }

    const token = (await cookies()).get(COOKIE_NAME as string)?.value;
    if (!token) {
      return NextResponse.json({ orders: [] }, { status: 200 });
    }

    const meRes = await fetch(`${SERVER_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${token}`,
      },
    });

    if (!meRes.ok || meRes.status === 401 || meRes.status === 403) {
      return NextResponse.json({ orders: [] }, { status: 200 });
    }

    const meData = (await meRes.json()) as { user?: { id: string } };
    const userId = meData.user?.id;
    if (!userId) {
      return NextResponse.json({ orders: [] }, { status: 200 });
    }

    const ordersRes = await fetch(
      `${SERVER_URL}/api/orders?where[user][equals]=${userId}&sort=-createdAt&limit=100&depth=2`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${token}`,
        },
      },
    );

    if (!ordersRes.ok) {
      console.error("Orders fetch failed:", ordersRes.status, await ordersRes.text());
      return NextResponse.json({ orders: [] }, { status: 200 });
    }

    const ordersData = (await ordersRes.json()) as { docs?: OrderPayload[] };
    const rawOrders = ordersData.docs ?? [];
    const resolveItemFiles = (files: FilePayload[] | undefined): OrderFileWithUrl[] =>
      (files ?? []).map((f, i) => {
        const fileObj = typeof f.file === "object" && f.file && "url" in f.file ? f.file : null;
        const url = fileObj?.url ? (fileObj.url.startsWith("http") ? fileObj.url : `${SERVER_URL}${fileObj.url}`) : "";
        const name = f.filename ?? (fileObj as { filename?: string } | undefined)?.filename ?? `Document ${i + 1}`;
        return { name, url };
      }).filter((f) => f.url);

    const orders = rawOrders.map((order) => {
      const inv = order.invoice;
      let invoiceDownloadUrl: string | null = null;
      if (inv != null && typeof inv === "object" && "url" in inv && inv.url) {
        invoiceDownloadUrl = inv.url.startsWith("http") ? inv.url : `${SERVER_URL}${inv.url}`;
      }
      const itemsWithFiles = (order.items ?? []).map((item) => ({
        ...item,
        filesWithUrl: resolveItemFiles(item.files),
      }));
      return { ...order, invoiceDownloadUrl, items: itemsWithFiles };
    });
    return NextResponse.json({ orders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Account orders error:", message);
    return NextResponse.json({ orders: [] }, { status: 200 });
  }
}
