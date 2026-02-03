// PostCSS configuration.
//
// Node 22 (and older Node versions) expect this file to be written in
// CommonJS format unless the `type` field in package.json is set to
// "module".  Using the ES module syntax (`export default`) in this file
// will result in a syntax error at runtime, as Vite delegates to PostCSS
// which does not support ES module exports by default.  Therefore
// module.exports is used here instead.

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
