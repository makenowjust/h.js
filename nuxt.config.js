const h = require(".");
const hljs = require("highlight.js");

const replaceDelimiter = s => s.replace(/({{|}})/g, "<span>$1</span>");

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
        return `<pre><code>${replaceDelimiter(h(src))}</code></pre>`;
      } else if (lang && hljs.getLanguage(lang)) {
        try {
          return replaceDelimiter(hljs.highlight(lang, src, true).value);
        } catch (e) {}
      }
      return "";
    }
  }
};
