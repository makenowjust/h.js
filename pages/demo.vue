<template>
  <div>
    <hjs-hero page="/demo"></hjs-hero>

    <section class="section">
      <div class="container">
        <div class="field">
          <label for="source" class="label">Input:</label>
          <textarea v-model="source" id="source" class="textarea source" rows="10"></textarea>
        </div>

        <div class="tabs">
          <ul>
            <li v-bind:class="{'is-active': tab === 'rendered'}">
              <a v-on:click="changeTab('rendered')">
                <span class="icon is-small"><i class="fa fa-paint-brush"></i></span>
                <span>Rendered</span>
              </a>
            </li>
            <li v-bind:class="{'is-active': tab === 'html'}">
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
          <pre><code v-text="highlighted"></code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.source {
  font-family: "Share Tech Mono", monospace;
}
</style>

<script>
import HjsHero from "~/components/hjs-hero.vue";

import * as h from "~";

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
  components: { HjsHero },
  head() {
    return {
      title: "h.js demonstration"
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
    }
  }
};
</script>
