<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="trainers-link" to="/instructors"
            >Instructors</router-link
          >
          <ul>
            <li>
              <a href="https://www.w3schools.com/js/" target="_blank"
                ><font-awesome-icon icon="fa-brands fa-js"
              /></a>
            </li>
            <li>
              <a href="https://www.w3schools.com/html/" target="_blank"
                ><font-awesome-icon icon="fa-brands fa-html5"
              /></a>
            </li>

            <li>
              <a href="https://www.w3schools.com/css/" target="_blank"
                ><font-awesome-icon icon="fa-brands fa-css3"
              /></a>
            </li>

            <li>
              <a href="https://vuejs.org/" target="_blank"
                ><font-awesome-icon icon="fa-brands fa-vuejs"
              /></a>
            </li>
          </ul>
        </div>

        <div class="col-2">
          <ul>
            <li v-if="!isLoggedIn" class="middle-info">
              <router-link to="/authentication">Log In</router-link>
            </li>

            <li class="middle-info">
              <router-link to="/specialities">Specialities</router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="right">
        <p>Vue Fitness Application 2022</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["isLoggedIn"];
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.replace("/authentication");
    },
  },
};
</script>

<style scoped>
footer {
  margin-top: auto;
}

.container {
  color: white;
  display: flex;
  justify-content: space-around;
  align-content: space-between;
  height: 200px;
  background-color: #13112c;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
  font-size: 20px;
}

.left {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.right {
  margin-top: 20px;
}

.col-2 {
  margin-left: 300px;
}

ul {
  list-style-type: none;
}

a {
  text-decoration: none;
  color: white;
}

li {
  float: left;
  padding: 10px;
  font-size: 50px;
}

.trainers-link {
  margin-left: 125px;
}

.middle-info {
  font-size: 20px !important;
}
</style>
