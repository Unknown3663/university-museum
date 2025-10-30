/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px", // Extra small devices
      },
      fontFamily: {
        serif: ["var(--font-playfair)"],
        sans: ["var(--font-inter)"],
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in",
        "fade-in-fast": "fadeIn 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
            maxHeight: "0",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            maxHeight: "100px",
          },
        },
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
