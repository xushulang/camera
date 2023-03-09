import { BrowserWindow, ipcMain } from 'electron'
//获取窗口
const getWin = (event: Electron.IpcMainEvent): Electron.BrowserWindow => {
  return BrowserWindow.fromWebContents(event.sender)!
}
ipcMain.on(
  'setWindowSize',
  (event: Electron.IpcMainEvent, opt: { aspectRatio: number; width?: number; height?: number }) => {
    const win = getWin(event)
    win.setAspectRatio(opt.aspectRatio)

    if (opt.aspectRatio == 1) {
      win.setBounds({ width: 300, height: 300 })
    } else {
      win.setBounds({ width: 500, height: 281 })
    }
  }
)