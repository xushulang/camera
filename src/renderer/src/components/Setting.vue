<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useConfigStore } from '../stores/useConfigStore'
import { NSelect, NInput } from 'naive-ui'
import { SelectOption } from 'naive-ui'

const { config } = useConfigStore()

const devices = ref<MediaDeviceInfo[]>()
const cameras = ref<SelectOption[]>()

onMounted(async () => {
  devices.value = await navigator.mediaDevices.enumerateDevices()
  cameras.value = devices.value
    .filter((item) => {
      return item.kind.includes('video')
    })
    .map((item) => {
      return {
        label: item.label,
        value: item.deviceId
      } as SelectOption
    })
})
</script>

<template>
  <div class="w-screen h-screen bg-sky-900 p-5 flex flex-col gap-5 pt-10">
    <div class="text-center text-gray-100 opacity-80 text-sm font-mono">参数设置</div>

    <div class="flex flex-col gap-5">
      <n-select
        v-model:value="config.deviceId"
        placeholder="选择摄像头"
        clearable
        filterable
        :options="cameras"
      />

      <n-input v-model:value="config.borderWidth" placeholder="边框宽度" clearable />

      <n-input v-model:value="config.borderColor" placeholder="边框颜色" clearable />
    </div>

    <div class="flex flex-col items-center justify-center text-gray-100 font-light mt-3 text-xs">
      <a href="https://github.com/xushulang/camera" target="_blank" class="text-orange-500 mb-1">
        支持
      </a>
    </div>
  </div>
</template>
