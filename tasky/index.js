const path = require('path');//a node module that takes care of crossplatform pathing :-)
const TimerTray = require('./app/timer_tray')
const MainWindow = require('./app/main_window')
const electron = require('electron');

const { app, ipcMain } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    //app.dock.hide();//hide dock icon if relevant most probably mac
    mainWindow = new MainWindow();
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon@2x.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new TimerTray(iconPath, mainWindow); //the parameter is the path to the tray icon
});

ipcMain.on('update-timer',(event,timeLeft)=>{
    console.log("bello");
    tray.setTitle(timeLeft); //works only on macos
})