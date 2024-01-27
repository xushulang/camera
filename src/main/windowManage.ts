import { BrowserWindow, app, ipcMain } from 'electron'

//获取窗口
const getWin = (event: Electron.IpcMainEvent): Electron.BrowserWindow => {
  return BrowserWindow.fromWebContents(event.sender)!
}

ipcMain.on('getWindowSize', (event: Electron.IpcMainEvent) => {
  const win = getWin(event)

  event.reply('getWindowSize', { ...win.getContentBounds() })
})

ipcMain.on(
  'setWindowSize',
  (
    event: Electron.IpcMainEvent,
    opt: { x?: number; y?: number; width: number; height: number }
  ) => {
    const win = getWin(event)
    win.setBounds(opt)
    if (!opt.x && !opt.y) {
      win.center()
    }
    win.setAspectRatio(opt.width === opt.height ? 1 : 16 / 9)
  }
)

ipcMain.on('setFullScreen', (event: Electron.IpcMainEvent) => {
  const win = getWin(event)
  win.setFullScreen(true)
})

ipcMain.on('quit', (event: Electron.IpcMainEvent) => {
  const win = getWin(event)
  BrowserWindow.getAllWindows().length == 0 ? app.quit() : win?.close()
})
