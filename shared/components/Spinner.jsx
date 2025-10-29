export default function Spinner({ size = "md", color = "blue" }) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const colors = {
    blue: "border-blue-600",
    gray: "border-gray-600",
    white: "border-white",
  };

  return (
    <div
      className={`animate-spin rounded-full border-b-2 ${sizes[size]} ${colors[color]}`}
    ></div>
  );
}
