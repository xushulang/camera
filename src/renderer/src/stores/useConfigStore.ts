import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore(
  'config',
  () => {
    const config = ref({
      borderColor: '#fdba74',
      borderWidth: 0,
      deviceId: '',
      page: 'setting',
      fullScreen: false,
      rounded: false,
      aspectRatio: 16 / 9,
      x: 0,
      y: 0,
      width: 640,
      height: 360
    })

    return { config }
  },
  {
    persist: true
  }
)
