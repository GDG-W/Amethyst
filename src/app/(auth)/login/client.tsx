"use client";

import { useState } from "react";
import Link from "next/link";

import Button from "@/components/ui/button";
import TextField from "@/components/ui/inputs/text-field";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [ticketId, setTicketId] = useState("");

  //   const handleSubmit = async () => {
  //     console.log("submit");
  //   };
  return (
    <form
      //   onSubmit={handleSubmit}
      className="max-sm:border-soft-200 flex w-full flex-col gap-y-6 rounded-lg bg-white px-4 py-5 max-sm:rounded-t-none max-sm:border max-sm:border-t-0 sm:w-[450px] sm:p-5"
    >
      <TextField
        type="email"
        name="email_address"
        label="Email address"
        placeholder="Enter email address"
        helperText="The email associated with your ticket"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <TextField
        type="text"
        name="ticket_id"
        label="Ticket ID"
        placeholder="Enter your ticket ID"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
      />
      <div className="space-y-4">
        <Button disabled type="submit" size="full">
          <span className="text-lg leading-6 font-bold tracking-[-4%] text-white">Log in</span>
        </Button>
        <p className="label-4 text-soft-400 text-center">
          Don’t have a ticket?{" "}
          <Link href="/buy" className="text-away-base">
            Buy here
          </Link>
        </p>
      </div>
    </form>
  );
}
