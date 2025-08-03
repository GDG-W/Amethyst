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
      className={`disabled:bg-bg-soft-200 flex w-full min-w-30 items-center justify-center gap-2 rounded-full px-3 py-3 capitalize hover:opacity-80 disabled:cursor-not-allowed disabled:text-white ${buttonStyles.variants[buttonVariant]} `}
      {...rest}
    >
      {loading ? (
        <span className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
