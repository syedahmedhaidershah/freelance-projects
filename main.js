const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false
        },
        show: false,
        frame: false
    });
    mainWindow.maximize();
    mainWindow.show();
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './dist/haserp/index.html'),
        protocol: 'file:',
        slashes: true
    }));
});