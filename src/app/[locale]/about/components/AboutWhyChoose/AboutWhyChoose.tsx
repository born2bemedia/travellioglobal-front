"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./AboutWhyChoose.module.scss";

type WhyItem = {
  key: string;
  image: string;
  imageClassName: string;
  title: string;
  description: string;
  alt: string;
};

export const AboutWhyChoose = () => {
  const t = useTranslations("aboutPage");

  const items: WhyItem[] = [
    {
      key: "booking",
      image: "/images/about/why-booking.webp",
      imageClassName: styles.why__imageBooking,
      title: t("whyBookingTitle", {
        fallback: "Seamless Booking, Effortless Travel",
      }),
      description: t("whyBookingDescription", {
        fallback:
          "We know time is precious, so we've streamlined the booking process - flights, hotels, tours, and more - all in one place. Plan your trip with ease and spend more time creating memories.",
      }),
      alt: t("whyBookingAlt", {
        fallback: "Travellers checking in at a hotel desk",
      }),
    },
    {
      key: "global",
      image: "/images/about/why-global.webp",
      imageClassName: styles.why__imageGlobal,
      title: t("whyGlobalTitle", {
        fallback: "Global Access, Tailored to You",
      }),
      description: t("whyGlobalDescription", {
        fallback:
          "From the sun-soaked shores of Spain to the bustling streets of Tokyo, our carefully curated destinations give you access to the best the world has to offer, with options for every type of traveler.",
      }),
      alt: t("whyGlobalAlt", {
        fallback: "Traveller looking out of an airplane window",
      }),
    },
    {
      key: "curated",
      image: "/images/about/why-curated.webp",
      imageClassName: styles.why__imageCurated,
      title: t("whyCuratedTitle", {
        fallback: "Carefully Curated Handpicked Experiences",
      }),
      description: t("whyCuratedDescription", {
        fallback:
          "Why settle for ordinary? Whether you're looking for a relaxing wellness retreat, an adrenaline-packed adventure, or an immersive cultural experience, we offer tours and activities tailored to you.",
      }),
      alt: t("whyCuratedAlt", {
        fallback: "Woman relaxing during a scenic sunset experience",
      }),
    },
    {
      key: "expert",
      image: "/images/about/why-expert.webp",
      imageClassName: styles.why__imageExpert,
      title: t("whyExpertTitle", {
        fallback: "Expert-Led Tours &\nLocal Insights",
      }),
      description: t("whyExpertDescription", {
        fallback:
          "Our guides are more than just experts; they are passionate locals ready to share the hidden gems, cultural wonders, untold stories, and unique insights of each vibrant destination.",
      }),
      alt: t("whyExpertAlt", {
        fallback: "Guided group tour in a historic city",
      }),
    },
  ];

  return (
    <section className={styles.why}>
      <div className="container">
        <motion.div
          className={styles.why__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <h2 className={styles.why__title}>
            {t("whyTitle", { fallback: "Why Choose Us?" })}
          </h2>

          <div className={styles.why__list}>
            {items.map((item) => (
              <article key={item.key} className={styles.why__card}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1280px"
                  className={`${styles.why__image} ${item.imageClassName}`}
                />
                <div className={styles.why__gradient} />

                <div className={styles.why__content}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
