const FLAG_ASSETS: Record<string, string> = {
  AU: "/images/visas/flag-au.svg",
  CA: "/images/visas/flag-ca.svg",
  CN: "/images/visas/flag-cn.svg",
  KE: "/images/visas/flag-ke.svg",
  MX: "/images/visas/flag-mx.svg",
  UA: "/images/visas/flag-ua.svg",
  VN: "/images/visas/flag-vn.svg",
};

export const getVisaFlagSrc = (countryCode: string) =>
  FLAG_ASSETS[countryCode.toUpperCase()] ?? null;

export const getVisaCountryFlagSrc = (countryCode: string) =>
  `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`;

export const countryCodeToFlag = (countryCode: string) =>
  String.fromCodePoint(
    ...countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0)),
  );
