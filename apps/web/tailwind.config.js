/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
];

export const theme = {
  extend: {
    colors: {
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
    },
  },
};

export const plugins = [];
