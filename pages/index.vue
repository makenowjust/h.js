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
              <li v-bind:class="{'is-active': $route.path === '/demo/'}"><nuxt-link to="/demo/">Demonstration</nuxt-link></li>
            </ul>
          </div>
        </nav>
      </div>
    </section>

    <section class="section">
      <nuxt-child></nuxt-child>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <a class="icon is-medium has-text-dark" href="https://github.com/MakeNowJust/h.js">
              <i class="fa fa-2x fa-github"></i>
            </a>
          </p>
          <p>
          (C) 2015-2018 TSUYUSATO "<a href="https://github.com/MakeNowJust">MakeNowJust</a>" Kitsune
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables.sass";
@import "~bulma/sass/utilities/mixins.sass";

.hero-body {
  .logo {
    font-size: 0.5rem;
    width: 42em;
    padding: 1em;
    margin: 2em auto;

    @include mobile {
      font-size: 2vw;
      width: 84vw;
    }
  }

  // For opening animation:

  $logo-anime-duration: 0.5s;
  $title-anime-duration: 0.4s;
  $title-anime-delay: $logo-anime-duration + 0.3s;
  $subtitle-anime-delay: $title-anime-delay + $title-anime-duration;

  .logo {
    animation: logo ease-in $logo-anime-duration forwards;
    opacity: 0;
  }

  .title,
  .subtitle {
    animation: title ease-in $title-anime-duration forwards;
    opacity: 0;
  }

  .title {
    animation-delay: $title-anime-delay;
  }

  .subtitle {
    animation-delay: $subtitle-anime-delay;
  }
}

.tabs .is-active a {
  background-color: $white !important;
}

@keyframes logo {
  100% {
    opacity: 1;
  }
}

@keyframes title {
  0% {
    transform: translateY(0.4em);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
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
