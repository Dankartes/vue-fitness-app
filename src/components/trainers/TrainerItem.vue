<template>
  <li class="pagination">
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>

    <div>
      <base-badge
        :title="area"
        :type="area"
        v-for="area in areas"
        :key="area"
      ></base-badge>
    </div>

    <div class="actions">
      <base-button mode="outline-button" isLink :to="trainerContactLink"
        >Message</base-button
      >
      <base-button mode="full-button" isLink :to="trainerDetailsLink"
        >Details</base-button
      >
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "firstName", "lastName", "rate", "areas"],

  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },

    trainerContactLink() {
      return this.$route.path + "/" + this.id + "/contact";
    },

    trainerDetailsLink() {
      return this.$route.path + "/" + this.id;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid white;
  /* border-radius: 10px; */
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
