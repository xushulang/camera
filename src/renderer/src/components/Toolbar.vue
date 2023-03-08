<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { Settings } from '@vicons/carbon'
import { CameraOutline } from '@vicons/ionicons5'
import { Rectangle, Circle } from '@vicons/tabler'
import { useConfigStore } from '../stores/useConfigStore'

const { config } = useConfigStore()

//修改窗口尺寸
const changeRounded = (): void => {
  config.rounded = !config.rounded
  config.aspectRatio = config.rounded ? 1 : 16 / 9
  window.api.setWindowSize({ aspectRatio: config.aspectRatio })
}

window.api.setWindowSize({ aspectRatio: config.aspectRatio })
</script>

<template>
  <div class="absolute inset-x-0 top-2 flex justify-center gap-2 z-20">
    <n-icon
      v-if="config.page === 'camera'"
      :component="Settings"
      size="24"
      class="text-gray-200 cursor-pointer hidden group-hover:block"
      @click="config.page = 'setting'"
    />

    <n-icon
      v-if="config.page === 'setting'"
      :component="CameraOutline"
      size="24"
      class="text-gray-200 cursor-pointer"
      @click="config.page = 'camera'"
    />

    <n-icon
      v-if="config.page === 'camera'"
      size="24"
      class="text-gray-200 cursor-pointer hidden group-hover:block"
      :component="config.rounded ? Rectangle : Circle"
      @click="changeRounded"
    />
  </div>
</template>
