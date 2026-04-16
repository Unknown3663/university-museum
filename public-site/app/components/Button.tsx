import { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-block px-6 sm:px-8 py-2.5 sm:py-3 font-medium text-sm sm:text-base rounded-lg transition-[transform,background-color,border-color,color] duration-300";

  const variants = {
    primary:
      "bg-black/35 backdrop-blur-md text-white border border-white/40 hover:bg-black/50 hover:scale-[1.03]",
    secondary:
      "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black",
  };

  return (
    <a
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
