import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  drag: (opt: { x: number; y: number }): void => {
    ipcRenderer.send('drag', opt)
  },
  quit: (): void => {
    ipcRenderer.send('contextMenu')
  },
  //下载进度条
  downloadProgress: (callback: (progress: any) => void): void => {
    ipcRenderer.on('downloadProgress', (_event, progress) => {
      callback(progress)
    })
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
