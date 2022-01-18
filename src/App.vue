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

@media (max-width: 454.98px) {
}

/* X-Small devices */
@media (max-width: 575.98px) {
}

/* Small devices (landscape phones, less than 768px) */
@media (max-width: 767.98px) {
  .cards-grid.responsive {
    grid-template-columns: repeat(2, 1fr) !important;
  }

  .charts-content {
    flex-direction: column;
  }
}

/* Medium devices (tablets, less than 992px) */
@media (max-width: 991.98px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }

  .repos-container {
    grid-template-columns: repeat(1, 1fr) !important;
  }
}

/* Large devices (desktops, less than 1200px) */
@media (max-width: 1199.98px) {
}

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1300px) {
  .repos-container {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

/* XX-Large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) {
}
</style>
