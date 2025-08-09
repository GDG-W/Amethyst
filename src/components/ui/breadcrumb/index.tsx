"use client";
import React from "react";
import { ChevronRight } from "lucide-react";

type BreadcrumbProps = {
  breadcrumbList: { name: string; link: string }[];
  activeIndex: number;
  handleClick: (index: number) => void;
};

export default function Breadcrumb({
  breadcrumbList,
  activeIndex = 1,
  handleClick,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label='breadcrumb'
      data-slot='breadcrumb'
      className='flex flex-wrap items-center gap-1'
    >
      {breadcrumbList.map((item, index) => {
        const isFirst = index === 0;
        const isActive = index === activeIndex;
        const activateSeparator = isActive && !isFirst;

        return (
          <React.Fragment key={item.name}>
            {!isFirst && (
              <ChevronRight
                aria-hidden='true'
                data-testid='chevron-icon'
                strokeWidth={2}
                className={`${activateSeparator ? "text-away-base" : "text-disabled-300"} size-5 [&>svg]:size-4`}
              />
            )}
            <button
              onClick={() => handleClick(index)}
              aria-current={isActive ? "page" : undefined}
              className={`${isActive ? "text-away-base" : "text-soft-400"} hover:text-away-base label-4 cursor-pointer`}
            >
              {item.name}
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
