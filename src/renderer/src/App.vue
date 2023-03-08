<script setup lang="ts">
import { onMounted } from 'vue'
import { useConfigStore } from './stores/useConfigStore'
import useDrag from './composables/useDrag'
import Camera from './components/Camera.vue'
import Setting from './components/Setting.vue'
import Updater from './components/Updater.vue'
import Toolbar from './components/Toolbar.vue'

const { drag } = useDrag()

onMounted(() => {
  drag.run()
})

const { config } = useConfigStore()

const contextMenu = (): void => window.api.contextMenu()
</script>

<template>
  <div class="relative group" @contextmenu="contextMenu">
    <Updater />

    <Toolbar />

    <Camera v-if="config.page === 'camera'" />

    <Setting v-else />
  </div>
</template>
