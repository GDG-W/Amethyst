import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card'
      className={cn(
        "bg-(--background) border border-solid border-(--stroke-soft-200) rounded-lg",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        "p-4 flex justify-start items-center gap-x-4 border-b border-solid border-(--stroke-soft-200)",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot='card-title' className={cn("leading-none font-medium", className)} {...props} />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-description'
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot='card-action' className={cn("", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot='card-content' className={cn("w-full px-4 py-5", className)} {...props} />;
}

function CardItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot='card-item' className={cn("w-full", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot='card-footer' className={cn("", className)} {...props} />;
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardItem,
};
