"use client";

import React from "react";
import { useRouter } from "next/navigation";

import ConfettiIcon from "@/components/icons/confetti";

import Button from "../button";

const SuccessCard = ({ title, summary }: { title: string; summary?: string }) => {
  const navigator = useRouter();
  return (
    <div className='w-full h-full flex items-center justify-center bg-transparent px-9 py-15'>
      <div className='w-full max-w-[410px] min-w-60 bg-white-0 border border-soft-200 rounded-md px-7 py-10 flex flex-col gap-3'>
        <ConfettiIcon />
        <h4 className='heading-5 md:heading-4 capitalize font-semibold text-black'>{title}</h4>
        {summary && <p className='text-text-sub-600 label-4 md:label-3'>{summary}</p>}
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
      </div>
    </div>
  );
};

export default SuccessCard;
