import { InsuranceAudience } from "../InsuranceAudience";
import { InsuranceCoverage } from "../InsuranceCoverage";
import { InsuranceCta } from "../InsuranceCta";
import { InsuranceHero } from "../InsuranceHero";
import { InsuranceIntro } from "../InsuranceIntro";
import { InsuranceReassurance } from "../InsuranceReassurance";
import { InsuranceWhy } from "../InsuranceWhy";

export const InsurancePage = () => {
  return (
    <main>
      <InsuranceHero />
      <InsuranceIntro />
      <InsuranceCoverage />
      <InsuranceReassurance />
      <InsuranceAudience />
      <InsuranceWhy />
      <InsuranceCta />
    </main>
  );
};