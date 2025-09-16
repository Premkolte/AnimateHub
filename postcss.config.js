// postcss.config.js
export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss': {},
    'postcss-nesting': {},
    'autoprefixer': {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};


