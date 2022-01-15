<template>
  <PageMeta />
  <router-view />
</template>

<script>
import PageMeta from "./components/PageMeta";

export default {
  name: "App",

  components: {
    PageMeta,
  },
};
</script>

<style>
</style>
