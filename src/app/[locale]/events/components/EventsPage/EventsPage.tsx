import { EventsCta } from "../EventsCta";
import { EventsHero } from "../EventsHero";
import { EventsInterests } from "../EventsInterests";
import { EventsIntro } from "../EventsIntro";
import { EventsSearch } from "../EventsSearch";
import { EventsWhy } from "../EventsWhy";
import styles from "./EventsPage.module.scss";

export const EventsPage = () => {
  return (
    <main>
      <EventsHero />

      <div className={styles.page__body}>
        <div className="container">
          <div className={styles.page__stack}>
            <EventsIntro />
            <EventsSearch />
            <EventsInterests />
            <EventsWhy />
            <EventsCta />
          </div>
        </div>
      </div>
    </main>
  );
};
