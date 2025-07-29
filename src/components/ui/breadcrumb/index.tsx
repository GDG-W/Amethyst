"use client";
import React from "react";
import { usePathname } from "next/navigation";

import {
  BreadcrumbContainer,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./parts";

type BreadcrumbProps = {
  breadcrumbList: { name: string; link: string }[];
  separator?: React.ReactNode;
  listClassName?: string;
  itemClassName?: string;
  linkClassName?: string;
  separatorClassName?: string;
};

export default function Breadcrumb({
  breadcrumbList,
  separator,
  listClassName,
  itemClassName,
  linkClassName,
  separatorClassName,
}: BreadcrumbProps) {
  const pathname = usePathname();
  return (
    <BreadcrumbContainer>
      <BreadcrumbList className={listClassName}>
        {breadcrumbList.map((item, index) => {
          const isFirst = index === 0;
          const isActive = (isFirst && pathname === "/") || (!isFirst && pathname === item.link);
          const activateSeparator = isActive && !isFirst;

          return (
            <React.Fragment key={item.name}>
              {!isFirst && (
                <BreadcrumbSeparator
                  className={`${separatorClassName} ${activateSeparator ? "!text-away-base" : ""}`}
                >
                  {separator}
                </BreadcrumbSeparator>
              )}
              <BreadcrumbItem className={itemClassName}>
                <BreadcrumbLink
                  href={item.link}
                  className={`${linkClassName} ${isActive ? "!text-away-base" : ""}`}
                >
                  {item.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
}
