<template>
  <PageMeta />
  <div class="app-content">
    <router-view />
  </div>
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
@import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600&display=swap");

:root {
  font-size: 14px;
  background-color: #f8f9fe;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Baloo 2", cursive;
}
</style>
