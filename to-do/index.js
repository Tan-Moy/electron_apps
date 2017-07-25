const electron = require('electron')

//Menu menu menu
const { app, BrowserWindow, ipcMain, Menu } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate); //build the menu. May change with different windows
    Menu.setApplicationMenu(mainMenu)//actually set/show the menu into the window. This replaces the default menu adn the functionalities
    console.log('App ready');
});

//the following template will be used inside the ready function as a parameter to buildFromTemplate function
const menuTemplate = [
    //{} This empty object is for mac compatibilty
    {
        label: 'File',
        submenu: [
            { label: "New ToDo" },
            {
                label: "Quit",
                //hotkey iife
                accelerator: (()=>{
                    if(process.platform === 'darwin'){
                        return 'Command + Q';
                    } else {
                        return 'Ctrl+Q';
                    }
                })(),
                //quit function
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//condition for cross platform check
//adds an empty object to menuTemplate if on macos
if (process.platform === 'darwin') {
    menuTemplate.unshift({})
}


