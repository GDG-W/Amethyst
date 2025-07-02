"use client";
import React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "link";
};

const Button = ({
  children,
  disabled,
  variant = "primary",
  loading = false,
  className = "",
  ...rest
}: ButtonProps) => {
  const buttonStyles = {
    variants: {
      primary: "bg-away-base text-white",
      secondary: "bg-away-base/10 border border-away-base text-away-base",
      link: "bg-transparent text-away-base underline underline-offset-2 p-0",
      danger: "bg-transparent border border-error-base text-error-base",
      ghost: "bg-transparent text-away-base",
    },
  };

  const isDisabled = loading || disabled;
  const isLink = variant === "link";

  return (
    <button
      disabled={isDisabled}
      className={cn(
        "flex items-center justify-center gap-2 rounded-full capitalize font-medium cursor-pointer text-base w-full",
        "transition-all duration-200 ease-in-out",
        "disabled:bg-bg-soft-200 disabled:text-white disabled:cursor-not-allowed",
        buttonStyles.variants[variant],
        !isLink ? "px-4 py-2.5" : "",
        !loading ? "hover:opacity-80" : "",
        className,
      )}
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
