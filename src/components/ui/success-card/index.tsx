import React from "react";

import ConfettiIcon from "@/components/icons/confetti";

import Button from "../button";

const SuccessCard = () => {
  return (
    <section className='w-screen h-dvh flex items-center justify-center bg-black'>
      <main className='min-w-60 bg-white border border-bg-soft-200 rounded-md px-7 py-10 flex flex-col gap-5'>
        <ConfettiIcon />
        <h4 className='capitalize font-semibold text-3xl'>Successful</h4>
        <p className='text--bg-sub-600 text-sm'>very successful</p>
        <div>
          <Button variant='primary'>Proceed</Button>
          <Button variant='secondary'>buy more</Button>
        </div>
      </main>
    </section>
  );
};

export default SuccessCard;
