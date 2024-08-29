const { addIconSelectors } = require("@iconify/tailwind");

/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
];

export const theme = {
  extend: {
    colors: {
      // https://www.tailwindshades.com/#color=223%2C25%2C15&step-up=8&step-down=8&hue-shift=-14&name=mirage&base-stop=9.5&v=1&overrides=e30%3D
      mirage: {
        DEFAULT: "#1D2230",
        50: "#D6DEE6",
        100: "#C9D3DE",
        200: "#AFBECF",
        300: "#96A8C0",
        400: "#7C92B1",
        500: "#637BA1",
        600: "#526689",
        700: "#435270",
        800: "#343F56",
        900: "#242B3D",
        950: "#1D2230",
      },
      bunker: {
        DEFAULT: "#0D1016",
        50: "#304150",
        100: "#2E3E4D",
        200: "#2A3846",
        300: "#263240",
        400: "#222D39",
        500: "#1F2733",
        600: "#1B222D",
        700: "#171C26",
        800: "#131720",
        900: "#0F121A",
        950: "#0D1016",
      },
      accent: {
        DEFAULT: "#0B6C7E",
        50: "#9EE9F7",
        100: "#8EE5F5",
        200: "#6DDDF2",
        300: "#4CD6EF",
        400: "#2BCEED",
        500: "#14C0E1",
        600: "#11A4C0",
        700: "#0E889F",
        800: "#0B6C7E",
        900: "#095462",
        950: "#074854",
      },
    },
  },
};

export const plugins = [addIconSelectors(["material-symbols"])];
