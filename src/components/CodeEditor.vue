<template>
  <div class="code-editor__container">
    <textarea
      class="code-editor__editor code-editor__textarea"
      autocomplete="false"
      spellcheck="false"
      v-model="plainValue"
    />
    <pre
      class="code-editor__editor code-editor__highlight"
      v-html="highlightedValue"
    />
  </div>
</template>

<script>
export default {
  name: "CodeEditor",
  props: {
    value: String,
    highlight: Function
  },
  data() {
    return {
      plainValue: this.value
    };
  },
  computed: {
    highlightedValue() {
      return this.highlight(this.plainValue) + "<br>";
    }
  }
};
</script>

<style scoped>
.code-editor__container {
  position: relative;
  text-align: left;
  box-sizing: border-box;
  overflow: hidden;
}

.code-editor__editor {
  margin: 0;
  border: 0;
  background: none;
  box-sizing: inherit;
  display: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-variant-ligatures: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  tab-size: inherit;
  text-indent: inherit;
  text-rendering: inherit;
  text-transform: inherit;
  white-space: pre;
  word-break: normal;
  overflow-wrap: break-word;
}

.code-editor__textarea {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  resize: none;
  color: inherit;
  overflow: hidden;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-fill-color: transparent;
  outline: 0;
}

.code-editor__highlight {
  position: relative;
  pointer-events: none;
  width: 100%;
}
</style>
