export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}) {
  const baseStyles =
    "inline-block px-8 py-3 font-medium rounded-lg transition-all duration-300";

  const variants = {
    primary:
      "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 hover:scale-105",
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
