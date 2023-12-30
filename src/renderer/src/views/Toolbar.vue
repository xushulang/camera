<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { Settings, Close } from '@vicons/carbon'
import { CameraOutline } from '@vicons/ionicons5'
import { Rectangle, Circle } from '@vicons/tabler'
import { FullScreenMinimize24Regular, FullScreenMaximize24Regular } from '@vicons/fluent'
import { useConfigStore } from '../stores/useConfigStore'
import { onMounted, ref } from 'vue'

const { config } = useConfigStore()

const isFullScreen = ref(false)

//修改窗口尺寸
const changeRounded = (): void => {
  config.rounded = !config.rounded
  config.aspectRatio = config.rounded ? 1 : 16 / 9
  window.api.setWindowSize({ aspectRatio: config.aspectRatio })
  isFullScreen.value = false
}

const handlePage = (page: string): void => {
  config.page = page

  if (config.page === 'setting') {
    config.aspectRatio = 1
  } else {
    config.aspectRatio = config.rounded ? 1 : 16 / 9
  }

  window.api.setWindowSize({ aspectRatio: config.aspectRatio })
  isFullScreen.value = false
}

const toggleFullScreen = (): void => {
  isFullScreen.value ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  isFullScreen.value = !isFullScreen.value
  config.rounded = false
  config.aspectRatio = 16 / 9
  if (isFullScreen.value) {
    window.api.setWindowSize({ aspectRatio: config.aspectRatio, width: 1920, height: 1080 })
  } else {
    window.api.setWindowSize({ aspectRatio: config.aspectRatio })
  }
}

const quit = (): void => {
  window.api.quit()
}

onMounted(() => {
  handlePage(config.page)
})
</script>

<template>
  <div
    class="absolute inset-x-0 py-2 flex justify-center gap-2 z-20 group duration-300"
    :class="{
      'hover:bg-black/20 hover:backdrop-blur-sm hover:rounded-t-md':
        !config.rounded && config.page === 'camera'
    }"
    :style="config.page === 'camera' ? '-webkit-app-region: no-drag' : ''"
  >
    <n-icon
      v-if="config.page === 'camera'"
      :component="Settings"
      size="24"
      class="text-gray-200 cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125 duration-300"
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
      class="text-gray-200 cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125 duration-300"
      :component="config.rounded ? Rectangle : Circle"
      @click="changeRounded"
    />

    <n-icon
      v-if="config.page === 'camera'"
      size="24"
      class="text-gray-200 cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125 duration-300"
      :component="isFullScreen ? FullScreenMinimize24Regular : FullScreenMaximize24Regular"
      @click="toggleFullScreen"
    />

    <n-icon
      v-if="config.page === 'camera'"
      size="24"
      class="text-gray-200 cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125 duration-300 absolute right-2"
      :component="Close"
      @click="quit"
    />
  </div>
</template>
