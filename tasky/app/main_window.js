const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow{
    constructor(){
        super({
        height: 500,
        width: 300,
        frame: false, //removes the statusbar
        resizable: false,
        show: false
    });

    }
}

module.exports = MainWindow;