import clsx from "clsx";
import { forwardRef, HTMLAttributes } from "react";

interface IBlockContainer extends HTMLAttributes<HTMLDivElement> {
  variant?: "lg" | "md" | "sm" | "xl"|"8";
}

// Centralized variant mapping
const variantStyles = {
  sm: "p-0",
  lg: "p-5",
  "8":"p-8",
  md: "p-[10px]",
  xl: "p-10",
  
};

const BlockContainer = forwardRef<HTMLDivElement, IBlockContainer>(({ variant = "lg", className, ...props }, ref) => {
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>} // Optional ref, will work even if not provided
      className={clsx(
        "flex items-center flex-col justify-center rounded-lg",
        variantStyles[variant], // Cleaner way to apply variant styles
        className
      )}
      {...props}
    />
  );
});

export default BlockContainer;
