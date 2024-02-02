import { app, dialog } from "electron";
import fs from 'fs';
import { settingsStore } from "../store/store";

/**
 * Open the file pick dialog and call updateDbPath if a file has been chosen
 * @param event 
 */
export const openRekordboxPathDialog = (event: Electron.IpcMainEvent) => {

    dialog.showOpenDialog({
        title: "Open Rekordox options.json file",
        properties: ['openFile', "showHiddenFiles"],
        filters: [
            { name: "JSON files", extensions: ["json"] }
        ]
    })
        .then((response) => {

            if (!response.canceled) {

                updateRekordboxSettingsPath(event, response.filePaths[0]);
            }
        })
}

/**
 * Try to setup the RekordboxAgent settings path automatically on startup
 */
app.on("ready", () => {

    const currentPathInStore = getRekordboxSettingsPath();
    if (!currentPathInStore) {

        const platform = process.platform;
        let defaultPath = "";
        if (platform === "darwin") {
            defaultPath = app.getPath("appData") + "/Pioneer/RekordboxAgent/storage/options.json";
        }
        else if (platform === "win32") {
            defaultPath = app.getPath("appData") + "\\Pioneer\\RekordboxAgent\\storage\\options.json";
        }

        if (fs.existsSync(defaultPath)) {
            console.log(`Found options file in default path: ${defaultPath}`);
            updateRekordboxSettingsPath(undefined, defaultPath);
        }
        else {
            console.log(`Could not find options file in default path: ${defaultPath}`);
        }
    }
});

/**
 * Update the database path in store AND send a reply to the renderer process
 * @param event 
 * @param path 
 */
const updateRekordboxSettingsPath = (event: Electron.IpcMainEvent | undefined, path: string) => {
    settingsStore.set("rekordboxSettingsPath", path);
    if (event) {
        event.reply("rekordboxSettingsPath-response", path);
    }
}

/**
 * Get the database path stored
 * @param event 
 */
export const getRekordboxSettingsPath = (): string => {
    return settingsStore.get("rekordboxSettingsPath");
}