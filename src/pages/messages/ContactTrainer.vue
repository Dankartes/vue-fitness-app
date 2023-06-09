<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ incorrect: !email.isValid }">
        <label for="email">Email</label>
        <input
          v-model.trim="email.val"
          type="email"
          id="email"
          @blur="removeValidation('email')"
        />
        <p class="validation-msg" v-if="!email.isValid">
          Email cannot be empty!
        </p>
      </div>

      <div class="form-control" :class="{ incorrect: !content.isValid }">
        <label for="content">Message</label>
        <textarea
          v-model.trim="content.val"
          rows="5"
          id="content"
          @blur="removeValidation('content')"
        ></textarea>
        <p class="validation-msg" v-if="!content.isValid">
          Message cannot be empty!
        </p>
      </div>

      <div class="actions">
        <base-button mode="outline-button">Send Message</base-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: { val: "", isValid: true },
      content: { val: "", isValid: true },
      formIsValid: true,
    };
  },

  methods: {
    validateTheForm() {
      this.formIsValid = true;
      if (this.email.val === "" || this.email.val.includes("(@")) {
        this.email.isValid = false;
        this.formIsValid = false;
      }

      if (this.content.val === "") {
        this.content.isValid = false;
        this.formIsValid = false;
      }
    },

    submitForm() {
      this.validateTheForm();

      if (!this.formIsValid) return;

      const messageData = {
        email: this.email.val,
        content: this.content.val,
        trainerId: this.$route.params.id,
      };

      this.$store.dispatch("messages/contactTrainer", messageData);
      this.$router.replace("/instructors");
    },

    removeValidation(dataProp) {
      this[dataProp].isValid = true;
    },
  },
};
</script>

<style scoped>
.validation-msg {
  color: red;
}

form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.incorrect label {
  color: red;
}

.incorrect input,
.incorrect textarea {
  border: 1px solid red;
}

.actions {
  text-align: center;
}
</style>
