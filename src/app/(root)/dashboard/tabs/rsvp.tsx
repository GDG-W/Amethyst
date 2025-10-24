import Sadface from "@/components/icons/sadface";

export default function RSVP({ fullname }: { fullname: string }) {
  const firstName = fullname?.split(" ")[0] || "Human";

  return (
    <div className="flex flex-col gap-y-[68px] md:gap-y-[71px]">
      <div className="flex flex-col gap-1 text-center md:justify-center">
        <h3 className="heading-5 md:heading-3 text-strong-950 font-medium">
          Welcome, <span className="capitalize">{firstName}</span>
        </h3>
        <p className="label-3 md:label-2 text-sub-600">
          Reserve your seat for sessions you don’t want to miss.
        </p>
      </div>
      <div className="bg-white-0 rounded-2.5xl flex max-w-[356px] flex-col items-center gap-y-[22px] self-center p-5 md:h-[290px] md:max-w-[437px]">
        <div className="p-2 md:mt-10">
          <Sadface />
        </div>
        <div className="flex flex-col gap-y-2 text-center">
          <p className="label-1 text-strong-950">No sessions yet.</p>
          <p className="label-4 text-sub-600">
            When sessions open for RSVP, you’ll find them all here, ready for you to save your spot.
          </p>
        </div>
      </div>
    </div>
  );
}
