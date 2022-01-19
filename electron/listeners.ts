import { ipcMain } from "electron";
import { getRekordboxSettingsPath, openRekordboxPathDialog } from "./database/rekordboxSettingsPath";

export async function registerListeners() {

    ///////////////////////////
    ////// DATABASE PATH //////
    ///////////////////////////

    ipcMain.on('openRekordboxSettingsPathDialog', (event) => {
        openRekordboxPathDialog(event);
    });

    ipcMain.on('getRekordboxSettingsPath', (event) => {
        getRekordboxSettingsPath(event);
    })
}