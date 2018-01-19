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

    <section class="section">
      <nuxt-child></nuxt-child>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  font-size: 0.5rem;
  width: 42em;
  padding: 1em;
  margin: 2em auto;
}

@media (max-width: 768px) {
  .logo {
    font-size: 2vw;
    width: 84vw;
  }
}

.tabs .is-active a {
  background-color: #fff !important;
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
      return h(rawHjs);
    }
  }
};
</script>
