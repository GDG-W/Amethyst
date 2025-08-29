import JoinUs from "@/components/layout/join-us";

import BuySquadTickets from "../../components/layout/squad-tickets/index";
import FAQ from "../../components/layout/FAQ/index";
import Footer from "../../components/layout/Footer/index";
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
