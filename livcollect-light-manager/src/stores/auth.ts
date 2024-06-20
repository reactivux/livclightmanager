import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    uuid: localStorage.getItem('uuid') || ''
  }),
  actions: {
    setAuthData(token: string, uuid: string) {
      this.token = token;
      this.uuid = uuid;
      localStorage.setItem('token', token);
      localStorage.setItem('uuid', uuid);
    },
    clearAuthData() {
      this.token = '';
      this.uuid = '';
      localStorage.removeItem('token');
      localStorage.removeItem('uuid');
    }
  }
});