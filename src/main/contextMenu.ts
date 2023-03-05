import { ipcMain, Menu, MenuItemConstructorOptions, shell } from 'electron'

ipcMain.on('contextMenu', () => {
  const template = [
    {
      label: '退出程序',
      role: 'quit'
    },
    {
      label: '反馈问题',
      click: (): Promise<void> => shell.openExternal('https://github.com/xushulang/camera')
    }
  ] as MenuItemConstructorOptions[]

  const menu = Menu.buildFromTemplate(template)
  menu.popup()
})
