import { dialog } from "electron";
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
 * Update the database path in store AND send a reply to the renderer process
 * @param event 
 * @param path 
 */
const updateRekordboxSettingsPath = (event: Electron.IpcMainEvent, path: string) => {

    settingsStore.set("rekordboxSettingsPath", path);
    event.reply("rekordboxSettingsPath-response", path);
}

/**
 * Get the database path stored
 * @param event 
 */
export const getRekordboxSettingsPath = (): string => {

    return settingsStore.get("rekordboxSettingsPath");
}