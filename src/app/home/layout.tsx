import JoinUs from "@/components/layout/join-us";

import BuySquadTickets from "../../components/layout/squad-tickets/index";
import FAQ from "../../components/layout/FAQ/index";
import Footer from "../../components/layout/Footer/index";
import MobileStickyNote from "../../components/layout/sticky-notes/mobile";
import Recap from "../../components/layout/recap/index";
import StickyNote from "../../components/layout/sticky-notes/index";

export default function Homelayout() {
  return (
    <div>
      <StickyNote />
      <MobileStickyNote />
      <BuySquadTickets />
      <FAQ />
      <Recap />
      <JoinUs />
      <Footer />
    </div>
  );
}
