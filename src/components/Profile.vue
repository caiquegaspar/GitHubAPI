<template>
  <div class="profile-container">
    <div class="profile-card">
      <a class="back-btn" @click="$emit('backToCards', user.login)">
        <img
          :src="'https://www.svgrepo.com/show/37106/left-arrow.svg'"
          class="back-icon"
          alt="back icon"
        />
        <h3>Voltar</h3>
      </a>
      <img :src="user.avatar_url" class="user-avatar" alt="search icon" />
      <div class="user-info">
        <h2>
          {{ user.name }}
        </h2>
        <h4>{{ user.login }}</h4>
        <a :href="user.blog" target="_blank" rel="noopener">{{ user.blog }}</a>
        <p class="user-bio">{{ user.bio }}</p>
      </div>
      <div class="user-follow-info">
        <img
          :src="'https://www.svgrepo.com/show/64293/users.svg'"
          class="users-icon"
          alt="users icon"
        />
        <span>{{ user.followers }} seguidores</span>
        <span class="point"></span>
        <span>{{ user.following }} seguindo</span>
      </div>
      <div class="user-stats">

      </div>
      <div class="user-repos">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",

  computed: {
    user() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px 0;
}

.profile-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 100px 0 30px 0;
  width: 80%;
  border: 0;
  box-shadow: 0px 0px 7px 0px #8c8c8c;
  border-radius: 0.3rem;
}

.back-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  top: -40px;
  left: 0;
  border: 0;
  box-shadow: 0px 0px 7px 0px #8c8c8c;
  border-radius: 0.8rem;
}

.back-icon {
  width: 19px;
  margin: 0 6px;
}

.profile-card h3 {
  margin: 0 8px 0 0;
}

.user-avatar {
  width: 150px;
  border-radius: 50%;
  top: -50px;
  position: absolute;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 60%;
}

.user-info h4 {
  color: #505050;
  font-weight: 100;
}

.user-bio {
  margin: 10px 0;
}

.user-follow-info {
  display: flex;
  align-items: center;
}

.users-icon {
  width: 19px;
  margin: 0 5px;
}

.point {
  border: 2px solid #000;
  border-radius: 50%;
  margin: 0 8px;
}
</style>