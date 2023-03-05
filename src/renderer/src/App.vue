<script setup lang="ts">
import { onMounted } from 'vue'
import { useConfigStore } from './stores/useConfigStore'
import useDrag from './composables/useDrag'
import Camera from './components/Camera.vue'
import Setting from './components/Setting.vue'
import Updater from './components/Updater.vue'
import { NIcon } from 'naive-ui'
import { Settings } from '@vicons/carbon'
import { CameraOutline } from '@vicons/ionicons5'
import { Circle } from '@vicons/tabler'

const { drag } = useDrag()

onMounted(() => {
  drag.run()
})

const { config } = useConfigStore()

const quit = (): void => window.api.quit()
</script>

<template>
  <div class="relative group" @contextmenu="quit">
    <Updater />

    <div class="absolute inset-x-0 top-2 flex justify-center gap-2 z-20">
      <n-icon
        v-if="config.page === 'camera'"
        size="24"
        class="text-gray-200 cursor-pointer hidden group-hover:block"
      >
        <Settings @click="config.page = 'setting'" />
      </n-icon>

      <n-icon v-if="config.page === 'setting'" size="24" class="text-gray-200 cursor-pointer">
        <CameraOutline @click="config.page = 'camera'" />
      </n-icon>

      <n-icon
        v-if="config.page === 'camera'"
        size="24"
        class="text-gray-200 cursor-pointer hidden group-hover:block"
      >
        <Circle @click="config.rounded = !config.rounded" />
      </n-icon>
    </div>

    <Camera v-if="config.page === 'camera'" />

    <Setting v-else />
  </div>
</template>
