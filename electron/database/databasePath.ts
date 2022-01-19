import { dialog } from "electron";
import { settingsStore } from "../store/store";

/**
 * Open the file pick dialog and call updateDbPath if a file has been chosen
 * @param event 
 */
export const openDbPathDialog = (event: Electron.IpcMainEvent) => {

    dialog.showOpenDialog({
        properties: ['openFile', "showHiddenFiles"],
        filters: [
            { name: "Database files", extensions: ["db"] }
        ]
    })
        .then((response) => {

            if (!response.canceled) {

                updateDbPath(event, response.filePaths[0]);
            }
        })
}

/**
 * Update the database path in store AND send a reply to the renderer process
 * @param event 
 * @param path 
 */
const updateDbPath = (event: Electron.IpcMainEvent, path: string) => {

    settingsStore.set("mainDbPath", path);
    event.reply("dbPath-response", path);
}

/**
 * Get the database path stored
 * @param event 
 */
export const getDbPath = (event: Electron.IpcMainEvent) => {

    event.reply("dbPath-response", (settingsStore.get("mainDbPath")));
}