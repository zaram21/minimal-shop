export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pastelPink: "#f9c5d1",
        pastelBlue: "#c5e0f9",
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
