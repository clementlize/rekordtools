import { ipcMain } from "electron";
import { setDarkMode } from "./common/userSettings";
import { getDbPath, openDbPathDialog } from "./database/databasePath";

export async function registerListeners() {

    /////////////////////////////
    ////// Common settings //////
    /////////////////////////////

    ipcMain.on('setDarkMode', (_, on: boolean) => {
        setDarkMode(on);
    });

    ///////////////////////////
    ////// DATABASE PATH //////
    ///////////////////////////

    ipcMain.on('openDbPathDialog', (event) => {
        openDbPathDialog(event);
    });

    ipcMain.on('getDbPath', (event) => {
        getDbPath(event);
    })
}