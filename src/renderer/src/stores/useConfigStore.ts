import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore(
  'config',
  () => {
    const config = ref({
      borderColor: '#fdba74',
      borderWidth: '0px',
      deviceId: '',
      page: 'camera',
      rounded: false,
      //视频比例
      aspectRatio: 16 / 9
    })

    return { config }
  },
  {
    persist: true
  }
)
