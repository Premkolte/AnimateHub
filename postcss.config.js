import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    // TailwindCSS core for utility-based styling
    tailwindcss(),

    // Autoprefixer ensures proper vendor prefixing across browsers
    autoprefixer({
      overrideBrowserslist: ["last 2 versions", "not dead"],
      grid: "autoplace",
      flexbox: "no-2009",
    }),
  ],
};


