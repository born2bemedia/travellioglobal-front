import { ContactsClosing } from "../ContactsClosing";
import { ContactsConnected } from "../ContactsConnected";
import { ContactsGetInTouch } from "../ContactsGetInTouch";
import { ContactsHero } from "../ContactsHero";
import { ContactsInfo } from "../ContactsInfo";

export const ContactsPage = () => {
  return (
    <main>
      <ContactsHero />
      <ContactsInfo />
      <ContactsConnected />
      <ContactsGetInTouch />
      <ContactsClosing />
    </main>
  );
};
