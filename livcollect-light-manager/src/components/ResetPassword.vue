<template>
  <div class="login-container">
    <div class="card">
      <div class="card-header text-center">
        <h2>Mot de passe oublié</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="resetPassword">
          <div class="mb-4">
            <input
              type="email"
              id="email"
              v-model="email"
              class="custom-input"
              placeholder="Veuillez saisir l'adresse E-mail"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Réinitialiser le mot de passe</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ResetPassword',
  setup() {
    const email = ref<string>('')

    const resetPassword = () => {
      // Here you can define the logic for password reset
      console.log('Reset Password Email:', email.value)
    }

    return {
      email,
      resetPassword
    }
  }
})
</script>

<style scoped lang="scss">
$primary-color: #740274; // Define the primary color here

// .login-container {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #f8f9fa;

//   .card {
//     width: 400px;
//     border-radius: 10px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

//     .card-header {
//       background-color: $primary-color;
//       color: white;
//       border-top-left-radius: 10px;
//       border-top-right-radius: 10px;
//       padding: 1rem;
//     }

//     .card-body {
//       padding: 2rem;

//       .form-label {
//         color: #212529; // Dark label color for contrast
//         margin-bottom: 0.5rem;
//       }

//       .btn-primary {
//         background-color: $primary-color;
//         border-color: $primary-color;
//         &:hover {
//           background-color: darken($primary-color, 10%);
//           border-color: darken($primary-color, 10%);
//         }
//       }
//       .custom-input {
//         border: none;
//         border-bottom: 1px solid #ccc;
//         width: 100%;
//         padding: 10px 5px;
//         font-size: 16px;
//         &:focus {
//           outline: none;
//           border-bottom: 1px solid $primary-color;
//         }
//         &::placeholder {
//           color: #999;
//         }
//       }
//     }
//   }
// }
</style>
