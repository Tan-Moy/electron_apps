//import electron
const electron = require('electron');

//import ffmpg-fluent
const ffmpeg = require('fluent-ffmpeg');

//pull out app and browserwindow object from it
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow; //just so that js knows it exists and not close the main window during garbage collection. Also makes the var accessible as global.

//wait for electron to load up. app is the master controller for all windows
app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`)//loading html document to window
    //created the main window
    console.log("app is now ready")
});

//listens to events sent from the main window. The second argument contains the data recieved.
ipcMain.on('video:submit', (event, path) => {
    //console.log(path);
    ffmpeg.ffprobe(path, (err, metadata) => {
        //console.log('meh:', metadata.format.duration)
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
    })
})
