"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import styles from "./EventsSearchBar.module.scss";

type EventsSearchBarProps = {
  className?: string;
};

const TICKETMASTER_SEARCH_URL = "https://www.ticketmaster.com/search";

export const EventsSearchBar = ({ className }: EventsSearchBarProps) => {
  const t = useTranslations("eventsPage");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let url = TICKETMASTER_SEARCH_URL;
    const searchQuery = (event.target as HTMLFormElement).querySelector<HTMLInputElement>("input[name='q']")?.value.trim();
    if (searchQuery) {
      url += `?q=${searchQuery}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={[styles.searchBar, className].filter(Boolean).join(" ")}
      role="search"
    >
      <div className={styles.searchBar__field}>
        <input
          name="q"
          type="search"
          autoComplete="off"
          placeholder={t("searchPlaceholder", {
            fallback: "Search by artist, team, event, etc...",
          })}
          aria-label={t("searchPlaceholder", {
            fallback: "Search by artist, team, event, etc...",
          })}
          required
        />

        <button
          type="submit"
          aria-label={t("searchButton", {
            fallback: "Search",
          })}
        >
          <Image
            src="/images/events/icon-search.svg"
            alt=""
            width={16}
            height={16}
          />
        </button>
      </div>
    </form>
  );
};
