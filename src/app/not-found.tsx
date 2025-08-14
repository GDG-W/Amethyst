"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { EyesIcon } from "@/components/icons/eyes";
import Button from "@/components/ui/button";
import Header from "@/components/layout/header";

const NotFound = () => {
  const navigator = useRouter();
  return (
    <section>
      <Header />
      <div className="max-width-5xl mx-auto mt-15">
        <EyesIcon className="mx-auto w-full max-w-[330px]" />
        <h3 className="text-strong-950 my-5 text-center font-[Akira_Expanded] text-4xl font-black uppercase sm:text-5xl">
          404, Page not found.
        </h3>
        <div className="mx-auto mt-10 w-full max-w-[330px]">
          <Button onClick={() => navigator.back()} size="full">
            Go back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
