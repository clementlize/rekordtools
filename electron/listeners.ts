import { ipcMain } from "electron";
import { readDb } from "./database/database";
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
    });

    //////////////////////////
    //////     Test     //////
    //////////////////////////

    ipcMain.on('readDb', (_) => {

        readDb();
    });
}