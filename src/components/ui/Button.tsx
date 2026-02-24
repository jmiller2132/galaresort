import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variants = {
  primary: "bg-river-blue text-white hover:bg-river-blue-light active:bg-river-blue",
  secondary: "bg-wood text-white hover:bg-wood-light active:bg-wood",
  outline: "border-2 border-river-blue text-river-blue hover:bg-river-blue hover:text-white active:bg-river-blue-dark",
  ghost: "text-river-blue hover:bg-river-blue/10 active:bg-river-blue/15",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-semibold tracking-wide uppercase rounded-md transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-river-blue focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
