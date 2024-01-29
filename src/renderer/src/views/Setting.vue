<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useConfigStore } from '../stores/useConfigStore'
import { NSelect, NInputNumber, NColorPicker, NIcon } from 'naive-ui'
import { SelectOption } from 'naive-ui'
import Heart from '@vicons/fa/Heart'

const { config } = useConfigStore()

const devices = ref<MediaDeviceInfo[]>()
const cameras = ref<SelectOption[]>()

const appVersion = ref('')

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

  appVersion.value = await window.api.getAppVersion()
})
</script>

<template>
  <div class="w-screen h-screen bg-sky-900 p-10">
    <div class="h-full flex flex-col gap-5 no-drag">
      <div class="text-center text-gray-100 opacity-80 text-sm font-mono">参数设置</div>

      <div class="flex flex-col gap-5">
        <n-select
          v-model:value="config.deviceId"
          placeholder="选择摄像头"
          clearable
          filterable
          :options="cameras"
        />

        <n-input-number
          v-model:value="config.borderWidth"
          :min="0"
          :max="10"
          placeholder="边框宽度"
        >
          <template #suffix>px</template>
        </n-input-number>

        <n-color-picker v-model:value="config.borderColor" :modes="['hex']" />
      </div>

      <div class="flex justify-center items-center gap-2 font-light mt-3 text-xs">
        <div class="text-gray-100">v{{ appVersion }}</div>

        <a href="https://github.com/xushulang/camera" target="_blank" class="text-orange-500">
          <div class="flex items-center gap-1">
            <n-icon size="12">
              <Heart />
            </n-icon>
            <div>支持作者</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
