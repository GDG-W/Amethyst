import SuccessCard from "@/components/ui/success-card";

export default function Home() {
  return (
    <div>
      <SuccessCard
        title='Purchase Successful'
        summary='You have successfully purchased tickets for DevFest Lagos 2025. Check your email for your ticket ID.'
      />
    </div>
  );
}
