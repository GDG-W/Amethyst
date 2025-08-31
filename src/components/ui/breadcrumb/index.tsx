"use client";
import React, { useEffect } from "react";
import { ChevronRight } from "lucide-react";

type BreadcrumbProps = {
  activeIndex: number;
  breadcrumbList: string[];
};

export default function Breadcrumb({ breadcrumbList, activeIndex = 0 }: BreadcrumbProps) {
  // I set a baseline so it doesn't run out of scope i.e when active index is greater than the last index of the array
  activeIndex = activeIndex > breadcrumbList.length - 1 ? breadcrumbList.length - 1 : activeIndex;

  useEffect(() => {
    const scrollToActiveLink = () => {
      const selector = `p[aria-current="page"]`;
      const activeCrumb = document.querySelector(selector);

      console.log(activeCrumb);

      if (!activeCrumb) return;

      activeCrumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    };

    requestAnimationFrame(scrollToActiveLink);
  }, [activeIndex]);

  return (
    <div className="w-fit overflow-x-scroll scroll-smooth whitespace-nowrap [--ms-overflow-style:none] [scrollbar-width:none] [::-webkit-scrollbar]:[display:none]">
      <nav aria-label="breadcrumb" data-slot="breadcrumb" className="flex w-fit items-center gap-1">
        {breadcrumbList.map((item, index) => {
          const isFirst = index === 0;
          const isActive = index === activeIndex;
          const activateSeparator = isActive && !isFirst;

          return (
            <React.Fragment key={item}>
              {!isFirst && (
                <ChevronRight
                  aria-hidden="true"
                  data-testid="chevron-icon"
                  strokeWidth={2}
                  className={`${activateSeparator ? "text-away-base" : "text-disabled-300"} size-5 [&>svg]:size-4`}
                />
              )}
              <p
                aria-current={isActive ? "page" : undefined}
                className={`${isActive ? "text-away-base font-medium" : "text-soft-400"} label-4`}
              >
                {item}
              </p>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}
