import React from "react";
import clsx from "clsx";

type CardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  numbered?: boolean;
  number?: number;
  className?: string;
};

const Card: React.FC<CardProps> = ({
  title,
  children,
  numbered = false,
  number,
  className,
  subtitle,
}) => {
  return (
    <div
      className={clsx(
        "border-soft-200 min-h-[160px] w-full rounded-[8px] border bg-white sm:min-w-[400px]",
        "flex flex-col",
        className
      )}
    >
      <div className="border-soft-200 flex items-center gap-4 border-b p-4">
        {numbered && typeof number === "number" && (
          <div className="bg-strong-950 flex h-6 w-6 items-center justify-center rounded p-4 text-sm font-semibold text-white">
            {number}
          </div>
        )}
        <div>
          <h2 className="font-medium tracking-tight text-black">{title}</h2>
          <p className="text-sub-600 text-[10px] tracking-tight italic">{subtitle}</p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
