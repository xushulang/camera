import { Menu, shell, Tray } from 'electron'
import path from 'path'

const createTray = (): void => {
  const tray = new Tray(path.resolve(__dirname, '../../resources/tray.png'))

  const contextMenu = Menu.buildFromTemplate([
    { label: '退出程序', role: 'quit' },
    { type: 'separator' },
    { label: '问题反馈', click: () => shell.openExternal('https://github.com/xushulang/camera') }
  ])

  tray.setToolTip('摄像头')
  tray.setContextMenu(contextMenu)
}

export { createTray }
