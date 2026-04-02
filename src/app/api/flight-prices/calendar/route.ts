import { NextResponse } from "next/server";

const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const cache = new Map<string, { data: DayPrice[]; at: number }>();

type TpEntry = {
  depart_date: string;
  value: number;
};

export type DayPrice = {
  date: string; // YYYY-MM-DD
  price: number;
};

const getDaysInMonth = (yearMonth: string): number => {
  const [year, month] = yearMonth.split("-").map(Number);
  return new Date(year, month, 0).getDate();
};

export async function GET(request: Request): Promise<NextResponse> {
  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "API not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin") ?? "NYC";
  const destination = searchParams.get("destination") ?? "";
  const yearMonth = searchParams.get("yearMonth") ?? ""; // YYYY-MM
  const oneWay = searchParams.get("one_way") ?? "false";
  const currency = searchParams.get("currency") ?? "usd";

  if (!destination || !yearMonth) {
    return NextResponse.json(
      { error: "destination and yearMonth required" },
      { status: 400 },
    );
  }

  const cacheKey = `${origin}|${destination}|${yearMonth}|${oneWay}|${currency}`;
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < CACHE_TTL) {
    return NextResponse.json({ data: hit.data });
  }

  const url = new URL("https://api.travelpayouts.com/v2/prices/month-matrix");
  url.searchParams.set("currency", currency);
  url.searchParams.set("origin", origin);
  url.searchParams.set("destination", destination);
  url.searchParams.set("month", `${yearMonth}-01`);
  url.searchParams.set("limit", String(getDaysInMonth(yearMonth)));
  url.searchParams.set("one_way", oneWay);
  url.searchParams.set("show_to_affiliates", "true");

  try {
    const res = await fetch(url.toString(), {
      headers: { "x-access-token": token },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "upstream error" }, { status: res.status });
    }

    const json = (await res.json()) as { success: boolean; data: TpEntry[] };

    if (!json.success || !Array.isArray(json.data)) {
      return NextResponse.json({ error: "invalid response" }, { status: 502 });
    }

    const byDate = new Map<string, number>();
    for (const entry of json.data) {
      if (!entry.depart_date.startsWith(yearMonth)) continue;

      const prev = byDate.get(entry.depart_date);
      if (prev === undefined || entry.value < prev) {
        byDate.set(entry.depart_date, entry.value);
      }
    }

    const data: DayPrice[] = Array.from(byDate.entries())
      .map(([date, price]) => ({ date, price }))
      .sort((a, b) => a.date.localeCompare(b.date));

    cache.set(cacheKey, { data, at: Date.now() });
    return NextResponse.json({ data });
  } catch (err) {
    console.error("[flight-prices/calendar]", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
