const electron = require('electron');
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
    tray = new Tray(iconPath); //the parameter is the path to the tray icon

    //event listeners added to tray icon so that it can toggle the visibility of the main window
    //bounds are of 2 types a)the co-ordinates eg click events and b) for windows for eg:
    //y-direction windows bounds = height 
    //x-direction windows bounds = width
    tray.on('click', (e, bounds) => {
        console.log(bounds.x, bounds.y);
        //click event bounds
        const { x, y } = bounds;

        //window height and width
        const { height, width } = mainWindow.getBounds();

        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            const yPosition = process.platform === 'darwin' ? y : y - height
            mainWindow.setBounds({ //setBounds positions the top left hand corner of the window
                x: x - (width / 2),
                y: yPosition,
                height, //height:height,
                width //width:width

            })//sets height width and position
            mainWindow.show();
        }
    })

});

//about to refactor