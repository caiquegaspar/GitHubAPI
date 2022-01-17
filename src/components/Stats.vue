<template>
  <div class="stats-content">
    <Charts />
    <h3>Últimos repositórios</h3>
    <Repos />
  </div>
</template>

<script>
import Charts from "@/components/Charts.vue";
import Repos from "@/components/Repos.vue";

export default {
  name: "Stats",

  components: {
    Charts,
    Repos,
  },

  computed: {
    stats() {
      return this.$store.state.userStats;
    },
  },
};
</script>

<style scoped>
.stats-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>