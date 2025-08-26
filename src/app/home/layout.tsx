import JoinUs from "@/components/layout/join-us";

import BuySquadTickets from "../../components/layout/BuySquadTickets/index";
import FAQ from "../../components/layout/FAQ/index";
import Footer from "../../components/layout/Footer/index";

export default function Homelayout() {
  return (
    <div>
      <BuySquadTickets />
      <FAQ />
      <JoinUs />
      <Footer />
    </div>
  );
}
