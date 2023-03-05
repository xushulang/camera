<script setup lang="ts">
import { onMounted } from 'vue'
import { useConfigStore } from '../stores/useConfigStore'

const { config } = useConfigStore()

const constraints = {
  audio: false,
  video: {
    deviceId: config.deviceId
  }
}

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
    :class="{ 'rounded-full': config.rounded }"
    :style="`border:solid ${config.borderWidth} ${config.borderColor}`"
  >
    <video class="object-cover h-full" autoplay :class="{ 'rounded-full': config.rounded }"></video>
  </div>
</template>
