const electron = require('electron')

//Menu menu menu
const { app, BrowserWindow, ipcMain, Menu } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);//load the html file
    mainWindow.on('closed', () => app.quit());//closes everything including the child windows


    const mainMenu = Menu.buildFromTemplate(menuTemplate); //build the menu. May change with different windows
    Menu.setApplicationMenu(mainMenu)//actually set/show the menu into the window. This replaces the default menu adn the functionalities
    console.log('App ready');
});

//creating window to add todos
function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Add new Todo"
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
};

//the following template will be used inside the ready function as a parameter to buildFromTemplate function
const menuTemplate = [
    //{} This empty object is for mac compatibilty
    {
        label: 'File',
        submenu: [
            {
                label: "New ToDo",
                click() {
                    createAddWindow();
                }
            },
            {
                label: "Quit",
                //hotkey iife
                accelerator: (() => {
                    if (process.platform === 'darwin') {
                        return 'Command + Q';
                    } else {
                        return 'Ctrl+Q';
                    }
                })(),
                //quit function
                click() {
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

//check if the app is running in dev or prod
if(process.env.NODE_ENV !== 'production'){
    menuTemplate.push({
        label: 'Developer',
        submenu:[{
            label:'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'command+alt+i' : 'ctrl+shift+i',
            //function to show the developer tools for the focused window only
            click(item,focusedWindow){
                focusedWindow.toggleDevTools();
            }
        }]
    })
}


