<template>
  <router-link to="/specialiti">
    <span class="badge" :class="type">
      <font-awesome-icon
        v-if="type === 'fitness'"
        icon="fa-solid fa-dumbbell"
      />
      <font-awesome-icon
        v-if="type === 'aerobic'"
        icon="fa-solid fa-heart-pulse"
      />
      <font-awesome-icon
        v-if="type === 'swimming'"
        icon="fa-solid fa-person-swimming"
      />
      <font-awesome-icon v-if="type === 'yoga'" icon="fa-solid fa-leaf" />

      {{ text }}
    </span>
  </router-link>
</template>

<script>
export default {
  props: ["type", "title"],

  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>

<style scoped>
.badge {
  margin-top: 10px;
  background-color: #ccc;
  color: #252525;
  border-radius: 10px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.fitness {
  background: #ffcc99;
  color: rgb(0, 0, 0);
}

.aerobic {
  background: #ff6961;
  color: rgb(0, 0, 0);
}

.yoga {
  background: #c1e1c1;
  color: rgb(0, 0, 0);
}

.swimming {
  background-color: #8bd3e6;
  color: rgb(0, 0, 0);
}
</style>
