import Link from "next/link";

import Button from "@/components/ui/button";

export default function Buypage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-[#1e1e1e]">Tickets Coming Soon</h1>
      <p className="mb-8 text-lg text-gray-600">
        We are finalizing our ticketing system. Please check back soon!
      </p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
