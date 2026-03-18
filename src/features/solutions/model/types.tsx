export type Service = {
  id: string;
  title: string;
  type: "purchasable" | "orderable";
  price: number;
  prefix?: string;
  suffix?: string;
};

export type PackageItem = {
  title: string;
  description: string;
  icon: string;
};

export type Package = {
  id: string;
  name: string;
  boldIntro: string;
  description: string;
  price: number;
  cta: string;
  inheritsFrom?: string;
  items: PackageItem[];
};