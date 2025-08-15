interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "p-4 h-[52px] md:h-[3.75rem] items-center justify-center flex  rounded-full heading-6 border-4 transition-all duration-200 hover:scale-105 font-akira";

  const variants = {
    primary: "bg-[#F6B51E] border-[#1E1E1E] text-sm md:text-base w-[10.9375rem] md:w-[16.125rem] ",
    secondary: "bg-[#1E1E1E] border-2 border-white text-white w-[13.81rem]",
    ghost: "bg-[#1E1E1E] border-none text-white ",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
