import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore(
  'config',
  () => {
    const config = ref({
      borderColor: '#fdba74',
      borderWidth: '3px',
      deviceId: '',
      page: 'camera',
      rounded: false
    })

    return { config }
  },
  {
    persist: true
  }
)
