import React from "react";
import clsx from "clsx";

type CardProps = {
  title: string;
  children: React.ReactNode;
  numbered?: boolean;
  number?: number;
  className?: string;
};

const Card: React.FC<CardProps> = ({ title, children, numbered = false, number, className }) => {
  return (
    <div
      className={clsx(
        "bg-white border border-soft-200 rounded-[8px] min-w-[400px] min-h-[160px] w-full",
        "flex flex-col",
        className,
      )}
    >
      <div className='flex items-center gap-4 p-4 border-b border-soft-200'>
        {numbered && typeof number === "number" && (
          <div className='bg-strong-950 text-white p-4 w-6 h-6 rounded flex items-center justify-center text-sm font-semibold'>
            {number}
          </div>
        )}
        <h2 className='font-medium text-black tracking-tight'>{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
