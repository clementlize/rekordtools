import { ipcMain } from "electron";
import { getDbPath, openDbPathDialog } from "./database/databasePath";

export async function registerListeners() {

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