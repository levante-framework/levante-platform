import { defineStore } from 'pinia';
import { ref } from 'vue';
import { parse, stringify } from 'zipson';

export const useGameStore = defineStore(
  'gameStore',
  () => {
    // state
    const selectedAdmin = ref(null);
    const requireHomeRefresh = ref(false);

    // actions
    function $reset() {
      selectedAdmin.value = null;
      requireHomeRefresh.value = false;
    }

    function setSelectedAdmin(admin) {
      selectedAdmin.value = admin;
    }

    function setHomeRefresh() {
      requireHomeRefresh.value = true;
    }

    function clearHomeRefresh() {
      requireHomeRefresh.value = false;
    }

    return {
      // state
      selectedAdmin,
      requireHomeRefresh,
      // actions
      $reset,
      setSelectedAdmin,
      setHomeRefresh,
      clearHomeRefresh,
    };
  },
  {
    persist: {
      serialize: {
        deserialize: parse,
        serialize: stringify,
      },
      storage: sessionStorage,
    },
  },
);
