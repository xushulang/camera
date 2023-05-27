<script setup lang="ts">
import { useConfigStore } from './stores/useConfigStore'
import Camera from './components/Camera.vue'
import Setting from './components/Setting.vue'
import Updater from './components/Updater.vue'
import Toolbar from './components/Toolbar.vue'
import { NConfigProvider, zhCN } from 'naive-ui'

const { config } = useConfigStore()

const contextMenu = (): void => window.api.contextMenu()
</script>

<template>
  <n-config-provider :locale="zhCN">
    <div class="relative" @contextmenu="contextMenu">
      <Updater />

      <Toolbar />

      <Camera v-if="config.page === 'camera'" />

      <Setting v-else />
    </div>
  </n-config-provider>
</template>

<style>
html {
  -webkit-app-region: drag;
}

.n-input,
.n-icon,
.n-select,
.n-select-menu,
.support {
  -webkit-app-region: no-drag;
}
</style>
