import { notFound } from "next/navigation";

import type { Metadata } from "next";

import {
  getRelatedTours,
  getTourBySlug,
  getTourContent,
  TOUR_CATALOG,
} from "@/features/tours";
import { TourDetailPage } from "@/features/tours/ui/TourDetailPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour",
    };
  }

  const content = getTourContent(tour.detailContentKey);

  return {
    title: content?.meta.title ?? `${tour.title} | Travellio Global`,
    description:
      content?.meta.description ??
      `${tour.title}. Operated by ${tour.operator}. From ${tour.priceLabel ?? `€${tour.price}`}.`,
  };
}

export function generateStaticParams() {
  return TOUR_CATALOG.map((tour) => ({
    slug: tour.slug,
  }));
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const content = getTourContent(tour.detailContentKey);

  if (!content) {
    notFound();
  }

  return (
    <TourDetailPage
      tour={tour}
      content={content}
      relatedTours={getRelatedTours(tour.slug, 8)}
    />
  );
}
