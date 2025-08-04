"use client";
import { useState } from "react";

import Header from "@/components/layout/header";
import ClaimTicketForm from "@/components/form/claim-ticket.form";

const ClaimTicket = () => {
  const [formData, setFormData] = useState<object>({});
  return (
    <div className='bg-amber-300 px-5 pt-8 pb-2 md:pt-[58px] md:pb-[3.375rem]'>
      <Header />
      <div className='mx-auto mt-7 w-full max-w-[450px] md:mt-18'>
        <h1 className='text-center font-[inter] text-[2rem] leading-tight font-medium tracking-tight'>
          Finish your registration to claim your ticket
        </h1>

        <ClaimTicketForm />
      </div>
    </div>
  );
};

export default ClaimTicket;
