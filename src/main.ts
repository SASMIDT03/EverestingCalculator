import { app, BrowserWindow } from 'electron';

let window

function createWindow() {
    window = new BrowserWindow({
        width: 1000,
        height: 900
  });

    window.loadFile('src/index.html');

    window.on("closed", () => {
        console.log("App closed");
        window = null;
    })
}

app.on("ready", () => {
    createWindow();
})