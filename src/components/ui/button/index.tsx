"use client";
import React from "react";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  loading?: boolean;
  size?: "full" | "fit";
  variant?: "primary" | "secondary" | "link";
};
const Button = ({
  children,
  disabled,
  className,
  size = "full",
  loading = false,
  variant = "primary",
  ...rest
}: ButtonProps) => {
  const buttonStyles = {
    sizes: {
      full: "w-full",
      fit: "w-fit",
    },
    variants: {
      primary: "bg-away-base text-white",
      secondary: "bg-away-base/10 border border-away-base text-away-base",
      link: "bg-transparent text-away-base underline underline-offset-2",
      ghost: "bg-transparent",
    },
  };

  const isDisabled = loading || disabled;

  return (
    <button
      disabled={isDisabled}
      className={`disabled:bg-soft-200 cursor-pointer ${variant === buttonStyles.variants.ghost ? "" : "flex min-w-30 items-center justify-center gap-2 rounded-full px-6 py-2.5 font-medium tracking-tight capitalize hover:opacity-80 disabled:cursor-not-allowed disabled:text-white"} ${buttonStyles.variants[variant]} ${buttonStyles.sizes[size]} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
