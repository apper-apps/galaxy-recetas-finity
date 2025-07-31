import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  loading,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:scale-105 hover:shadow-lg active:scale-95 focus:ring-primary-500",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:scale-105 hover:shadow-lg active:scale-95 focus:ring-secondary-500",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:scale-105 hover:shadow-lg active:scale-95 focus:ring-accent-500",
    outline: "border-2 border-primary-500 text-primary-500 bg-transparent hover:bg-primary-50 hover:scale-105 focus:ring-primary-500",
    ghost: "text-primary-600 bg-transparent hover:bg-primary-50 hover:scale-105 focus:ring-primary-500",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        loading && "pointer-events-none",
        className
      )}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      )}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;