/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Oswald: ["Oswald", "sans-serif"],
        BeVietnamPro: ["Be Vietnam Pro", "sans-serif"],
      },
      screens: {
        "3xl": "1760px",
        std: "1400px",
        xlg: "1366px",
        lgd: { max: "1023px" },
        mdd: { max: "767px" },
        xs: "430px",
      },
      colors: {
        background: {
          DEFAULT: "var(--background)",
          secondary: "var(--background-secondary)",
          blueDark: {
            1: "var(--blue-dark-opacity-15)",
          },
        },
        gray: {
          1: "var(--gray)",
          2: "var(--gray-2)",
        },
        border: {
          1: "var(--border-primary)",
          2: "var(--blue-light-opacity-28)",
        },
        yellow: {
          1: "var(--yellow)",
        },

        blue: {
          1: "var(--blue)",
          2: "var(--blue-2)",
        },

        green: {
          1: "var(--green)",
          2: "var(--green-2)",
        },

        orange: {
          1: "var(--orange)",
        },
      },
      backgroundImage: {
        "linear-header":
          "linear-gradient(to left top, #091557 0%, #122690 60%, #203397 100%)",
        "linear-background-logo":
          "linear-gradient(to right bottom, #1553EF 0%, #0C3089 60%, #0C1A4C 100%)",
        "linear-border-logo":
          "linear-gradient(to right bottom, rgba(20, 86, 255, 0.5) 0%, rgba(101, 139, 236, 0.5) 60%, rgba(9, 46, 141, 0.5) 100%)",
        "linear-background-chart":
          "linear-gradient(to right bottom, rgba(10, 31, 85, 0.4) 0%, rgba(16, 44, 115, 0.4) 40%, rgba(12, 26, 76, 0.4) 100%)",
        "linear-background-score":
          "linear-gradient(to right bottom, rgba(0, 40, 159, 1) 0%, rgba(0, 31, 123,1) 23%, rgba(9, 21, 87, 1) 100%)",
      },
    },
  },
  plugins: [],
};
