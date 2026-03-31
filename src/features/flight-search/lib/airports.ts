import countryList from "react-select-country-list";

import { excludedCountries } from "@/shared/lib/countries";

export type AirportOption = { value: string; label: string };

const normalizeCountryName = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const countryCodeByName = new Map(
  countryList()
    .getData()
    .map((country) => [normalizeCountryName(country.label), country.value.toLowerCase()]),
);

const countryAliases: Record<string, string> = {
  [normalizeCountryName("USA")]: "us",
  [normalizeCountryName("United States of America")]: "us",
  [normalizeCountryName("UAE")]: "ae",
  [normalizeCountryName("UK")]: "gb",
  [normalizeCountryName("South Korea")]: "kr",
  [normalizeCountryName("North Korea")]: "kp",
  [normalizeCountryName("North Macedonia")]: "mk",
  [normalizeCountryName("Russia")]: "ru",
  [normalizeCountryName("Moldova")]: "md",
  [normalizeCountryName("Hong Kong")]: "hk",
  [normalizeCountryName("Taiwan")]: "tw",
  [normalizeCountryName("Bahrain")]: "bh",
  [normalizeCountryName("Luxembourg")]: "lu",
  [normalizeCountryName("Malta")]: "mt",
  [normalizeCountryName("Mauritius")]: "mu",
  [normalizeCountryName("Seychelles")]: "sc",
  [normalizeCountryName("Maldives")]: "mv",
};

const getCountryCodeFromAirportLabel = (label: string) => {
  const segments = label.split(",").map((segment) => segment.trim()).filter(Boolean);
  const countryName = segments.at(-1) ?? label;
  const normalizedCountryName = normalizeCountryName(countryName);

  return (
    countryAliases[normalizedCountryName] ??
    countryCodeByName.get(normalizedCountryName) ??
    null
  );
};

const shouldIncludeAirport = (airport: AirportOption) => {
  const countryCode = getCountryCodeFromAirportLabel(airport.label);

  if (!countryCode) {
    return true;
  }

  return !excludedCountries.includes(countryCode);
};

/**
 * Popular airports worldwide — value is the IATA code, label is "City, Country".
 */
const rawAirports: AirportOption[] = [
  // Europe
  { value: "LHR", label: "London, United Kingdom" },
  { value: "LGW", label: "London Gatwick, United Kingdom" },
  { value: "STN", label: "London Stansted, United Kingdom" },
  { value: "CDG", label: "Paris, France" },
  { value: "ORY", label: "Paris Orly, France" },
  { value: "FRA", label: "Frankfurt, Germany" },
  { value: "MUC", label: "Munich, Germany" },
  { value: "BER", label: "Berlin, Germany" },
  { value: "AMS", label: "Amsterdam, Netherlands" },
  { value: "MAD", label: "Madrid, Spain" },
  { value: "BCN", label: "Barcelona, Spain" },
  { value: "FCO", label: "Rome, Italy" },
  { value: "MXP", label: "Milan, Italy" },
  { value: "VCE", label: "Venice, Italy" },
  { value: "NAP", label: "Naples, Italy" },
  { value: "LIS", label: "Lisbon, Portugal" },
  { value: "OPO", label: "Porto, Portugal" },
  { value: "ATH", label: "Athens, Greece" },
  { value: "SKG", label: "Thessaloniki, Greece" },
  { value: "IST", label: "Istanbul, Turkey" },
  { value: "AYT", label: "Antalya, Turkey" },
  { value: "SAW", label: "Istanbul Sabiha, Turkey" },
  { value: "VIE", label: "Vienna, Austria" },
  { value: "ZRH", label: "Zurich, Switzerland" },
  { value: "GVA", label: "Geneva, Switzerland" },
  { value: "BRU", label: "Brussels, Belgium" },
  { value: "CPH", label: "Copenhagen, Denmark" },
  { value: "OSL", label: "Oslo, Norway" },
  { value: "ARN", label: "Stockholm, Sweden" },
  { value: "HEL", label: "Helsinki, Finland" },
  { value: "DUB", label: "Dublin, Ireland" },
  { value: "PRG", label: "Prague, Czech Republic" },
  { value: "WAW", label: "Warsaw, Poland" },
  { value: "KRK", label: "Krakow, Poland" },
  { value: "BUD", label: "Budapest, Hungary" },
  { value: "OTP", label: "Bucharest, Romania" },
  { value: "SOF", label: "Sofia, Bulgaria" },
  { value: "ZAG", label: "Zagreb, Croatia" },
  { value: "BEG", label: "Belgrade, Serbia" },
  { value: "TLL", label: "Tallinn, Estonia" },
  { value: "RIX", label: "Riga, Latvia" },
  { value: "VNO", label: "Vilnius, Lithuania" },
  { value: "KEF", label: "Reykjavik, Iceland" },
  { value: "BTS", label: "Bratislava, Slovakia" },
  { value: "LJU", label: "Ljubljana, Slovenia" },
  { value: "TGD", label: "Podgorica, Montenegro" },
  { value: "SKP", label: "Skopje, North Macedonia" },
  { value: "TIA", label: "Tirana, Albania" },
  { value: "KBP", label: "Kyiv, Ukraine" },
  { value: "LWO", label: "Lviv, Ukraine" },
  { value: "KIV", label: "Chisinau, Moldova" },
  { value: "SVO", label: "Moscow, Russia" },
  { value: "LED", label: "Saint Petersburg, Russia" },
  { value: "MSQ", label: "Minsk, Belarus" },
  { value: "TBS", label: "Tbilisi, Georgia" },
  { value: "EVN", label: "Yerevan, Armenia" },
  { value: "GYD", label: "Baku, Azerbaijan" },
  { value: "MLA", label: "Malta" },
  { value: "LCA", label: "Larnaca, Cyprus" },
  { value: "LUX", label: "Luxembourg" },

  // North America
  { value: "JFK", label: "New York JFK, USA" },
  { value: "EWR", label: "New York Newark, USA" },
  { value: "LGA", label: "New York LaGuardia, USA" },
  { value: "LAX", label: "Los Angeles, USA" },
  { value: "ORD", label: "Chicago, USA" },
  { value: "SFO", label: "San Francisco, USA" },
  { value: "MIA", label: "Miami, USA" },
  { value: "ATL", label: "Atlanta, USA" },
  { value: "DFW", label: "Dallas, USA" },
  { value: "DEN", label: "Denver, USA" },
  { value: "SEA", label: "Seattle, USA" },
  { value: "BOS", label: "Boston, USA" },
  { value: "IAD", label: "Washington DC, USA" },
  { value: "LAS", label: "Las Vegas, USA" },
  { value: "HNL", label: "Honolulu, USA" },
  { value: "MCO", label: "Orlando, USA" },
  { value: "PHX", label: "Phoenix, USA" },
  { value: "MSP", label: "Minneapolis, USA" },
  { value: "DTW", label: "Detroit, USA" },
  { value: "PHL", label: "Philadelphia, USA" },
  { value: "YYZ", label: "Toronto, Canada" },
  { value: "YVR", label: "Vancouver, Canada" },
  { value: "YUL", label: "Montreal, Canada" },
  { value: "YOW", label: "Ottawa, Canada" },
  { value: "YYC", label: "Calgary, Canada" },
  { value: "MEX", label: "Mexico City, Mexico" },
  { value: "CUN", label: "Cancun, Mexico" },
  { value: "GDL", label: "Guadalajara, Mexico" },

  // Caribbean & Central America
  { value: "HAV", label: "Havana, Cuba" },
  { value: "SJO", label: "San Jose, Costa Rica" },
  { value: "PTY", label: "Panama City, Panama" },
  { value: "SDQ", label: "Santo Domingo, Dominican Republic" },
  { value: "PUJ", label: "Punta Cana, Dominican Republic" },
  { value: "KIN", label: "Kingston, Jamaica" },
  { value: "NAS", label: "Nassau, Bahamas" },
  { value: "BGI", label: "Bridgetown, Barbados" },

  // South America
  { value: "GRU", label: "São Paulo, Brazil" },
  { value: "GIG", label: "Rio de Janeiro, Brazil" },
  { value: "EZE", label: "Buenos Aires, Argentina" },
  { value: "SCL", label: "Santiago, Chile" },
  { value: "BOG", label: "Bogota, Colombia" },
  { value: "LIM", label: "Lima, Peru" },
  { value: "UIO", label: "Quito, Ecuador" },
  { value: "MVD", label: "Montevideo, Uruguay" },
  { value: "CCS", label: "Caracas, Venezuela" },
  { value: "ASU", label: "Asuncion, Paraguay" },

  // Middle East
  { value: "DXB", label: "Dubai, UAE" },
  { value: "AUH", label: "Abu Dhabi, UAE" },
  { value: "DOH", label: "Doha, Qatar" },
  { value: "RUH", label: "Riyadh, Saudi Arabia" },
  { value: "JED", label: "Jeddah, Saudi Arabia" },
  { value: "TLV", label: "Tel Aviv, Israel" },
  { value: "AMM", label: "Amman, Jordan" },
  { value: "BAH", label: "Bahrain" },
  { value: "KWI", label: "Kuwait City, Kuwait" },
  { value: "MCT", label: "Muscat, Oman" },
  { value: "BEY", label: "Beirut, Lebanon" },

  // Asia
  { value: "NRT", label: "Tokyo Narita, Japan" },
  { value: "HND", label: "Tokyo Haneda, Japan" },
  { value: "KIX", label: "Osaka, Japan" },
  { value: "ICN", label: "Seoul, South Korea" },
  { value: "PEK", label: "Beijing, China" },
  { value: "PVG", label: "Shanghai, China" },
  { value: "HKG", label: "Hong Kong" },
  { value: "TPE", label: "Taipei, Taiwan" },
  { value: "SIN", label: "Singapore" },
  { value: "BKK", label: "Bangkok, Thailand" },
  { value: "HKT", label: "Phuket, Thailand" },
  { value: "CNX", label: "Chiang Mai, Thailand" },
  { value: "KUL", label: "Kuala Lumpur, Malaysia" },
  { value: "CGK", label: "Jakarta, Indonesia" },
  { value: "DPS", label: "Bali, Indonesia" },
  { value: "MNL", label: "Manila, Philippines" },
  { value: "CEB", label: "Cebu, Philippines" },
  { value: "SGN", label: "Ho Chi Minh City, Vietnam" },
  { value: "HAN", label: "Hanoi, Vietnam" },
  { value: "DAD", label: "Da Nang, Vietnam" },
  { value: "PNH", label: "Phnom Penh, Cambodia" },
  { value: "REP", label: "Siem Reap, Cambodia" },
  { value: "RGN", label: "Yangon, Myanmar" },
  { value: "CMB", label: "Colombo, Sri Lanka" },
  { value: "MLE", label: "Male, Maldives" },
  { value: "DEL", label: "New Delhi, India" },
  { value: "BOM", label: "Mumbai, India" },
  { value: "BLR", label: "Bangalore, India" },
  { value: "MAA", label: "Chennai, India" },
  { value: "CCU", label: "Kolkata, India" },
  { value: "KTM", label: "Kathmandu, Nepal" },
  { value: "DAC", label: "Dhaka, Bangladesh" },
  { value: "ISB", label: "Islamabad, Pakistan" },
  { value: "KHI", label: "Karachi, Pakistan" },
  { value: "TAS", label: "Tashkent, Uzbekistan" },
  { value: "NQZ", label: "Astana, Kazakhstan" },
  { value: "ALA", label: "Almaty, Kazakhstan" },

  // Africa
  { value: "CAI", label: "Cairo, Egypt" },
  { value: "HRG", label: "Hurghada, Egypt" },
  { value: "SSH", label: "Sharm El Sheikh, Egypt" },
  { value: "CMN", label: "Casablanca, Morocco" },
  { value: "RAK", label: "Marrakech, Morocco" },
  { value: "TUN", label: "Tunis, Tunisia" },
  { value: "ALG", label: "Algiers, Algeria" },
  { value: "JNB", label: "Johannesburg, South Africa" },
  { value: "CPT", label: "Cape Town, South Africa" },
  { value: "NBO", label: "Nairobi, Kenya" },
  { value: "DAR", label: "Dar es Salaam, Tanzania" },
  { value: "ADD", label: "Addis Ababa, Ethiopia" },
  { value: "LOS", label: "Lagos, Nigeria" },
  { value: "ABV", label: "Abuja, Nigeria" },
  { value: "ACC", label: "Accra, Ghana" },
  { value: "DSS", label: "Dakar, Senegal" },
  { value: "MRU", label: "Mauritius" },
  { value: "SEZ", label: "Seychelles" },
  { value: "TNR", label: "Antananarivo, Madagascar" },

  // Oceania
  { value: "SYD", label: "Sydney, Australia" },
  { value: "MEL", label: "Melbourne, Australia" },
  { value: "BNE", label: "Brisbane, Australia" },
  { value: "PER", label: "Perth, Australia" },
  { value: "AKL", label: "Auckland, New Zealand" },
  { value: "CHC", label: "Christchurch, New Zealand" },
  { value: "NAN", label: "Nadi, Fiji" },
];

export const airports: AirportOption[] = rawAirports
  .filter(shouldIncludeAirport)
  .sort((a, b) => a.label.localeCompare(b.label));
