import { ipcMain } from "electron";
import { readDb } from "./database/database";
import { getRekordboxSettingsPath, openRekordboxPathDialog } from "./database/rekordBoxSettingsPath";
import { clearStore } from "./store/store";

export async function registerListeners() {

    ///////////////////////////
    ////// DATABASE PATH //////
    ///////////////////////////

    ipcMain.on('openRekordboxSettingsPathDialog', (event) => {
        openRekordboxPathDialog(event);
    });

    ipcMain.on('getRekordboxSettingsPath', (event) => {

        event.reply("rekordboxSettingsPath-response",
            getRekordboxSettingsPath()
        );
    });

    //////////////////////////
    //////     Test     //////
    //////////////////////////

    ipcMain.on('readDb', (event) => {
        readDb(event);
    });

    ipcMain.on("clearStore", () => {
        clearStore();
    });
}