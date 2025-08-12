"use client";
import clsx from "clsx";

import React from "react";
import { useRouter } from "next/navigation";

import ConfettiIcon from "@/components/icons/confetti";

import Close from "@/components/icons/close";
import ModalProps from "@/types/modal";

import Button from "../button";

const SuccessCard = ({ title, summary, links, className, onClose }: ModalProps) => {
  const navigator = useRouter();
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title}
      aria-describedby={summary}
      className={clsx(
        "bg-white-0 border-soft-200 flex w-full max-w-[410px] min-w-60 flex-col gap-3 rounded-md border px-7 py-10",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <ConfettiIcon />
        {onClose ? (
          <Button
            aria-label="Close modal"
            className={`h-8 w-8 cursor-pointer`}
            onClick={() => {
              onClose();
            }}
          >
            <Close className="h-full w-full" />
          </Button>
        ) : null}
      </div>
      <h4 className="heading-5 md:heading-4 font-semibold text-black capitalize">{title}</h4>
      {summary && <p className="text-text-sub-600 label-4 md:label-3">{summary}</p>}
      <div className="mt-3 flex flex-col gap-2">
        {links ? (
          links?.map((link) => {
            return (
              <Button
                key={link.id}
                variant={link.type}
                onClick={() => {
                  navigator.push(link.href);
                }}
              >
                {link.text}
              </Button>
            );
          })
        ) : (
          <>
            <Button
              variant={"primary"}
              onClick={() => {
                navigator.push("/buy");
              }}
            >
              Buy more tickets
            </Button>
            <Button
              variant={"secondary"}
              onClick={() => {
                navigator.push("/dashboard");
              }}
            >
              Go to dashboard
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessCard;
