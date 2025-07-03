"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ChevronIcon } from "../icons/chevron-icon";

import { Breadcrumb as ShadBreadcrumb, BreadcrumbList } from "./breadcrumb";
import { Button } from "./button";
import { CrumbDetail } from "./crumb-details";
import { Separator } from "./separator";

import { Crumb, BreadcrumbProps } from "./types";

export const BreadcrumbComponent = ({ crumbs }: BreadcrumbProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const [currentCrumb, setCurrentCrumb] = useState<Crumb>(crumbs[pathName]);

  useEffect(() => {
    if (!crumbs[pathName]) {
      router.push("/");
      return;
    }
    setCurrentCrumb(crumbs[pathName]);

    const scrollToActiveLink = () => {
      const selector = `span[aria-current="page"]`;
      const activeLink = document.querySelector(selector);

      if (!activeLink) return;

      activeLink.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    };

    requestAnimationFrame(scrollToActiveLink);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    if (!currentCrumb?.prev) {
      router.push("/");
      return;
    }
    router.push(currentCrumb.prev);
  };

  return (
    <div className='flex gap-x-[0.479rem] items-center font-[inter]'>
      <Button
        onClick={goBack}
        variant='ghost'
        className='h-auto hover:bg-transparent flex items-center gap-x-1 cursor-pointer'
      >
        <span className='w-5 h-5 flex justify-center items-center'>
          <ChevronIcon />
        </span>
        <span className='text-(--icon-strong-950) leading-none text-sm'>Go Back</span>
      </Button>

      <Separator orientation='vertical' className='bg-[#C3C9D2] shrink-0' />

      <ShadBreadcrumb className='basis-[calc(100% - 110px)] overflow-x-scroll [scrollbar-width:none] [--ms-overflow-style:none] [::-webkit-scrollbar]:[display:none] whitespace-nowrap scroll-smooth'>
        <BreadcrumbList className='flex text-sm'>
          {Object.values(crumbs).map((crumb) => (
            <CrumbDetail key={crumb.href} crumb={crumb} isCurrent={crumb === currentCrumb} />
          ))}
        </BreadcrumbList>
      </ShadBreadcrumb>
    </div>
  );
};
