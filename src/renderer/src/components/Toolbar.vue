<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { Settings } from '@vicons/carbon'
import { CameraOutline } from '@vicons/ionicons5'
import { Rectangle, Circle } from '@vicons/tabler'
import { useConfigStore } from '../stores/useConfigStore'
import { onMounted } from 'vue'

const { config } = useConfigStore()

//修改窗口尺寸
const changeRounded = (): void => {
  config.rounded = !config.rounded
  config.aspectRatio = config.rounded ? 1 : 16 / 9
  window.api.setWindowSize({ aspectRatio: config.aspectRatio })
}

const handlePage = (page: string): void => {
  config.page = page

  if (config.page === 'setting') {
    config.aspectRatio = 1
  } else {
    config.aspectRatio = config.rounded ? 1 : 16 / 9
  }

  window.api.setWindowSize({ aspectRatio: config.aspectRatio })
}

onMounted(() => {
  handlePage(config.page)
})
</script>

<template>
  <div
    class="absolute inset-x-0 py-2 flex justify-center gap-2 z-20 group"
    :class="{ 'hover:bg-black/20': !config.rounded && config.page === 'camera' }"
    :style="config.page === 'camera' ? '-webkit-app-region: no-drag' : ''"
  >
    <n-icon
      v-if="config.page === 'camera'"
      :component="Settings"
      size="24"
      class="text-gray-200 cursor-pointer opacity-0 group-hover:opacity-100"
      @click="handlePage('setting')"
    />

    <n-icon
      v-if="config.page === 'setting'"
      :component="CameraOutline"
      size="24"
      class="text-gray-200 cursor-pointer"
      @click="handlePage('camera')"
    />

    <n-icon
      v-if="config.page === 'camera'"
      size="24"
      class="text-gray-200 cursor-pointer opacity-0 group-hover:opacity-100"
      :component="config.rounded ? Rectangle : Circle"
      @click="changeRounded"
    />
  </div>
</template>
