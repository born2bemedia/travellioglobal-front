"use client";

import { useEffect } from "react";

import { useTranslations } from "next-intl";

import { useAuthStore } from "@/features/account/store/auth";

import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./AccountSettingsPage.module.scss";
import { ChangePasswordForm } from "./ChangePasswordForm/ChangePasswordForm";
import { ContactDataForm } from "./ContactDataForm/ContactDataForm";

import { Link, useRouter } from "@/i18n/navigation";

export const AccountSettingsPage = () => {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const t = useTranslations("accountSettingsPage");
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isInitialized) return;
    if (!user) {
      router.replace("/log-in");
    }
  }, [isInitialized, user, router]);

  if (!isInitialized || !user) {
    return (
      <section className={styles.section}>
        <div className="container">
          <p className={styles.loading}>
            {t("loading", { fallback: "Loading..." })}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>
        {t("title", { fallback: "Account Setting" })}
      </h1>
      <div className={styles.forms}>
        <ContactDataForm user={user} />
        <ChangePasswordForm />
      </div>
      <p className={styles.back}>
        <Button url="/account" variant="bordered" type="link">
          {t("backToAccount", { fallback: "← Back to account" })}
        </Button>
      </p>
    </section>
  );
};
