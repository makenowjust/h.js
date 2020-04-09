<template>
  <div id="app">
    <div class="app__container">
      <div class="app__content">
        <div class="app__editor">
          <span class="app__editor-tag">editable</span>
          <CodeEditor :value="hSource" :highlight="h" />
        </div>
        <h1 class="app__title">{{ pkg.name }}</h1>
        <p class="app__subtitle">{{ pkg.description }}</p>
        <p>
          <code class="app__install">
            $ npm install {{ pkg.name }}@{{ pkg.version }}
          </code>
          <a class="app__badge" href="https://github.com/MakeNowJust/h.js">
            GitHub
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import h from "..";

import CodeEditor from "./components/CodeEditor";

import pkg from "../package.json";
import hSource from "!raw-loader!../h.js";

export default {
  name: "App",
  components: {
    CodeEditor,
  },
  data: () => ({
    pkg,
    hSource: hSource.trim(),
    h,
  }),
};
</script>

<style>
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
}

body {
  margin: 0;
}

*,
:after,
:before {
  box-sizing: inherit;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}

/* For h.js: */

/* comment */
span.c {
  color: #7a7a7a;
  font-style: italic;
}

/* JSDoc tag */
span.d {
  color: #ff470f;
}

/* keyword */
span.k {
  color: #f14668;
}

/* value */
span.v {
  color: #3273dc;
}

/* string */
span.s {
  color: #3298dc;
}

/* interpolation */
span.i {
  color: #00d1b2;
}

/* regexp */
span.r {
  color: #b86bff;
}

/* operator */
span.o {
  color: #48c774;
}

/* punctual symbol */
span.p {
  color: #00d1b2;
}

/* function name */
span.f {
  color: #0a0a0a;
  font-weight: bold;
}
</style>

<style scoped>
.app__container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  color: #fff;
  background: #363636;
}

.app__content {
  font-size: 14px;
  max-width: 100%;
  padding: 10px;
  text-align: center;
}

.app__editor {
  tab-size: 4ch;
  min-height: 26em;
  overflow: auto;
  margin: 1.67em 0;
  width: 42em;
  overflow-x: auto;
  line-height: 1.5;
  font-size: 0.8rem;
  font-family: Share Tech Mono, monospace;
  padding: 2.6em 1em 1em 1em;
  color: #2c3e50;
  background: #f7f7f7;
  border-radius: 3px;
  position: relative;

  animation: logo ease-in 0.5s forwards;
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .app__editor {
    font-size: 2vw;
    width: 84vw;
    margin: 0 auto;
  }
}

.app__editor-tag {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  background: #2c3e50;
  color: #f7f7f7;
  padding: 0.3em 1em;
  text-transform: uppercase;
  border-bottom-left-radius: 3px;
}

.app__title {
  font-family: Nothing You Could Do, cursive;
  font-size: 2rem;

  animation: title ease-in 0.4s forwards;
  animation-delay: 0.5s;
  opacity: 0;
}

.app__subtitle {
  font-family: Nothing You Could Do, cursive;
  font-size: 1.25rem;

  animation: title ease-in 0.4s forwards;
  animation-delay: 0.9s;
  opacity: 0;
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

.app__install {
  padding: 0.5em;
  margin: 0 0.25em;
  background: #c4c4c4;
  color: #2c3e50;
  font-family: Share Tech Mono, monospace;
}

.app__badge {
  padding: 0.5em;
  margin: 0 0.25em;
  color: #c4c4c4;
  background: #111;
  text-decoration: none;
  font-family: Share Tech Mono, monospace;
}
</style>
