import { NextResponse } from "next/server";

const SERVER_URL = process.env.SERVER_URL;

export type OrderPayload = {
  items: Array<{ product: string; quantity: number; price: number }>;
  total: number;
  status: string;
  paymentMethod: string;
  orderNotes?: string;
  billingAddress: {
    address1: string;
    address2?: string;
    city: string;
    state?: string;
    zip: string;
    country: string;
  };
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json(
        { message: "Server URL is not configured." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as OrderPayload;

    if (!body.items?.length || typeof body.total !== "number") {
      return NextResponse.json(
        { message: "Invalid request: items and total are required." },
        { status: 400 }
      );
    }

    const billing = body.billingAddress ?? {};
    const billingAddress: OrderPayload["billingAddress"] = {
      address1: billing.address1 ?? "",
      city: billing.city ?? "",
      zip: billing.zip ?? "",
      country: billing.country ?? "",
    };
    if (billing.address2) billingAddress.address2 = billing.address2;
    if (billing.state) billingAddress.state = billing.state;

    const payload = {
      items: body.items,
      total: body.total,
      status: "pending",
      paymentMethod: body.paymentMethod ?? "Bank Transfer",
      ...(body.orderNotes != null && body.orderNotes !== ""
        ? { orderNotes: body.orderNotes }
        : {}),
      billingAddress,
    };

    const payloadUrl = `${SERVER_URL}/api/orders`;
    // 500 "Something went wrong" = error from Payload backend. Check Payload server logs
    // and Orders collection beforeChange hook (find + sort "-createdAt", orderNumber).
    console.log("Sending order to Payload:", payloadUrl);

    const res = await fetch(payloadUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const resBody = await res.text();
    let parsed: { errors?: Array<{ message?: string; field?: string }> } = {};
    try {
      parsed = JSON.parse(resBody);
    } catch {
      parsed = {};
    }

    if (!res.ok) {
      const firstError =
        parsed.errors?.[0]?.message ??
        (resBody || `Server returned ${res.status}`);
      console.error("Payload orders error:", res.status, resBody);
      return NextResponse.json(
        { message: "Failed to create order.", error: firstError },
        { status: res.status }
      );
    }

    const data = parsed as Record<string, unknown>;
    return NextResponse.json(
      Object.keys(data).length ? data : { ok: true, doc: resBody }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error creating order:", errorMessage);
    return NextResponse.json(
      { message: "Failed to create order.", error: errorMessage },
      { status: 500 }
    );
  }
}
