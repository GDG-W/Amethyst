import SuccessCard from "@/components/ui/success-card";

export default function page() {
  return (
    <div className="mt-[51px] flex items-center justify-center md:mt-[97px]">
      <SuccessCard
        title="Purchase Successful"
        summary="You have successfully purchased tickets for DevFest Lagos 2025. Check your email to claim your ticket"
      />
    </div>
  );
}
