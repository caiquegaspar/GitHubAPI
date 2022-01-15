<template>
  <Header />
  <div class="search-container">
    <div class="search-input">
      <div class="input-icon">
        <img src="https://www.svgrepo.com/show/14071/search.svg" alt="" />
      </div>
      <input @keyup="getUsers" v-model="inputstring" placeholder="Pesquise um usuário" class="search-box" />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Home",

  data() {
    return {
      inputstring: '',
    }
  },

  components: {
    Header,
  },

  created() {
    this.setData();
  },

  methods: {
    setData() {
      this.$store.dispatch("addPageInitialData");
    },

    async getUsers(e) {
      console.log(this.inputstring);
      await this.$store.dispatch("getUsers", { user: e.target.value });
    },
  },
};
</script>

<style scoped>
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
</style>