<script setup lang="ts">
import { ref } from 'vue'
import { NProgress } from 'naive-ui'

//下载进度条
const progress = ref<any>(null)
window.api.downloadProgress((_progress: any) => {
  progress.value = _progress
})
</script>

<template>
  <div
    v-if="progress"
    class="p-5 w-screen h-screen absolute z-30 flex flex-col justify-center shadow-inner bg-gray-100"
  >
    <div class="py-3 text-center font-bold opacity-60 text-sm font-mono">下载更新包</div>

    <div>
      <n-progress
        type="line"
        :indicator-placement="'inside'"
        :height="24"
        :percentage="parseInt(progress.percent)"
      />
    </div>

    <div class="mt-5 flex justify-center">
      <a
        href="https://github.com/xushulang/camera/releases"
        target="_blank"
        class="bg-violet-600 py-2 px-4 rounded-md text-white text-sm hover:bg-violet-500"
      >
        官网下载
      </a>
    </div>
  </div>
</template>
