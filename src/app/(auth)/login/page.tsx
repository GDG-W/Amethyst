"use client";

import Link from "next/link";

import Button from "@/components/ui/button";
import TextField from "@/components/ui/inputs/text-field";

export default function Login() {
  return (
    <section className="mt-[6.25rem] flex flex-col items-center">
      <div className="flex w-full flex-col items-center gap-y-6 sm:gap-y-4">
        <div className="text-center">
          <h2 className="label-1 sm:label-0 mb-0.5 text-black">Welcome</h2>
          <p className="label-5 sm:label-4 text-grey-80">Login to view your ticket</p>
        </div>

        <form className="max-sm:border-soft-200 flex w-full flex-col gap-y-6 rounded-lg bg-white px-4 py-5 max-sm:rounded-t-none max-sm:border max-sm:border-t-0 sm:w-[450px] sm:p-5">
          <TextField
            type="email"
            name="email_address"
            label="Email address"
            placeholder="Enter email address"
            helperText="The email associated with your ticket"
            onChange={() => {}}
          />
          <TextField
            type="text"
            name="ticket_id"
            label="Ticket ID"
            placeholder="Enter your ticket ID"
            onChange={() => {}}
          />
          <div className="space-y-4">
            <Button disabled type="submit" size="full" height="sixty">
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
      </div>
    </section>
  );
}
