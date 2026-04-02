/**
 * Server Component — pre-fetches monthly flight prices at build/request time
 * via Next.js ISR (revalidate: 3600 s) so prices appear instantly on first render.
 *
 * Usage (from a Server Component / page.tsx):
 *   <CustomExtraordinarySearchFormLoader suggestedDestinationIata="BKK" />
 */

import { CustomExtraordinarySearchForm } from "./CustomExtraordinarySearchForm";

type GroupedPriceEntry = {
  price: number;
};

async function fetchMonthlyPrices(
  origin: string,
  destination: string,
  oneWay: boolean,
  directOnly: boolean,
  durationMin: number,
  durationMax: number,
): Promise<Record<string, number>> {
  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  if (!token || !destination) return {};

  try {
    const url = new URL("https://api.travelpayouts.com/aviasales/v3/grouped_prices");
    url.searchParams.set("currency", "usd");
    url.searchParams.set("origin", origin);
    url.searchParams.set("destination", destination);
    url.searchParams.set("group_by", "month");
    url.searchParams.set("direct", String(directOnly));
    if (!oneWay) {
      url.searchParams.set("min_trip_duration", String(durationMin));
      url.searchParams.set("max_trip_duration", String(durationMax));
    }

    const res = await fetch(url.toString(), {
      headers: { "x-access-token": token },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return {};

    const json = (await res.json()) as {
      success: boolean;
      data: Record<string, GroupedPriceEntry>;
    };
    if (!json.success || !json.data || typeof json.data !== "object") return {};

    return Object.fromEntries(
      Object.entries(json.data).map(([month, entry]) => [month.slice(0, 7), entry.price]),
    );
  } catch {
    return {};
  }
}

type Props = {
  suggestedDestinationIata: string;
  /** Override the default origin airport (defaults to LHR) */
  defaultOriginIata?: string;
};

export async function CustomExtraordinarySearchFormLoader({
  suggestedDestinationIata,
  defaultOriginIata = "LHR",
}: Props) {
  const initialMonthlyPrices = await fetchMonthlyPrices(
    defaultOriginIata,
    suggestedDestinationIata,
    false,
    false,
    7,
    14,
  );

  return (
    <CustomExtraordinarySearchForm
      suggestedDestinationIata={suggestedDestinationIata}
      initialMonthlyPrices={initialMonthlyPrices}
    />
  );
}