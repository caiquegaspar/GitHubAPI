<template>
  <img alt="Vue logo" src="../assets/logo.png" />
</template>

<script>
export default {
  name: "Home",

  created() {
    this.setData();
  },

  methods: {
    async setData() {
      await this.$store
        .dispatch("addPageInitialData")
        .then(() => this.$store.dispatch("getUser", { user: 'caiquegaspar' }));
    },
  },
};
</script>

<style>
</style>