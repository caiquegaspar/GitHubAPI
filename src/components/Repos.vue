<template>
  <div class="repos-container">
    <div v-for="repo in repos" :key="repo.id">
      <div class="repo-card">
        <div class="repo-card-title">
          <img
            :src="'https://www.svgrepo.com/show/82398/book.svg'"
            class="book-icon"
            alt="book icon"
          />
          <h4>
            {{ repo.name }}
          </h4>
          <span v-if="repo.visibility === 'public'">Público</span>
        </div>
        <div class="repo-description">
          <p>{{ repo.description }}</p>
        </div>
        <div class="repo-details">
          <div
            class="language-color"
            :style="`border: 5px solid ${repo.language_color};`"
          ></div>
          <p>
            {{ repo.language }}
          </p>
          <img
            :src="'https://www.svgrepo.com/show/17896/star.svg'"
            class="star-icon"
            alt="star icon"
          />
          <p>
            {{ repo.stargazers_count }}
          </p>
          <img
            :src="'https://www.svgrepo.com/show/360431/fork-f.svg'"
            class="fork-icon"
            alt="fork icon"
          />
          <p>
            {{ repo.forks_count }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "repos",

  computed: {
    repos() {
      return this.$store.state.userStats.totaRepos;
    },
  },

  created() {
    console.log(this.repos);
  },
};
</script>

<style scoped>
.repos-container {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(2, 1fr);
}

.repo-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
  width: 250px;
  height: 150px;
  border: 0;
  box-shadow: 0px 0px 3px 0px #8c8c8c;
  border-radius: 0.3rem;
}

.repo-card-title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.repo-card-title h4 {
  margin: 0 0.3rem 0 0;
}

.repo-card-title span {
  font-size: 0.8em;
  padding: 0 0.3rem;
  border: 0.5px solid #a9a9a9;
  border-radius: 0.7rem;
}

.book-icon {
  width: 18px;
  margin: 5px;
}

.repo-description {
  display: -webkit-box;
  max-width: 90%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 10px 5px;
}

.repo-details {
  display: flex;
  align-items: center;
  margin: 0 5px;
}

.language-color {
  border-radius: 50%;
}

.repo-details p {
  margin: 0 10px 0 5px;
}

.repo-details img {
  width: 14px;
}
</style>