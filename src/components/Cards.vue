<template>
  <div class="cards-container">
    <div v-if="inputstring">
      <div v-if="users.items?.length">
        <div class="cards-header">
          <h3 class="results-count">
            Perfis encontrados: {{ users.total_count }}
          </h3>
          <div class="cards-pagination">
            <img
              :src="'https://www.svgrepo.com/show/218169/left-arrow-back.svg'"
              class="left-icon"
              alt="back icon"
              @click="
                --selected, changePage(inputstring, selected, translateX + 30)
              "
            />
            <div class="card-pages">
              <div
                class="card-pages-content"
                :style="`transform: translate(${translateX}px, 0);`"
              >
                <div
                  v-for="page in users.arr_pages"
                  :key="page.page"
                  class="page-btn"
                  :class="{ active: selected === page.page }"
                  @click="
                    changePage(inputstring, page.page, page.increment),
                      (selected = page.page)
                  "
                >
                  {{ page.page }}
                </div>
              </div>
            </div>
            <img
              :src="'https://www.svgrepo.com/show/218171/right-arrow-next.svg'"
              class="right-icon"
              alt="next icon"
              @click="
                ++selected, changePage(inputstring, selected, translateX - 30)
              "
            />
          </div>
        </div>
        <div class="cards-grid first_break second_break" :key="mountcards">
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
        <h2>Faça agora uma pesquisa!</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cards",

  props: { inputstring: String },

  data() {
    return {
      selected: 1,
      translateX: 37,
      mountcards: 0,
    };
  },

  computed: {
    users() {
      return this.$store.state.usersList;
    },
  },

  methods: {
    changePage(user, page, increment) {
      this.translateX = increment;

      this.$emit("changePage", user, page);
      ++this.mountcards;
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

.cards-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}

.results-count {
  margin: 15px 30px;
}

.cards-pagination {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 130px;
  height: 0;
  margin: 15px 30px;
}

.cards-pagination img {
  cursor: pointer;
  width: 25px;
}

.card-pages {
  overflow: hidden;
  width: 100%;
}

.card-pages-content {
  display: flex;
  align-items: center;
  width: max-content;
  transform-origin: 50% 50%;
  transition: all 0.2s;
}

.page-btn {
  cursor: pointer;
  width: 30px;
}

.active {
  font-size: 22px;
  font-weight: bold;
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
  font-size: 15px;
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