<template>
  <div class="the-page">
    <the-header></the-header>

    <router-view class="the-body" v-slot="props">
      <transition name="router" mode="out-in">
        <component :is="props.Component"></component>
      </transition>
    </router-view>

    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
  },

  created() {
    this.$store.dispatch("autoLogIn");
  },

  computed: {
    logOutStatus() {
      return this.$store.getters["logOutStatus"];
    },
  },

  watch: {
    logOutStatus(currentVal, oldVal) {
      if (currentVal && currentVal !== oldVal)
        this.$router.replace("/instructors");
    },
  },
};
</script>

<style>
.the-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  color: white;
}

body {
  margin: 0;
}

.router-enter-from {
  opacity: 0;
  transform: translateY(-40px);
}

.router-leave-to {
  opacity: 0;
  transform: translateY(40px);
}

.router-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.router-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  background: #3f31bf;
}

*::-webkit-scrollbar-thumb {
  background-color: #3f31bf;
  border-radius: 10px;
  border: 1px solid #ffffff;
}

/* .the-body {
  height:115vh; margin:0;
    display:flex; 
  flex-direction:column; 
} */
</style>
