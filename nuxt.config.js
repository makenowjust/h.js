const h = require(".");

module.exports = {
  build: {
    postcss: {
      plugins: {
        "postcss-custom-properties": {
          warnings: false
        }
      }
    }
  },
  modules: ["@nuxtjs/markdownit", "@nuxtjs/bulma", "@nuxtjs/font-awesome"],
  css: ["~assets/scss/h.scss"],
  markdownit: {
    highlight: (src, lang) => {
      if (lang === "javascript") {
        src = h(src);
      }
      return `<pre><code>${src}</code></pre>`;
    }
  }
};
