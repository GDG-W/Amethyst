"use client";

import { Toaster as Sonner, ToasterProps, toast as sonnerToast } from "sonner";
import React from "react";

import AlertIcon from "@/components/icons/alert";

export interface CustomToastProps {
  id: string | number;
  title: string;
  message: string;
}

function CustomErrorToast({ title, message }: CustomToastProps) {
  return (
    <div className="flex w-full max-w-[261px] items-center justify-between gap-x-3 rounded-xl bg-(--error-lighter) p-2 shadow-lg md:max-w-[332px]">
      <AlertIcon className="h-10 w-10 text-(--error-base)" />
      <div className="w-full text-(--error-base)">
        <h4 className="text-sm font-medium tracking-tight md:text-base">{title}</h4>
        <p className="mr-1.5 text-xs tracking-tight">{message}</p>
      </div>
    </div>
  );
}

export const toast = {
  error: (title: string, message: string) => {
    return sonnerToast.custom(
      (id) => <CustomErrorToast id={id} title={title} message={message} />,
      { position: "top-right" }
    );
  },
};

const Toaster = (props: ToasterProps) => {
  return <Sonner {...props} />;
};

export default Toaster;
