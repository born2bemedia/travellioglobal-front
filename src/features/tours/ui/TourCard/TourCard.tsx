"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useAuthStore } from "@/features/account/store/auth";
import { useCartStore } from "@/features/cart/store/cart";

import { Button } from "@/shared/ui/kit/button/Button";

import { useTourRegionLabels } from "../../lib/tours";
import type { Tour } from "../../model/types";
import styles from "./TourCard.module.scss";

import { Link, useRouter } from "@/i18n/navigation";

interface TourCardProps {
  tour: Tour;
}

export const TourCard = ({ tour }: TourCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const user = useAuthStore((state) => state.user);
  const addToWishlist = useAuthStore((state) => state.addToWishlist);
  const removeFromWishlist = useAuthStore((state) => state.removeFromWishlist);
  const regionLabels = useTourRegionLabels();
  const router = useRouter();
  const [wishlistBusy, setWishlistBusy] = useState(false);

  const formattedPrice = `€${tour.price.toLocaleString("en-IE")}`;
  
  useEffect(() => {
    setTimeout(() => {
      setIsWishlisted(user?.wishlist?.some(
        (item) => item.product === tour.title || item.product === tour.id,
      ) ?? false);
    }, 0);
  }, [user?.wishlist, tour.title, tour.id]);

  const handleAddToCart = () => {
    addToCart({
      id: tour.id,
      title: tour.title,
      price: tour.price,
      quantity: 1,
    });
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      router.push("/log-in");
      return;
    }

    setWishlistBusy(true);

    if (isWishlisted) {
      await removeFromWishlist(tour.title);
    } else {
      await addToWishlist({ product: tour.title });
      setIsWishlisted(true);
    }

    setWishlistBusy(false);
  };

  const renderStars = () => {
    const fullStars = Math.floor(tour.rating);
    const hasHalf = tour.rating % 1 >= 0.5;
    return (
      <span className={styles.card__stars} aria-hidden="true">
        {"★".repeat(fullStars)}
        {hasHalf && "★"}
      </span>
    );
  };

  return (
    <article className={styles.card}>
      <div className={styles.card__media}>
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 305px"
          className={styles.card__image}
        />
        <div className={styles.card__overlay} />

        <div className={styles.card__top}>
          <div className={styles.card__meta}>
            <span className={styles.card__region}>
              {regionLabels[tour.region]}
            </span>
            <div className={styles.card__rating}>
              {renderStars()}
              <span>{tour.rating}/5</span>
            </div>
          </div>

          <Link
            href={`/tours/${tour.slug}`}
            className={styles.card__arrow}
            aria-label="View tour details"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7H13M13 7L7 1M13 7L7 13"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <Link href={`/tours/${tour.slug}`} className={styles.card__titleLink}>
          <h3 className={styles.card__title}>{tour.title}</h3>
        </Link>
      </div>

      <div className={styles.card__bottom}>
        <div className={styles.card__priceRow}>
          <p className={styles.card__price}>{formattedPrice}</p>
          <button
            type="button"
            className={`${styles.card__wishlist} ${isWishlisted ? styles.card__wishlistActive : ""}`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isWishlisted}
            disabled={wishlistBusy}
            onClick={handleWishlistToggle}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 4.75H17C17.1381 4.75 17.25 4.86193 17.25 5V20.2051C17.25 20.4115 17.0147 20.5292 16.8496 20.4054L12.15 16.8807C12.0611 16.8141 11.9389 16.8141 11.85 16.8807L7.15037 20.4054C6.98533 20.5292 6.75 20.4115 6.75 20.2051V5C6.75 4.86193 6.86193 4.75 7 4.75Z"
                stroke={isWishlisted ? "#EB5E28" : "#403D38"}
                strokeWidth="1.8"
                fill={isWishlisted ? "#EB5E28" : "transparent"}
              />
            </svg>
          </button>
        </div>

        <Button
          type="link"
          url={`/tours/${tour.slug}`}
          variant="orange"
        >
          <span>Add to cart</span>
          <span className={styles.card__cartArrow} aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9.5 7.45508C9.5 7.36879 9.5117 7.28225 9.53418 7.19824L9.56641 7.10059L9.60254 7.01855C9.62726 6.96847 9.65716 6.92041 9.69141 6.87402L9.75684 6.79395L9.82324 6.72754C9.8648 6.69079 9.91143 6.65798 9.96191 6.62793L10.0518 6.58008L10.1455 6.54395C10.1884 6.53009 10.232 6.51895 10.2764 6.51172L10.417 6.5C10.5442 6.50002 10.6684 6.52767 10.7822 6.5791C10.8969 6.63093 10.9985 6.7049 11.0811 6.79492L15.2471 11.3408C15.3299 11.4313 15.393 11.5365 15.4355 11.6484C15.4675 11.7325 15.4881 11.8206 15.4961 11.9102L15.5 12C15.5 12.1202 15.4781 12.2395 15.4355 12.3516C15.393 12.4635 15.3299 12.5687 15.2471 12.6592L11.0811 17.2051C10.9342 17.3653 10.7325 17.4711 10.5127 17.4951L10.417 17.499L10.3145 17.4941C10.0995 17.4692 9.90398 17.3651 9.75879 17.209L9.69238 17.1299C9.56789 16.9626 9.5026 16.7587 9.50098 16.5527L9.50586 16.4482C9.52305 16.2734 9.58588 16.1041 9.69238 15.9609L9.76953 15.8672L13.0049 12.3379L13.3154 12L13.0049 11.6621L9.77051 8.13379L9.69238 8.04004C9.63949 7.96901 9.59768 7.89087 9.56641 7.80957L9.53418 7.71191C9.51153 7.62753 9.50003 7.54113 9.5 7.45508Z"
                fill="#FFFDF1"
              />
            </svg>
          </span>
        </Button>
      </div>
    </article>
  );
};
