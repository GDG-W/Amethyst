import localFont from "next/font/local";

import Link from "next/link";

import { EyesIcon } from "@/components/icons/eyes";
import Button from "@/components/ui/button";
import Header from "@/components/layout/header";

const akira = localFont({
  src: "../components/fonts/Akira-Expanded-Demo.otf",
  display: "swap",
});

const NotFound = () => {
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
          <Link href={"/buy"}>
            <Button size="full">Buy ticket</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
