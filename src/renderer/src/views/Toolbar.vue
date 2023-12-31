<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { Settings, Close } from '@vicons/carbon'
import { CameraOutline } from '@vicons/ionicons5'
import { Rectangle, Circle } from '@vicons/tabler'
import { FullScreenMinimize24Regular, FullScreenMaximize24Regular } from '@vicons/fluent'
import { useConfigStore } from '../stores/useConfigStore'
import { onMounted } from 'vue'

const { config } = useConfigStore()

const getWindowSize = async (): Promise<void> => {
  const res = await window.api.getWindowSize()
  config.x = res.x
  config.y = res.y
  config.width = res.width
  config.height = res.height
}

const handleRound = async (): Promise<void> => {
  await getWindowSize()
  config.rounded = !config.rounded
  config.aspectRatio = config.rounded ? 1 : 16 / 9
  if (config.rounded) {
    config.x = config.x + Math.floor((config.width - config.height) / 2)
  } else {
    config.x = config.x - Math.floor((config.height * config.aspectRatio - config.height) / 2)
  }
  config.width = Math.floor(config.height * config.aspectRatio)
  config.fullScreen = false
  window.api.setWindowSize({ x: config.x, y: config.y, width: config.width, height: config.height })
}

const handlePage = async (page: string): Promise<void> => {
  config.page = page

  if (config.page === 'setting') {
    await getWindowSize()

    window.api.setWindowSize({ width: 640, height: 360 })
  } else {
    window.api.setWindowSize({
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height
    })
  }
}

const toggleFullScreen = async (): Promise<void> => {
  config.fullScreen = !config.fullScreen

  if (config.fullScreen) {
    await getWindowSize()

    window.api.setFullScreen()
  } else {
    window.api.setWindowSize({
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height
    })
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
  <div>
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
        @click="handleRound"
      />

      <n-icon
        v-if="config.page === 'camera'"
        size="24"
        class="text-gray-200 cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125 duration-300"
        :component="config.fullScreen ? FullScreenMinimize24Regular : FullScreenMaximize24Regular"
        @click="toggleFullScreen"
      />

      <n-icon
        v-if="config.page === 'camera' && !config.rounded"
        size="24"
        class="text-gray-200 cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125 duration-300 absolute right-2"
        :component="Close"
        @click="quit"
      />
    </div>

    <div
      class="absolute inset-x-0 bottom-0 py-2 flex justify-center gap-2 z-20 group duration-300"
      :style="config.page === 'camera' ? '-webkit-app-region: no-drag' : ''"
    >
      <n-icon
        v-if="config.page === 'camera' && config.rounded"
        size="24"
        class="text-gray-200 cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125 duration-300"
        :component="Close"
        @click="quit"
      />
    </div>
  </div>
</template>
