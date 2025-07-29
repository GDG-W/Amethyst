import { Slot } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";

export function BreadcrumbContainer({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />;
}

export function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      className={`flex items-center flex-wrap gap-1 ${className}`}
      {...props}
      suppressHydrationWarning
    />
  );
}

export function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={`inline-flex items-center gap-1 ${className}`} {...props} />;
}

export function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return <Comp className={`text-soft-400 hover:text-away-base label-4 ${className}`} {...props} />;
}

export function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={`[&>svg]:size-4 text-disabled-300 ${className}`}
      data-testid='separator'
      data-slot='breadcrumb-separator'
      role='presentation'
      aria-hidden='true'
      {...props}
      suppressHydrationWarning
    >
      {children ?? <ChevronRight />}
    </li>
  );
}
