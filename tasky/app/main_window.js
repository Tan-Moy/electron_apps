const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor() {
        super({
            height: 500,
            width: 300,
            frame: false, //removes the statusbar
            resizable: false,
            show: false,
            webPreferences: { backgroundThrottling: false }//must be there so that the app can run in background
        });

        this.on('blur', this.onBlur.bind(this));
    }

    //handling in and out of focus
    onBlur() {
        this.hide();
    }
}

module.exports = MainWindow;