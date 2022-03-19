module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        code: ['"Space Mono"', "monospace"],
        console: ['"Share Tech Mono"', "monospace"],
        script: ['"Nothing You Could Do"', "cursive"],
      },
      animation: {
        "slide-in-1": "0.75s slide-in 0s ease-in forwards",
        "slide-in-2": "0.75s slide-in 0.75s ease-in forwards",
        "slide-in-3": "0.75s slide-in 1.225s ease-in forwards",
        "slide-in-4": "0.75s slide-in 2.25s ease-in forwards",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            opacity: 0,
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("daisyui")],
};
