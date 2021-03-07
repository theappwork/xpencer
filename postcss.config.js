const modules = process.env.NODE_ENV === 'production' ? [ require('cssnano') ] : [];

module.exports = {
  plugins: [ require('tailwindcss'), require('autoprefixer'), ...modules ],
};
