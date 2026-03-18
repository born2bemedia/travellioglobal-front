import { NextResponse } from "next/server";

const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours
const cache = new Map<string, { data: string[]; timestamp: number }>();

/**
 * Get cities for a country using Countries Now API
 * https://countriesnow.space/api/v0.1/countries/cities
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");

    if (!country) {
      return NextResponse.json(
        { error: "Country parameter is required" },
        { status: 400 }
      );
    }

    const normalizedCountry = country.toLowerCase();

    // Check cache
    const cached = cache.get(normalizedCountry);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({ cities: cached.data });
    }

    // Fetch from API
    const response = await fetch(
      `https://countriesnow.space/api/v0.1/countries/cities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }),
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch cities for ${country}: ${response.status}`);
      return NextResponse.json(
        { error: "Failed to fetch cities" },
        { status: response.status }
      );
    }

    const data = (await response.json()) as {
      error?: boolean;
      msg?: string;
      data?: string[];
    };

    if (data.error || !data.data) {
      console.error(`API error for ${country}:`, data.msg);
      return NextResponse.json(
        { error: data.msg || "Failed to fetch cities" },
        { status: 500 }
      );
    }

    // Cache the result
    cache.set(normalizedCountry, {
      data: data.data,
      timestamp: Date.now(),
    });

    return NextResponse.json({ cities: data.data });
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
