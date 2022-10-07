<template>
  <video ref="camera" class="rounded-full" style="-webkit-app-region: drag" autoplay></video>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const camera = ref(null)

onMounted(() => {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        width: 300,
        height: 300
      }
    })
    .then((stream) => {
      camera.value.srcObject = stream
    })
})
</script>
