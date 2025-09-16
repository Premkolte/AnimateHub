// postcss.config.js
export default {
  plugins: {
    "postcss-import": {},       // allows @import in CSS
    "tailwindcss": {},          // tailwind setup
    "postcss-nesting": {},      // future CSS nesting support
    "autoprefixer": {},         // cross-browser support
    ...(process.env.NODE_ENV === "production" ? { "cssnano": {} } : {}), // minify only in prod
  },
};

