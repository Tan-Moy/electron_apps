//import electron
const electron = require('electron');

//pull out app and browserwindow object from it
const { app, BrowserWindow, ipcMain } = electron;

//wait for electron to load up. app is the master controller for all windows
app.on('ready', () => {
    const mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`)//loading html document to window
    //created the main window
    console.log("app is now ready")
});

//listens to events sent from the main window. The second argument contains the data recieved.
ipcMain.on('video:submit',(event, path) => {

})
