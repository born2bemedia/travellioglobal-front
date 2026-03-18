"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./FormsCta.module.scss";

export const FormsCta = ({ title, description }: { title: string, description: string }) => {
  const t = useTranslations("formsCta");

  return (
    <section className={styles.forms_cta}>
      <video src="/videos/guide-cta.mp4" autoPlay muted loop playsInline />
      <div className={"container"}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={styles.forms_cta__content}
        >
          <h2>
            {title}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: description }} />
          <Button variant="white" url="/contact" type="link">
            {t("button", { fallback: "Contact Estanora support" })}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
