import Link from "next/link";

import { ChevronIcon } from "../icons/chevron-icon";

import { BreadcrumbItem, BreadcrumbPage, BreadcrumbLink, BreadcrumbSeparator } from "./breadcrumb";
import { Crumb } from "./types";

export const CrumbDetail = ({ crumb, isCurrent }: { crumb: Crumb; isCurrent?: boolean }) => {
  const Chevron = (
    <span className='w-5 h-5 flex justify-center items-center mx-1'>
      <ChevronIcon
        direction='right'
        color={isCurrent ? "var(--away-base)" : "var(--icon-disabled-300)"}
      />
    </span>
  );

  return (
    <>
      {crumb.prev && <BreadcrumbSeparator>{Chevron}</BreadcrumbSeparator>}

      {isCurrent ? (
        <BreadcrumbItem>
          <BreadcrumbPage className='text-(--away-base) text-sm leading-none whitespace-nowrap'>
            {crumb.label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href={`${crumb.href}`}
              className='text-(--text-soft-400) text-sm leading-none whitespace-nowrap'
            >
              {crumb.label}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </>
  );
};
