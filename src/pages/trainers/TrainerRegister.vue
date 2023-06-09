<template>
  <section>
    <base-card>
      <h2>Register now as an instructor!</h2>
      <trainer-form @save-trainer="saveTrainerData"></trainer-form>
    </base-card>
  </section>
</template>

<script>
import TrainerForm from "../../components/trainers/TrainerForm.vue";
export default {
  components: {
    TrainerForm,
  },

  methods: {
    saveTrainerData(trainerData) {
      this.$store.dispatch("trainers/addTrainer", trainerData);
      this.$router.replace("/instructors");
    },
  },
};
</script>
