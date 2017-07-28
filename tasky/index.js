const electron = require('electron');
const TimerTray = require('./app/timer_tray')
const { app, BrowserWindow, Tray } = electron;
const path = require('path');//a node module that takes care of crossplatform pathing :-)

let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 300,
        frame: false, //removes the statusbar
        resizable: false,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon@2x.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new TimerTray(iconPath, mainWindow); //the parameter is the path to the tray icon
});