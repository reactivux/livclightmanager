<template>
    <div v-if="visible" class="dialog-overlay">
      <div class="dialog-box">
        <div class="dialog-content">
          <h3 v-if="orderId !== null">Commande n° {{ orderId }} est acceptée avec succès.</h3>
          <button @click="onOk" class="btn btn-primary">OK</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'SuccessMessage',
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      orderId: {
        type: Number,
        required: true
      }
    },
    emits: ['ok'],
    methods: {
      onOk() {
        this.$emit('ok');
      }
    }
  });
  </script>
  
  <style scoped>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog-box {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .dialog-content {
    text-align: center;
  }
  
  .btn-primary {
    background-color: #740274;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  </style>
  