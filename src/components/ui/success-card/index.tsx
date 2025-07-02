"use client";
import React from "react";

import { useRouter } from "next/navigation";

import ConfettiIcon from "@/components/icons/confetti";

import Button from "../button";

const SuccessCard = ({ title, summary }: { title: string; summary?: string }) => {
  const navigator = useRouter();
  return (
    <section className='w-full h-full flex items-center justify-center bg-transparent px-9 py-15'>
      <main
        role='status'
        aria-live='polite'
        className='w-full max-w-96 min-w-60 bg-white border border-stroke-soft-200 rounded-md px-7 py-10 flex flex-col gap-3'
      >
        <ConfettiIcon />
        <h4 className='capitalize font-semibold text-3xl text-black'>{title}</h4>
        {summary && <p className='text-text-sub-600 text-md'>{summary}</p>}
        <div className='flex flex-col gap-2 mt-3'>
          <Button
            variant='primary'
            onClick={() => {
              navigator.push("/");
            }}
          >
            go home
          </Button>
          <Button variant='secondary'>buy more</Button>
        </div>
      </main>
    </section>
  );
};

export default SuccessCard;
