<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { CloseCircleTwotone } from '@vicons/antd'
import { Circle24Regular, RectangleLandscape24Regular } from '@vicons/fluent'

const cameraRef = ref<HTMLMediaElement | null>(null)
const round = ref(true)
const videoSize = ref({
  width: 600,
  height: 600
})
const currentStream = ref<MediaStream | null>(null)
const canDrag = ref(false)

const handleCanDrag = (type: boolean): void => {
  canDrag.value = type
}

watch(
  () => canDrag.value,
  (value) => {
    if (value) {
      setTimeout(() => {
        canDrag.value = false
      }, 2000)
    }
  }
)

watch(
  () => round.value,
  async (value) => {
    if (value) {
      videoSize.value.width = 600
      videoSize.value.height = 600
    } else {
      videoSize.value.width = 1280
      videoSize.value.height = 720
    }

    setVideo()

    window.electron.ipcRenderer.send('changeWindowSize', value)
  }
)

const close = (): void => {
  window.electron.ipcRenderer.send('quitApp')
}

async function setVideo(): Promise<void> {
  if (currentStream.value) {
    currentStream.value.getVideoTracks()[0].stop()
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    video: videoSize.value
  })

  currentStream.value = stream

  if (cameraRef.value) {
    cameraRef.value.srcObject = stream
  }
}

onMounted(async () => {
  await setVideo()
})
</script>

<template>
  <div class="relative">
    <video
      ref="cameraRef"
      :class="{ 'rounded-full': round }"
      autoplay
      :style="canDrag ? '-webkit-app-region: drag' : '-webkit-app-region: no-drag'"
      @mouseover="handleCanDrag(true)"
    ></video>

    <div v-show="canDrag" class="absolute top-2 inset-0 flex justify-center">
      <div class="flex gap-2">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon
              size="20"
              class="text-gray-300 hover:text-gray-50 cursor-pointer"
              style="-webkit-app-region: no-drag"
              @click="close()"
            >
              <CloseCircleTwotone />
            </n-icon>
          </template>
          <span>关闭</span>
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon
              size="20"
              class="text-gray-300 hover:text-gray-50 cursor-pointer"
              style="-webkit-app-region: no-drag"
              @click="round = !round"
            >
              <component :is="round ? RectangleLandscape24Regular : Circle24Regular" />
            </n-icon>
          </template>
          <span>{{ round ? '长方形' : '圆形' }}</span>
        </n-tooltip>
      </div>
    </div>
  </div>
</template>
