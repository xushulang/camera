import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ProgressInfo } from 'electron-updater'

// Custom APIs for renderer
const api = {
  getAppVersion: (): Promise<string> => ipcRenderer.invoke('getAppVersion'),

  //下载进度条
  downloadProgress: (callback: (progress: ProgressInfo) => void): void => {
    ipcRenderer.on('downloadProgress', (_event, progress) => {
      callback(progress)
    })
  },

  setConfigBounds: (
    callback: (opt: { x: number; y: number; width: number; height: number }) => void
  ): void => {
    ipcRenderer.on('setConfigBounds', (_event, opt) => {
      callback(opt)
    })
  },

  getWindowSize: (): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      ipcRenderer.once('getWindowSize', (_event, opt) => {
        resolve(opt)
      })
      ipcRenderer.send('getWindowSize')
    })
  },

  setWindowSize: (opt: { x?: number; y?: number; width: number; height: number }): void => {
    ipcRenderer.send('setWindowSize', opt)
  },

  setFullScreen: (): void => {
    ipcRenderer.send('setFullScreen')
  },

  contextMenu: (): void => {
    ipcRenderer.send('contextMenu')
  },

  quit: (): void => {
    ipcRenderer.send('quit')
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
