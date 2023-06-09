<template>
  <base-window
    fixed
    title="Sunteți sigur ca doriți să ștergeți înscrierea ca antrenor?"
    :visible="confirmDelete"
  >
    <base-button @click="deleteTrainer" type="button" mode="outline-button"
      >Da</base-button
    >
    <base-button @click="stopDeleteTrainer" type="button" mode="full-button"
      >M-am răzgândit</base-button
    >
  </base-window>

  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ incorrect: !firstName.isValid }">
      <label for="firstname">Prenume</label>
      <input
        v-model.trim="firstName.val"
        type="text"
        id="firstname"
        @blur="removeValidation('firstName')"
      />
      <p class="validation-msg" v-if="!firstName.isValid">
        Completati prenumele!
      </p>
    </div>

    <div class="form-control" :class="{ incorrect: !lastName.isValid }">
      <label for="lastname">Nume</label>
      <input
        v-model.trim="lastName.val"
        type="text"
        id="lastname"
        @blur="removeValidation('lastName')"
      />
      <p class="validation-msg" v-if="!lastName.isValid">Completati numele!</p>
    </div>

    <div class="form-control" :class="{ incorrect: !description.isValid }">
      <label for="description">Descriere</label>
      <textarea
        v-model.trim="description.val"
        rows="5"
        id="description"
        @blur="removeValidation('description')"
      />
      <p class="validation-msg" v-if="!description.isValid">
        Completati descrierea!
      </p>
    </div>

    <div class="form-control" :class="{ incorrect: !rate.isValid }">
      <label for="rate">Pret/ora</label>
      <input
        v-model="rate.val"
        type="number"
        id="rate"
        @blur="removeValidation('rate')"
      />
      <p class="validation-msg" v-if="!rate.isValid">
        Pretul trebuie completat si sa fie mai mare decat 0!
      </p>
    </div>

    <div class="form-control" :class="{ incorrect: !areas.isValid }">
      <h3>Specialitate:</h3>

      <div>
        <input
          @blur="removeValidation('areas')"
          v-model="areas.val"
          type="checkbox"
          id="fitness"
          value="fitness"
        />
        <label for="fitness">Fitness</label>
      </div>

      <div>
        <input
          @blur="removeValidation('areas')"
          v-model="areas.val"
          type="checkbox"
          id="aerobic"
          value="aerobic"
        />
        <label for="aerobic">Aerobic</label>
      </div>

      <div>
        <input
          @blur="removeValidation('areas')"
          v-model="areas.val"
          type="checkbox"
          id="yoga"
          value="yoga"
        />
        <label for="yoga">Yoga</label>
      </div>

      <div>
        <input
          @blur="removeValidation('areas')"
          v-model="areas.val"
          type="checkbox"
          id="swimming"
          value="swimming"
        />
        <label for="swimming">swimming</label>
      </div>

      <p class="validation-msg" v-if="!areas.isValid">
        Trebuie selectata cel putin o specialitate!
      </p>
    </div>

    <base-button @click="saveTrainerData" mode="outline-button"
      ><font-awesome-icon icon="fa-solid fa-floppy-disk" /> Salvează
      modificările</base-button
    >
    <base-button @click="confirmDeleteTrainer" type="button" mode="full-button"
      ><font-awesome-icon icon="fa-solid fa-trash-can" /> Șterge înscrierea ca
      antrenor</base-button
    >
  </form>
</template>

<script>
export default {
  emits: ["save-trainer"],
  data() {
    return {
      firstName: { val: "", isValid: true },
      lastName: { val: "", isValid: true },
      description: { val: "", isValid: true },
      rate: { val: null, isValid: true },
      areas: { val: [], isValid: true },
      formIsValid: true,
      confirmDelete: false,
    };
  },

  methods: {
    removeValidation(dataProp) {
      this[dataProp].isValid = true;
    },

    validateTheForm() {
      this.formIsValid = true;

      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }

      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }

      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }

      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }

      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },

    submitForm() {
      this.validateTheForm();

      if (!this.formIsValid) return;

      const allFormData = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        description: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };

      this.$emit("save-trainer", allFormData);
    },

    confirmDeleteTrainer() {
      this.confirmDelete = true;
    },

    stopDeleteTrainer() {
      this.confirmDelete = false;
    },

    async deleteTrainer() {
      this.confirmDelete = false;
      await this.$store.dispatch("trainers/deleteTrainer");
      this.$store.dispatch("trainers/loadTrainersFirebase");
      this.$router.replace("/instructors");
    },
  },
};
</script>

<style scoped>
.validation-msg {
  color: red;
}

button {
  margin-top: 10px;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

textarea {
  resize: vertical;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.incorrect label {
  color: red;
}

.incorrect input,
.incorrect textarea {
  border: 1px solid red;
}
</style>