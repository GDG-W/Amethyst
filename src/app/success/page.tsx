import SuccessCard from "@/components/ui/success-card";

export default function page() {
  return (
    <div className="mt-[51px] flex items-center justify-center md:mt-[97px]">
      <SuccessCard
        title="Upgrade Successful"
        summary="You have successfully purchased 1 more ticket for DevFest Lagos 2025. We have sent you a confirmatory email."
      />
    </div>
  );
}
