"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/shared/ui/kit/button/Button";

import styles from "../AccountSettingsPage.module.scss";

type DataUpdatedPopupProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const DataUpdatedPopup = ({ isOpen, setIsOpen }: DataUpdatedPopupProps) => {
  const t = useTranslations("accountSettingsPage");

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div
      className={`${styles.dataUpdatedPopupWrapper} ${
        isOpen ? styles.open : ""
      }`}
    >
      <div className={styles.dataUpdatedPopup}>
        <h2>{t("dataUpdated", { fallback: "Data updated successfully!" })}</h2>
        <p>
          {t("dataUpdatedDescription", {
            fallback:
              "Your personal information has been updated successfully.",
          })}
        </p>
        <Button type="button" variant="white" onClick={handleClose}>
          {t("close", { fallback: "Close" })}
        </Button>
      </div>
    </div>
  );
};
