<template>
  <div>
    <hjs-hero page="/"></hjs-hero>

    <section class="section">
      <div class="container">
        <div class="content" v-html="readme"></div>
      </div>
    </section>
  </div>
</template>

<script>
import HjsHero from "~/components/hjs-hero.vue";

import readme from "~/README.md";

const readmeWithoutTitle = `<section>${readme.slice(
  readme.indexOf("<h2>Feature</h2>")
)}`;

export default {
  components: { HjsHero },
  head() {
    return {
      title: "h.js - 2KB JavaScript Syntax Highlighter"
    };
  },
  computed: {
    hjs() {
      return h(rawHjs);
    },
    readme() {
      return readmeWithoutTitle;
    }
  }
};
</script>
