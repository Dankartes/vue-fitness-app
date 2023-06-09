<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">HOME</router-link>

        <router-link v-if="currentTrainer" to="/profile">
          <font-awesome-icon icon="fa-solid fa-user" />
          {{ currentTrainer.firstName }} {{ currentTrainer.lastName }}
        </router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/instructors">instructors</router-link>
        </li>
        <li>
          <router-link to="/specialities">Specialities</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/messages">Messages</router-link>
        </li>

        <li v-else>
          <router-link to="/authentication"
            ><font-awesome-icon icon="fas fa-sign-in" /> Log In</router-link
          >
        </li>
        <li @click="logOut" v-if="isLoggedIn">
          <base-button mode="register-button"
            ><font-awesome-icon icon="fas fa-sign-out" /> Log Out
          </base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["isLoggedIn"];
    },
    currentTrainer() {
      return this.$store.getters["trainers/currentTrainer"] || false;
    },
  },

  methods: {
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.replace("/authentication"); // redirectioneaza catre pagina principala dupa logout
    },
  },
};
</script>

<style scoped>
header {
  background-color: #3f31bf;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
}

header a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid rgb(255, 255, 255);
}

h1 {
  margin: 0;
}

h1 a,
.main-info {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
