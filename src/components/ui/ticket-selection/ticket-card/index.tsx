import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
}

const Card = ({ children, className = "", header }: CardProps) => {
  return (
    <div
      className={`bg-strong-950 border-bg-surface-800 w-full max-w-sm rounded-lg border p-4 sm:max-w-md md:max-w-lg ${className} `}
    >
      {header && <div className="mb-4 flex items-center gap-3">{header}</div>}
      {children}
    </div>
  );
};

export default Card;
