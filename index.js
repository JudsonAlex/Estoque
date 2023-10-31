const { app, BrowserWindow } = require('electron')
const express = require('./back/index')


function createWindow() {

  let win = new BrowserWindow(
    {
      width: 1200,
      height: 600,
      webPreferences: { nodeIntegration: true }
    }
  )
  // win.webContents.openDevTools()
  win.loadURL('http://localhost:3333')

  win.focus();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })


}

app.whenReady().then(createWindow)

