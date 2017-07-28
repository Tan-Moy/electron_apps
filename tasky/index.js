const electron = require('electron');
const TimerTray = require('./app/timer_tray')
const { app, BrowserWindow, Tray } = electron;
const path = require('path');//a node module that takes care of crossplatform pathing :-)

let mainWindow;
let tray;

app.on('ready', () => {
    //app.dock.hide();//hide dock icon if relevant most probably mac
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    //handling in and out of focus
    mainWindow.on('blur',()=>{
        mainWindow.hide();
    })

    const iconName = process.platform === 'win32' ? 'windows-icon@2x.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new TimerTray(iconPath, mainWindow); //the parameter is the path to the tray icon
});