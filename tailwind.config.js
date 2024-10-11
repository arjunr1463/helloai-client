/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        monasans: "monasans",
        monasansMedium: "monasansMedium",
        monasansSemibold: "monasansSemibold",
        monasansBold: "monasansBold",
        monasansItalic:"monasansItalic"
      },
    },
  },
  plugins: [],
};
