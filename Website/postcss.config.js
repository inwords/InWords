module.exports = ({ env }) => ({
  plugins: {
    autoprefixer: {},
    cssnano: env === 'production' ? { preset: 'default' } : false
  }
});
