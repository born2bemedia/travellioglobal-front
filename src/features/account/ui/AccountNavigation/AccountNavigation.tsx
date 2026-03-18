"use client";
import { useEffect } from "react";
import Link from "next/link";

import { useTranslations } from "next-intl";

import { useAuthStore } from "@/features/account/store/auth";

import styles from "./AccountNavigation.module.scss";

import { usePathname, useRouter } from "@/i18n/navigation";

export const AccountNavigation = () => {
  const t = useTranslations("accountNavigation");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const pathname = usePathname();
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isLoading = useAuthStore((s) => s.isLoading);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const logout = useAuthStore((s) => s.logout);

  console.log(pathname);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isInitialized || isLoading) return;
    if (!user) {
      router.replace("/log-in");
    }
  }, [isInitialized, isLoading, user, router]);
  
  const handleLogout = async () => {
    await logout();
    router.push("/log-in");
  };

  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "there";

  const navItems = [
    {
      href: "/account/my-orders",
      label: t("my-orders", { fallback: "My Orders" }),
    },
    {
      href: "/account/my-services",
      label: t("my-services", { fallback: "My Services" }),
    },
    {
      href: "/account/account-settings",
      label: t("account-settings", { fallback: "Account Setting" }),
    },
  ];

  return (
    <div className={styles.accountNavigation}>
      <h2 className={styles.greeting}>
        {t("hi", { fallback: "Hi" })}, {displayName}!
      </h2>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.linkButton} ${
              pathname === item.href ? styles.active : ""
            }`}
          >
            {item.label}
          </Link>
        ))}

        <button type="button" onClick={handleLogout} className={styles.logout}>
          Log Out
        </button>
      </nav>
    </div>
  );
};
