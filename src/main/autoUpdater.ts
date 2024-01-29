import { is } from '@electron-toolkit/utils'
import { BrowserWindow, dialog, shell } from 'electron'
import { autoUpdater } from 'electron-updater'

//自动下载更新
autoUpdater.autoDownload = false
//退出时自动安装更新
autoUpdater.autoInstallOnAppQuit = false

autoUpdater.setFeedURL({
  provider: 'github',
  repo: 'camera',
  owner: 'xushulang'
})

export default (win: BrowserWindow): void => {
  //检查是否有更新
  if (!is.dev) autoUpdater.checkForUpdates()

  //有新版本时
  autoUpdater.on('update-available', () => {
    dialog
      .showMessageBox({
        type: 'warning',
        title: '更新提示',
        message: '有新版本发布了',
        buttons: ['更新', '取消'],
        cancelId: 1
      })
      .then((res) => {
        if (res.response == 0) {
          //开始下载更新
          autoUpdater.downloadUpdate()
        }
      })
  })

  //没有新版本时
  autoUpdater.on('update-not-available', () => {
    // dialog.showMessageBox({
    //   type: 'info',
    //   message: `你已经是最新版本`
    // })
  })

  //更新下载完毕
  autoUpdater.on('update-downloaded', () => {
    //退出并安装更新
    autoUpdater.quitAndInstall()
  })

  //更新发生错误
  autoUpdater.on('error', () => {
    dialog
      .showMessageBox({
        type: 'warning',
        title: '更新提示',
        message: '软件更新失败',
        buttons: ['网站下载', '取消更新'],
        cancelId: 1
      })
      .then((res) => {
        if (res.response == 0) {
          shell.openExternal('https://github.com/xushulang/camera')
        }
      })
  })

  // 监听下载进度
  autoUpdater.on('download-progress', (progress) => {
    win.webContents.send('downloadProgress', progress)
  })
}
