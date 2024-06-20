<template>
    <div v-if="visible" class="dialog-overlay">
      <div class="dialog-box">
        <div class="dialog-content">
          <h3>Êtes-vous sûr ?</h3>
          <p>Cette commande sera acceptée</p>
          <div class="dialog-actions">
            <button @click="onConfirm" class="btn btn-primary">Oui</button>
            <button @click="onCancel" class="btn btn-secondary">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    name: 'AcceptDialog',
    props: {
      visible: {
        type: Boolean,
        required: true
      }
    },
    emits: ['confirm', 'cancel'],
    methods: {
      onConfirm() {
        this.$emit('confirm');
      },
      onCancel() {
        this.$emit('cancel');
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
  
  .dialog-actions {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .btn-secondary {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  </style>
  