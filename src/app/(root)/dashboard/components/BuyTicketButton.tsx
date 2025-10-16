"use client";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/button";

export default function BuyTicketButton() {
  const router = useRouter();
  return <Button onClick={() => router.push("/buy")}>Buy More Tickets</Button>;
}
