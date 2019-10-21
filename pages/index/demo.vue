<template>
  <div class="container">
    <div class="columns is-flex-tablet">
      <div class="column is-6">
        <div class="tabs">
          <ul>
            <li class="is-active">
              <a>
                <span class="icon is-small"
                  ><i class="fa fa-terminal"></i
                ></span>
                <label for="source">Input</label>
              </a>
            </li>
          </ul>
        </div>
        <div class="field">
          <textarea
            v-model="source"
            id="source"
            class="textarea source"
            :rows="rows"
          ></textarea>
        </div>
      </div>

      <div class="column is-6">
        <div class="tabs">
          <ul>
            <li v-bind:class="{ 'is-active': tab === 'rendered' }">
              <a v-on:click="changeTab('rendered')">
                <span class="icon is-small"
                  ><i class="fa fa-paint-brush"></i
                ></span>
                <span>Rendered</span>
              </a>
            </li>
            <li v-bind:class="{ 'is-active': tab === 'html' }">
              <a v-on:click="changeTab('html')">
                <span class="icon is-small"><i class="fa fa-code"></i></span>
                <span>HTML</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="content" v-if="tab === 'rendered'">
          <pre><code v-html="highlighted"></code></pre>
        </div>
        <div class="content" v-if="tab === 'html'">
          <pre><code v-html="highlightedHTML"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.source {
  font-family: "Share Tech Mono", monospace;
}
</style>

<script>
import h from "~";
import * as hljs from "highlight.js/lib/highlight.js";

import * as hljsXML from "highlight.js/lib/languages/xml";

hljs.registerLanguage("xml", hljsXML);

const trimIndent = parts => {
  const lines = parts.join("").split(/\n/g);
  const sizes = lines
    .map(line => line.match(/^\s+(?=\S)/))
    .map(match => (match && match[0].length) || Infinity);
  const minSize = Math.min(...sizes);
  return lines
    .map(line => line.slice(minSize))
    .join("\n")
    .trim();
};

export default {
  head() {
    return {
      title: "Live Demo"
    };
  },
  data() {
    return {
      tab: "rendered",
      source: trimIndent`
        const words = parts => parts.join('').split(/\\s+/g);

        for (const word of words\`hello h.js world\`) {
          console.log(word);
        }
      `
    };
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
    }
  },
  computed: {
    highlighted() {
      return h(this.source);
    },
    highlightedHTML() {
      return hljs.highlight("html", this.highlighted, true).value;
    },
    rows() {
      const lines = this.source.split("\n");
      return Math.max(5, lines.length);
    }
  }
};
</script>
