"use client";
import React from "react";

import { useRouter } from "next/navigation";

import localFont from "next/font/local";

import { EyesIcon } from "@/components/icons/eyes";
import Button from "@/components/ui/button";
import Header from "@/components/layout/header";

const akira = localFont({
  src: "../components/fonts/Akira-Expanded-Demo.otf",
  display: "swap",
});

const NotFound = () => {
  const navigator = useRouter();
  return (
    <section>
      <Header />
      <div className="max-width-5xl mx-auto my-15">
        <EyesIcon className="mx-auto w-full max-w-xl" />
        <h3
          className={`text-strong-950 my-7 text-center sm:text-4xl ${akira.className} text-2xl uppercase`}
        >
          404, Page not found.
        </h3>
        <div className="mx-auto mt-10 w-full max-w-[330px]">
          <Button onClick={() => navigator.push("/buy")} size="full">
            Buy ticket
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
