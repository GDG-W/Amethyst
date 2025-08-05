"use client";
import { useState } from "react";

import ClaimTicketForm from "@/components/form/claim-ticket.form";

export default function ClaimPage() {
  const [formData, setFormData] = useState<object>({});

  return (
    <div className='mx-auto mt-7 w-full max-w-[450px] pb-[15.813rem] md:mt-18 md:pb-18'>
      <h1 className='text-center font-[inter] text-[2rem] leading-tight font-medium tracking-tight'>
        Finish your registration to claim your ticket
      </h1>

      <ClaimTicketForm />
    </div>
  );
}
