// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
      ],
    },
  },
  babel: {
    plugins: [
      "babel-plugin-macros",
      ["babel-plugin-styled-components", { "displayName": true }],
    ],
  },
}
