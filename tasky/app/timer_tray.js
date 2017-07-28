const electron = require('electron');
const { Tray } = electron;

class TimerTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);

        this.mainWindow = mainWindow;
        this.on('click', this.onClick.bind(this)); //onclick call the function names onClick attached to this object
    }

    //event listeners added to tray icon so that it can toggle the visibility of the main window
    //bounds are of 2 types a)the co-ordinates eg click events and b) for windows for eg:
    //y-direction windows bounds = height 
    //x-direction windows bounds = width
    onClick(e, bounds) {
        console.log(bounds.x, bounds.y);
        //click event bounds
        const { x, y } = bounds;

        //window height and width
        const { height, width } = this.mainWindow.getBounds();

        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            const yPosition = process.platform === 'darwin' ? y : y - height
            this.mainWindow.setBounds({ //setBounds positions the top left hand corner of the window
                x: x - (width / 2),
                y: yPosition,
                height, //height:height,
                width //width:width

            })//sets height width and position
            this.mainWindow.show();
        }
    }
}

module.exports = TimerTray;