<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'
import { useConfigStore } from '../stores/useConfigStore'

const { config } = useConfigStore()

const constraints = {
  audio: false,
  video: {
    deviceId: config.deviceId,
    width: { min: 640, ideal: 1920, max: 3840 },
    height: { min: 360, ideal: 1080, max: 2160 }
  }
}

onBeforeMount(() => {
  window.api.setConfigBounds((bounds: { x: number; y: number; width: number; height: number }) => {
    config.x = bounds.x
    config.y = bounds.y
    config.width = bounds.width
    config.height = bounds.height
  })
})

onMounted(() => {
  const video = document.querySelector('video')!

  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream
  })
})
</script>

<template>
  <div
    class="w-screen h-screen overflow-hidden border-red-50"
    :class="{
      'rounded-full': config.rounded && !config.fullScreen,
      'rounded-md': !config.rounded && !config.fullScreen
    }"
    :style="`border:solid ${config.borderWidth}px ${config.borderColor}`"
  >
    <video
      class="object-cover w-screen h-screen"
      autoplay
      :class="{ 'rounded-full': config.rounded && !config.fullScreen }"
    ></video>
  </div>
</template>
