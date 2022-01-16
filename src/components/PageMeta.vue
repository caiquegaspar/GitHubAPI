<template>
  <teleport to="head">
    <title>{{ tags.title }}</title>
    <meta
      v-for="(meta, i) in tags.meta"
      :key="`meta-${i}`"
      :name="meta.name"
      :property="meta.property"
      :content="meta.content"
    />
    <link
      v-for="(link, i) in tags.links"
      :key="`link-${i}`"
      :href="link.href"
      :rel="link.rel"
      :as="link.as"
    />
  </teleport>
</template>

<script>
export default {
  name: "PageMeta",

  computed: {
    tags() {
      return this.$store.state.initialData;
    },
  },

  mounted() {
    this.$nextTick(() => {
      Array.from(document.querySelector("head").children).forEach((node) => {
        if (node.getAttribute("ssr")) {
          node.remove();
        }
      });
    });
  },
};
</script>

<style>
</style>