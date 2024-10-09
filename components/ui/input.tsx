import * as React from "react";

import { cn } from "@/utils/cnHelper";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        // disable e to be allowed on the input type "number"
        onKeyDown={(event) => {
          if (type === "number" && event.key === "e") event.preventDefault();
        }}
        className={cn(
          "flex h-12 w-full rounded-md border border-[#E1E1E1] border-input bg-white px-3 py-[13px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        onWheel={(e) => {
          if (type === "number") e.currentTarget.blur();
        }}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
