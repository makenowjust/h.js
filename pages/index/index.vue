<template>
  <div class="container">
    <div class="content" v-html="readme"></div>
  </div>
</template>

<script>
import readme from "~/README.md";

const readmeWithoutTitle = `<section>${readme.slice(
  readme.indexOf("<h2>Features</h2>")
)}`;

export default {
  head() {
    return {
      title: "README"
    };
  },
  computed: {
    readme() {
      return readmeWithoutTitle;
    }
  }
};
</script>
