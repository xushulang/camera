<script setup lang="ts">
import { useConfigStore } from './stores/useConfigStore'
import Camera from './views/Camera.vue'
import Setting from './views/Setting.vue'
import Updater from './views/Updater.vue'
import Toolbar from './views/Toolbar.vue'
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

      <Setting v-if="config.page === 'setting'" />
    </div>
  </n-config-provider>
</template>

<style>
.drag,
html {
  -webkit-app-region: drag;
}

.no-drag,
.n-input,
.n-icon,
.n-select,
.n-select-menu,
.n-color-picker,
.n-color-picker-panel,
.support {
  -webkit-app-region: no-drag;
}
</style>
