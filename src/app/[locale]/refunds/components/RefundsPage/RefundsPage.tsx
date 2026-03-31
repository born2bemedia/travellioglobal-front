import { RefundsCheck } from "../RefundsCheck";
import { RefundsCta } from "../RefundsCta";
import { RefundsHero } from "../RefundsHero";
import { RefundsProcess } from "../RefundsProcess";
import { RefundsRights } from "../RefundsRights";
import { RefundsSupport } from "../RefundsSupport";
import { RefundsWhy } from "../RefundsWhy";

export const RefundsPage = () => {
  return (
    <main>
      <RefundsHero />
      <RefundsRights />
      <RefundsCheck />
      <RefundsSupport />
      <RefundsProcess />
      <RefundsWhy />
      <RefundsCta />
    </main>
  );
};