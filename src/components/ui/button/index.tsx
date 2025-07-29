"use client";
import React from "react";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "link";
};
const Button = ({ children, disabled, variant, loading = false, ...rest }: ButtonProps) => {
  const buttonStyles = {
    variants: {
      primary: "bg-away-base text-white ",
      secondary: "bg-away-base/10 border border-away-base text-away-base",
      link: "bg-transparent text-away-base underline underline-offset-2",
    },
  };
  const buttonVariant = variant || "primary";
  const isDisabled = loading || disabled;
  return (
    <button
      disabled={isDisabled}
      className={`flex items-center justify-center gap-2 px-3 py-3 w-full min-w-30 rounded-full capitalize hover:opacity-80 disabled:bg-bg-soft-200 disabled:text-white disabled:cursor-not-allowed ${buttonStyles.variants[buttonVariant]}
      `}
      {...rest}
    >
      {loading ? (
        <span className='h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
