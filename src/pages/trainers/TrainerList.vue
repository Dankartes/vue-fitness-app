<template>
  <div>
    <base-window
      :visible="!!error"
      title="An error has occurred!!"
      @close="resolveError"
    >
      <p>{{ error }}</p>
    </base-window>

    <section>
      <trainer-filter
        @search-name="searchAfterName"
        @change-filter="setFilters"
      ></trainer-filter>
    </section>

    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadTrainers(true)" mode="outline-button">
            <font-awesome-icon icon="fas fa-redo" /> Reload</base-button
          >

          <base-button
            mode="register-button"
            v-if="!isLoading && !isLoggedIn"
            isLink
            to="/authentication"
            >Log in to become a instructor!</base-button
          >

          <base-button
            v-if="!isTrainer && !isLoading && isLoggedIn"
            isLink
            to="/register-instructor"
            >Become an instructor now!</base-button
          >
        </div>

        <div v-if="isLoading">
          <base-loading></base-loading>
        </div>

        <ul class="trainer-list" v-else-if="hasTrainers">
          <trainer-item
            v-for="trainer in filteredTrainers"
            :key="trainer.id"
            :id="trainer.id"
            :first-name="trainer.firstName"
            :last-name="trainer.lastName"
            :rate="trainer.hourlyRate"
            :areas="trainer.areas"
          ></trainer-item>
        </ul>
        <h3 v-else>There are no instructors.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import TrainerItem from "../../components/trainers/TrainerItem.vue";
import TrainerFilter from "../../components/trainers/TrainerFilter.vue";

export default {
  components: {
    TrainerItem,
    TrainerFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      nameFilter: "",
      activeFilters: {
        fitness: true,
        swimming: true,
        yoga: true,
        aerobic: true,
      },
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters["isLoggedIn"];
    },

    filteredTrainers() {
      const trainers = this.$store.getters["trainers/getTrainers"];
      return trainers.filter((trainer) => {
        if (this.activeFilters.aerobic && trainer.areas.includes("aerobic")) {
          return true;
        }

        if (this.activeFilters.fitness && trainer.areas.includes("fitness")) {
          return true;
        }
        if (this.activeFilters.swimming && trainer.areas.includes("swimming")) {
          return true;
        }
        if (this.activeFilters.yoga && trainer.areas.includes("yoga")) {
          return true;
        }

        if (
          this.nameFilter &&
          (trainer.firstName.includes(this.nameFilter) ||
            trainer.lastName.includes(this.nameFilter))
        )
          return true;
        return false;
      });
    },

    hasTrainers() {
      return this.$store.getters["trainers/hasTrainers"];
    },

    isTrainer() {
      return !this.isLoading && this.$store.getters["trainers/isTrainer"];
    },
  },

  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },

    resolveError() {
      this.error = null;
    },

    async loadTrainers(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch("trainers/loadTrainersFirebase", {
          refresh: refresh,
        });
      } catch (error) {
        this.error = "Nu au putut fi incarcate datele!";
      }

      this.isLoading = false;
    },

    searchAfterName(newName) {
      this.nameFilter = newName;
    },
  },

  created() {
    this.loadTrainers();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
