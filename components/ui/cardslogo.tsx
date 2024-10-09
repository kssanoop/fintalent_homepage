import * as LogoPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@/utils/cnHelper";

const CardIcon = React.forwardRef<
  React.ElementRef<typeof LogoPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LogoPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LogoPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-12 w-12 shrink-0 overflow-hidden rounded-[5.88px] shadow",
      className,
    )}
    {...props}
  />
));
CardIcon.displayName = LogoPrimitive.Root.displayName;

const CardIconImage = React.forwardRef<
  React.ElementRef<typeof LogoPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof LogoPrimitive.Image>
>(({ className, ...props }, ref) => (
  <LogoPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
CardIconImage.displayName = LogoPrimitive.Image.displayName;

const CardIconFallback = React.forwardRef<
  React.ElementRef<typeof LogoPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof LogoPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <LogoPrimitive.Fallback
    ref={ref}
    className={cn(
      "rrounded-[5.88px] flex h-full w-full items-center justify-center bg-muted",
      className,
    )}
    {...props}
  />
));
CardIconFallback.displayName = LogoPrimitive.Fallback.displayName;

export { CardIcon, CardIconFallback, CardIconImage };
