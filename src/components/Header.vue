<template>
  <div class="header-content">
    <img class="logo" alt="GitHub logo" src="../assets/logo.png" />
    <div class="header-text">
      <h1>GitHub User Scraper</h1>
      <span>Obtenha dados de perfis do GitHub!</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",

  mounted() {
    setTimeout(
      () => document.querySelector(".header-content").classList.add("animate"),
      60
    );
  },
};
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  opacity: 0;
  transition: 1s;
  transform: translate3d(-50px, 0, 0);
}

.animate {
  opacity: 1;
  transform: translate3d(0px, 0px, 0px);
}

.logo {
  width: 5%;
  margin: 0 10px;
}

.header-text {
  display: flex;
  flex-direction: column;
}

.header-text span {
  color: #505050;
}
</style>