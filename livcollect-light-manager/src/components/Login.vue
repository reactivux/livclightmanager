<template>
  <div class="login-container">
    <div class="card">
      <div class="card-header text-center">
        <h2>Se connecter</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="mb-3">
            <input type="email" v-model="email" class="custom-input" placeholder="Email" @input="validateEmail" />
            <p v-if="emailError" class="error-message">{{ emailError }}</p>
          </div>
          <div class="mb-3">
            <input
              type="password"
              v-model="password"
              class="custom-input"
              placeholder="Password"
              @input="validatePassword"
            />
            <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
          </div>
          <button type="submit" class="btn btn-primary w-100">Se connecter</button>
          <router-link to="/auth/reset-password" class="mdp text-center">Mot de passe oublié</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const emailError = ref('');
    const passwordError = ref('');

    const validateEmail = () => {
      if (!email.value) {
        emailError.value = 'Ce champ est obligatoire.';
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = 'Email invalide.';
      } else {
        emailError.value = '';
      }
    };

    const validatePassword = () => {
      if (!password.value) {
        passwordError.value = 'Ce champ est obligatoire.';
      } else if (password.value.length < 3) {
        passwordError.value = 'Ce champ doit contenir au minimum 3 caractères.';
      } else {
        passwordError.value = '';
      }
    };

    const login = () => {
      validateEmail();
      validatePassword();

      if (!emailError.value && !passwordError.value) {
        // proceed with login logic
        console.log('Login successful');
      } else {
        console.log('Validation errors');
      }
    };

    return {
      email,
      password,
      emailError,
      passwordError,
      login,
      validateEmail,
      validatePassword,
    };
  },
});
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}
</style>
