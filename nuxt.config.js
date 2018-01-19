const h = require(".");

module.exports = {
  mode: "spa",
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
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },
  markdownit: {
    highlight: (src, lang) => {
      if (lang === "javascript") {
        src = h(src);
      }
      return `<pre><code>${src}</code></pre>`;
    }
  }
};
