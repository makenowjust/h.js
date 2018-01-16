<template>
  <div>
  <section class="hero is-medium is-dark is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <pre class="logo"><code v-html="hjs"></code></pre>
        <h1 class="title">h.js</h1>
        <p class="subtitle"><strong>2KB</strong> JavaScript Syntax Highlighter</p>
      </div>
    </div>

    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
        <div class="container">
          <ul>
            <li v-bind:class="{'is-active': $route.path === '/'}"><nuxt-link to="/">README</nuxt-link></li>
            <li v-bind:class="{'is-active': $route.path === '/demo'}"><nuxt-link to="/demo">Demonstration</nuxt-link></li>
          </ul>
        </div>
      </nav>
    </div>
  </section>

    <nuxt-child></nuxt-child>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  font-size: 0.5em;
  width: 44em;
  margin: auto auto 2em auto;
}
</style>

<script>
import rawHjs from "!raw-loader!~/h.js";
import * as h from "~";

export default {
  props: ["page"],
  head() {
    return {
      titleTemplate: "%s - h.js"
    };
  },
  computed: {
    hjs() {
      console.log(this.$route.path);
      return h(rawHjs);
    }
  }
};
</script>
