import { TicketCard } from "@/components/ui/detail";

const Tempela = () => {
  return (
    <section className='bg-yellow-100 w-full h-full p-8'>
      <TicketCard
        variant='numbered'
        sn={2}
        // items={[
        //   {
        //     id: "day1",
        //     day: "Monday",
        //     track: "Frontend Development",
        //     type: "Standard",
        //     itemName: "",
        //     description:
        //       "We will delve into the dynamic world of frontend development, where design meets functionality",
        //     amount: 10000,
        //   },
        //   {
        //     id: "day4",
        //     day: "Thursday",
        //     track: "DF Special",
        //     type: "Pro",
        //     itemName: "",
        //     description:
        //       "We will delve into the dynamic world of frontend development, where design meets functionality",
        //     amount: 50000,
        //   },
        // ]}
      />

      <TicketCard
        variant='unnumbered'
        // items={[
        //   {
        //     id: "day1",
        //     day: "Monday",
        //     type: "Standard",
        //     amount: 10000,
        //   },
        //   {
        //     id: "day4",
        //     day: "Thursday",
        //     type: "Pro",
        //     amount: 50000,
        //   },
        // ]}
      />
    </section>
  );
};
export default Tempela;
