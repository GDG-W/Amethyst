import JoinUs from "@/components/layout/join-us";

import BuySquadTickets from "../../components/layout/squad-tickets/index";
import FAQ from "../../components/layout/faq/index";
import Footer from "../../components/layout/footer/index";
import Recap from "../../components/layout/recap/index";

export default function Homelayout() {
  return (
    <div>
      <BuySquadTickets />
      <FAQ />
      <Recap />
      <JoinUs />
      <Footer />
    </div>
  );
}
