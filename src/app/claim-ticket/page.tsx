"use client";
import { useState } from "react";

import Header from "@/components/layout/header";
import TextField from "@/components/ui/inputs/text-field";

const ClaimTicket = () => {
  const [formData, setFormData] = useState<object>({});
  return (
    <div className='bg-amber-300 px-5 pt-8 pb-2 md:pt-[58px] md:pb-[3.375rem]'>
      <Header />
      <div className='mx-auto mt-7 w-full max-w-[450px] md:mt-18'>
        <h1 className='text-center font-[inter] text-[2rem] leading-tight font-medium tracking-tight'>
          Finish your registration to claim your ticket
        </h1>

        <form className='mt-6 space-y-6 rounded-[0.5rem] border border-solid border-(--stroke-soft-200) bg-(--static-white) p-5 md:mt-9'>
          <TextField
            id='fullname'
            label='Full name'
            placeholder='Enter full name'
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <TextField
            id='emailaddress'
            label='Email address'
            placeholder='Enter email address'
            type='email'
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <TextField
            id='fullname'
            label='Full name'
            placeholder='Enter full name'
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <TextField
            id='fullname'
            label='Full name'
            placeholder='Enter full name'
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <TextField
            id='fullname'
            label='Full name'
            placeholder='Enter full name'
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <button className='h-12 w-full rounded-[2.25rem] bg-(--away-base) text-center align-middle font-[inter] text-lg leading-6 font-bold tracking-tight text-(--bg-white-0) md:h-15'>
            Claim ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClaimTicket;
