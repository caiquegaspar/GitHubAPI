<template>
  <Header />
  <div class="components">
    <div class="cards-component">
      <div class="search-container">
        <div class="search-input">
          <div class="input-icon">
            <img
              src="https://www.svgrepo.com/show/14071/search.svg"
              alt="search icon"
            />
          </div>
          <input
            @keyup="getUsers"
            v-model="inputstring"
            placeholder="Pesquise um usuário"
            class="search-box"
          />
        </div>
      </div>
      <Cards
        @goToProfile="goToProfile"
        @changePage="changePage"
        :inputstring="inputstring"
        :key="mountcards"
      />
    </div>
    <div class="profile-component">
      <Profile @backToCards="backToCards" :loadstats="loadstats" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Cards from "@/components/Cards.vue";
import Profile from "@/components/Profile.vue";

export default {
  name: "Home",

  data() {
    return {
      inputstring: "",
      mountcards: 1,
      loadstats: false,
    };
  },

  components: {
    Header,
    Cards,
    Profile,
  },

  created() {
    this.setData();
  },

  methods: {
    setData() {
      this.$store.dispatch("addPageInitialData");
    },

    async goToProfile(name) {
      window.scrollTo({ top: 0, behavior: "smooth" });

      let cards = document.querySelector(".cards-component");
      cards.classList.add("leave-animation");

      await this.$store.dispatch("getUserInitialData", { user: name });
      this.loadstats = true;

      let profile = document.querySelector(".profile-component");
      profile.classList.add("enter-animation");
    },

    backToCards() {
      let profile = document.querySelector(".profile-component");
      profile.classList.remove("enter-animation");

      this.loadstats = false;

      setTimeout(() => {
        let cards = document.querySelector(".cards-component");
        cards.classList.remove("leave-animation");
      }, 200);
    },

    async getUsers(e) {
      if (e.target.value)
        await this.$store.dispatch("getUsers", {
          user: e.target.value,
          page: 1,
        });

      ++this.mountcards;
    },

    async changePage(user, page) {
      await this.$store.dispatch("getUsers", {
        user: user,
        page: page,
      });
    },
  },
};
</script>

<style scoped>
.components {
  position: relative;
  display: flex;
  justify-content: center;
}

.search-container {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.search-input {
  display: flex;
  padding: 5px;
  border-radius: 2rem;
  border: 0;
  box-shadow: 0px 0px 9px 0px #8c8c8c;
}

.input-icon {
  width: 20px;
  height: 20px;
  margin: 5px 10px;
}

.search-box {
  border: 0;
  background-color: transparent;
  width: 250px;
}

.search-box:focus {
  box-shadow: none;
  outline: 0;
}

.cards-component {
  position: absolute;
  width: 80%;
  opacity: 1;
  z-index: 1;
  visibility: visible;
  transform: translate3d(0, 0, 0);
  transition: all 0.2s;
}

.profile-component {
  position: absolute;
  width: 80%;
  opacity: 0;
  z-index: 0;
  visibility: hidden;
  transform: translate3d(50px, 0, 0);
  transition: all 0.2s;
}

.leave-animation {
  z-index: 0;
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-50px, 0, 0);
}

.enter-animation {
  z-index: 1;
  opacity: 1;
  visibility: visible;
  transform: translate3d(0, 0, 0);
}
</style>