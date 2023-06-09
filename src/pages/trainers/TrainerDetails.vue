<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>

        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>

    <section>
      <base-card>
        <header>
          <h2>Send a message now!</h2>
          <base-button isLink :to="contactLink">Message</base-button>
        </header>

        <router-view></router-view>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedTrainer: null,
    };
  },
  computed: {
    fullName() {
      return (
        this.selectedTrainer.firstName + " " + this.selectedTrainer.lastName
      );
    },
    areas() {
      return this.selectedTrainer.areas;
    },

    rate() {
      return this.selectedTrainer.hourlyRate;
    },

    description() {
      return this.selectedTrainer.description;
    },

    contactLink() {
      if (this.$route.path !== "/trainers/" + this.id + "/contact")
        return this.$route.path + "/contact";
      else return "";
    },
  },

  created() {
    this.selectedTrainer = this.$store.getters["trainers/getTrainers"].find(
      (trainer) => trainer.id === this.id
    );
  },
};
</script>
