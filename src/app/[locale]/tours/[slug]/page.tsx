import { notFound } from "next/navigation";

import type { Metadata } from "next";

import {
  getRelatedTours,
  getTourBySlug,
  getTourContent,
  getTourGallery,
  TOUR_CATALOG,
} from "@/features/tours";
import { TourDetailPage } from "@/features/tours/ui/TourDetailPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = getTourBySlug(slug, locale);

  if (!tour) {
    return {
      title: "Tour",
    };
  }

  const content = getTourContent(tour.detailContentKey, locale);

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
  const { locale, slug } = await params;
  const tour = getTourBySlug(slug, locale);

  if (!tour) {
    notFound();
  }

  const content = getTourContent(tour.detailContentKey, locale);

  if (!content) {
    notFound();
  }

  return (
    <TourDetailPage
      tour={tour}
      content={content}
      galleryImages={getTourGallery(tour.slug)}
      relatedTours={getRelatedTours(tour.slug, locale, 8)}
    />
  );
}