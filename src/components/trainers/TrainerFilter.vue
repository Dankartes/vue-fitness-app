<template>
  <base-card>
    <h2>Filter</h2>

    <span class="filter-option">
      <input type="checkbox" id="fitness" checked @change="setFilter" />
      <label for="fitness">Fitness</label>
    </span>

    <span class="filter-option">
      <input type="checkbox" id="swimming" checked @change="setFilter" />
      <label for="swimming">swimming</label>
    </span>

    <span class="filter-option">
      <input type="checkbox" id="yoga" checked @change="setFilter" />
      <label for="yoga">Yoga</label>
    </span>

    <span class="filter-option">
      <input type="checkbox" id="aerobic" checked @change="setFilter" />
      <label for="aerobic">Aerobic</label>
    </span>

    <div class="name-search">
      <input
        v-model="name"
        placeholder="Search after name"
        id="name"
        type="text"
      />
      <base-button @click="searchAfterName" class="full-button"
        >Search</base-button
      >
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ["change-filter", "search-name"],
  data() {
    return {
      filters: {
        fitness: true,
        swimming: true,
        yoga: true,
        aerobic: true,
      },
      name: "",
    };
  },

  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
      this.$emit("change-filter", updatedFilters);
    },
    searchAfterName() {
      const name = this.name;
      this.$emit("search-name", name);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}

.name-search {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.name-search input {
  display: block;
  width: 50%;
  border: 1px solid #ccc;
  font: inherit;
}

.name-search input:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}
</style>
