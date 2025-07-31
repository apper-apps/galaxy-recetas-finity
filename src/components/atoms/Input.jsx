import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-3 rounded-lg border transition-colors duration-200 bg-white",
        "focus:outline-none focus:ring-2 focus:ring-primary-500/20",
        error 
          ? "border-red-300 focus:border-red-500" 
          : "border-gray-200 focus:border-primary-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;