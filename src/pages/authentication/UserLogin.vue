<template>
  <div>
    <base-window
      :visible="!!error"
      title="An error has occurred!"
      @close="resolveError"
    >
      <p>{{ error }}</p>
    </base-window>

    <base-window title="Please wait." :visible="isLoading" fixed>
      <base-loading></base-loading>
    </base-window>

    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ incorrect: !email.isValid }">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model.trim="email.val"
            @blur="removeValidation('email')"
          />
          <p class="validation-msg" v-if="!email.isValid">
            Email cannot be empty!
          </p>
        </div>

        <div class="form-control" :class="{ incorrect: !password.isValid }">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password.val"
            @blur="removeValidation('password')"
          />
          <p class="validation-msg" v-if="!password.isValid">
            The password must have at least 6 characters!
          </p>
        </div>

        <base-button mode="outline-button">{{
          submitFormButtonCap
        }}</base-button>

        <base-button
          @click="changeAuthMode"
          type="button"
          mode="register-button"
          >{{ changeAuthModeButtonCap }}</base-button
        >
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: { val: "", isValid: true },
      password: { val: "", isValid: true },
      formIsValid: true,
      authMode: "login",
      isLoading: false,
      error: null,
    };
  },

  computed: {
    submitFormButtonCap() {
      if (this.authMode === "login") return "Log In";
      else return "Create account";
    },

    changeAuthModeButtonCap() {
      if (this.authMode === "login") return "Create an account instead!";
      else return "Log in instead!";
    },
  },

  methods: {
    validateForm() {
      this.formIsValid = true;
      if (this.email.val === "" || this.email.val.includes("(@")) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.val.length < 6) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },

    async submitForm() {
      this.validateForm();
      if (!this.formIsValid) return;

      this.isLoading = true;

      const userData = {
        email: this.email.val,
        password: this.password.val,
      };

      try {
        if (this.authMode === "login") {
          await this.$store.dispatch("logIn", userData);
        } else {
          await this.$store.dispatch("signUp", userData);
        }

        this.$router.replace("/instructors");
      } catch (error) {
        this.error = error.message || "Cannot register at this moment!";
      }

      this.isLoading = false;
    },

    resolveError() {
      this.error = null;
    },

    changeAuthMode() {
      if (this.authMode === "login") this.authMode = "signup";
      else this.authMode = "login";
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

.incorrect input {
  border: 1px solid red;
}
</style>
