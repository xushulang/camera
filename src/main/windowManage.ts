import { BrowserWindow, app, ipcMain } from 'electron'

//获取窗口
const getWin = (event: Electron.IpcMainEvent): Electron.BrowserWindow => {
  return BrowserWindow.fromWebContents(event.sender)!
}

ipcMain.on(
  'setWindowSize',
  (
    event: Electron.IpcMainEvent,
    opt: { aspectRatio?: number; width?: number; height?: number }
  ) => {
    const win = getWin(event)
    if (opt.aspectRatio) win.setAspectRatio(opt.aspectRatio)

    if (opt.aspectRatio == 1) {
      win.setBounds({ width: opt.width ?? 300, height: opt.width ?? 300 })
    }
    if (opt.aspectRatio == 16 / 9) {
      win.setBounds({ width: opt.width ?? 500, height: opt.height ?? 281 })
    }
  }
)

ipcMain.on('quit', (event: Electron.IpcMainEvent) => {
  const win = getWin(event)
  if (BrowserWindow.getAllWindows().length == 0) app.quit()
  else win?.close()
})
