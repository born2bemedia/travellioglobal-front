import { NextResponse } from "next/server";

const CACHE_TTL = 3 * 60 * 60 * 1000; // 3 hours
const cache = new Map<string, { data: MonthPrice[]; at: number }>();

type GroupedPriceEntry = {
  price: number;
  departure_at: string;
};

export type MonthPrice = {
  month: string; // YYYY-MM
  price: number;
};

export async function GET(request: Request): Promise<NextResponse> {
  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "API not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin") ?? "NYC";
  const destination = searchParams.get("destination") ?? "";
  const currency = searchParams.get("currency") ?? "usd";
  const oneWay = searchParams.get("one_way") ?? "false";
  const direct = searchParams.get("direct") ?? "false";
  const minTripDuration = searchParams.get("min_trip_duration") ?? "";
  const maxTripDuration = searchParams.get("max_trip_duration") ?? "";

  if (!destination) {
    return NextResponse.json({ error: "destination required" }, { status: 400 });
  }

  const cacheKey = [
    origin,
    destination,
    currency,
    oneWay,
    direct,
    minTripDuration,
    maxTripDuration,
  ].join("|");
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < CACHE_TTL) {
    return NextResponse.json({ data: hit.data });
  }

  const url = new URL("https://api.travelpayouts.com/aviasales/v3/grouped_prices");
  url.searchParams.set("currency", currency);
  url.searchParams.set("origin", origin);
  url.searchParams.set("destination", destination);
  url.searchParams.set("group_by", "month");
  url.searchParams.set("direct", direct);
  if (oneWay === "false") {
    if (minTripDuration) {
      url.searchParams.set("min_trip_duration", minTripDuration);
    }
    if (maxTripDuration) {
      url.searchParams.set("max_trip_duration", maxTripDuration);
    }
  }

  try {
    const res = await fetch(url.toString(), {
      headers: { "x-access-token": token },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "upstream error" }, { status: res.status });
    }

    const json = (await res.json()) as {
      success: boolean;
      data: Record<string, GroupedPriceEntry>;
    };

    if (!json.success || !json.data || typeof json.data !== "object") {
      return NextResponse.json({ error: "invalid response" }, { status: 502 });
    }

    const data: MonthPrice[] = Object.entries(json.data)
      .map(([month, entry]) => ({
        month: month.slice(0, 7),
        price: entry.price,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    cache.set(cacheKey, { data, at: Date.now() });
    return NextResponse.json({ data });
  } catch (err) {
    console.error("[flight-prices/monthly]", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
