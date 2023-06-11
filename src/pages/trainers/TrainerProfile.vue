<template>
  <section>
    <base-card>
      <h2>Profile Information</h2>
      <trainer-profile-form
        @save-trainer="saveTrainerData"
      ></trainer-profile-form>
    </base-card>
  </section>
</template>

<script>
import TrainerProfileForm from "../../components/trainers/TrainerProfileForm.vue";
export default {
  components: {
    TrainerProfileForm,
  },

  methods: {
    async saveTrainerData(trainerData) {
      await this.$store.dispatch("trainers/addTrainer", trainerData);
      this.$store.dispatch("trainers/loadTrainersFirebase");
      this.$router.replace("/instructors");
    },
  },
};
</script>
