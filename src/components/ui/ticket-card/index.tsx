import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
}

const Card = ({ children, className = "", header }: CardProps) => {
  return (
    <div
      className={`
		bg-white 
		border 
		border-[#EBEBEB] 
		rounded-lg 
		p-4
		w-full
		max-w-sm
		sm:max-w-md
		md:max-w-lg
		${className}
	  `}
    >
      {header && <div className='flex items-center gap-3 mb-4 '>{header}</div>}
      {children}
    </div>
  );
};

export default Card;
