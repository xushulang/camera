<script setup lang="ts">
import { ref } from 'vue'
import { NProgress } from 'naive-ui'
import { ProgressInfo } from 'electron-updater'

//下载进度条
const progress = ref<ProgressInfo>()
window.api.downloadProgress((_progress: ProgressInfo) => {
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
        :percentage="Math.floor(progress.percent)"
      />
    </div>

    <div class="mt-5 flex justify-center gap-2 whitespace-nowrap">
      <a
        href="https://github.com/xushulang/camera/releases"
        target="_blank"
        class="bg-orange-600 py-2 px-4 rounded-md text-white text-sm hover:bg-orange-500 no-drag"
      >
        官网下载
      </a>

      <a
        href="https://www.alipan.com/s/U55RcvoDmN6"
        target="_blank"
        class="bg-blue-600 py-2 px-4 rounded-md text-white text-sm hover:bg-blue-500 no-drag"
      >
        阿里云盘下载
      </a>

      <a
        href="https://pan.baidu.com/s/1-rqLf35JcXPV7FJBCDA2pw?pwd=mvbs"
        target="_blank"
        class="bg-violet-600 py-2 px-4 rounded-md text-white text-sm hover:bg-violet-500 no-drag"
      >
        百度网盘下载
      </a>
    </div>
  </div>
</template>
