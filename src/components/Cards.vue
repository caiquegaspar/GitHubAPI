<template>
  <div class="cards-container">
    <div v-if="inputstring">
      <div v-if="users.items?.length">
        <h3 class="results-count">
          Perfis encontrados: {{ users.total_count }}
        </h3>
        <div class="cards-grid responsive">
          <div v-for="user in users.items" class="user-card" :key="user.id">
            <img :src="user.avatar_url" class="user-avatar" alt="search icon" />
            <div class="user-info">
              <h4>
                {{ user.login }}
              </h4>
              <a @click="$emit('goToProfile', user.login)"
                >Exibir detalhes
                <img
                  :src="'https://www.svgrepo.com/show/10764/eye.svg'"
                  class="show-icon"
                  alt="show icon"
              /></a>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="empty-message">
          <img
            src="https://www.svgrepo.com/show/14071/search.svg"
            alt="search icon"
          />
          <h1>Não há resultados para sua pesquisa</h1>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="empty-message">
        <img
          src="https://www.svgrepo.com/show/14071/search.svg"
          alt="search icon"
        />
        <h1>Faça agora uma pesquisa!</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cards",

  props: { inputstring: String },

  computed: {
    users() {
      return this.$store.state.usersList;
    },
  },

  watch: {
    users() {
      if (this.users.items.length)
        setTimeout(
          () => document.querySelector(".cards-grid").classList.add("animate"),
          1
        );
    },
  },
};
</script>

<style scoped>
.cards-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  transition: all 0.2s;
}

.results-count {
  margin: 15px 30px;
}

.cards-grid {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
  opacity: 0;
  transition: 1s;
  transform: translate3d(0, 50px, 0);
}

.animate {
  opacity: 1;
  transform: translate3d(0px, 0px, 0px);
}

.user-card {
  margin: 20px;
  width: 180px;
  height: 100px;
  border: 0;
  box-shadow: 0px 0px 4px 0px #8c8c8c;
  border-radius: 0.3rem;
  position: relative;
  transition: all 0.2s;
  cursor: pointer;
}

.user-avatar {
  width: 95px;
  top: -17px;
  left: 42px;
  position: absolute;
  border-radius: 50%;
  transition: all 0.2s;
  z-index: 9;
}

.user-info {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  top: 77px;
  left: 0;
  transition: all 0.2s;
}

.user-info a {
  opacity: 0;
  display: none;
  margin: 10px 0;
  text-decoration: none;
  transition: all 0.2s;
}

.show-icon {
  width: 17px;
  margin: 0 6px;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 0px 7px 0px #8c8c8c;
}

.user-card:hover .user-avatar {
  width: 65px;
  top: -20px;
  left: -20px;
}

.user-card:hover .user-info a {
  opacity: 1;
  display: flex;
}

.user-info a:hover {
  color: #347d39;
}

.user-card:hover .user-info {
  top: 22px;
  left: 20px;
}

.empty-message {
  display: flex;
  justify-content: center;
  opacity: 0.3;
  margin: 100px 0;
}

.empty-message img {
  width: 30px;
  margin: 0 15px;
}
</style>