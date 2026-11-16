import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./content/**/*.{md,mdx}"],
  theme: { extend: { colors: { ink: "#172725", moss: "#48675D", paper: "#F5F5F0", sand: "#E9E9E0" } } },
  plugins: [],
};
export default config;
