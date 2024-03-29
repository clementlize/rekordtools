import { contextBridge, ipcRenderer } from 'electron';

export const api = {

    ///////////////////////////
    ////// DATABASE PATH //////
    ///////////////////////////

    openRekordboxSettingsPathDialog: () => {
        ipcRenderer.send('openRekordboxSettingsPathDialog');
    },

    getRekordboxSettingsPath: () => {
        ipcRenderer.send('getRekordboxSettingsPath');
    },

    //////////////////////////
    //////     Test     //////
    //////////////////////////

    readDb: () => {
        ipcRenderer.send('readDb');
    },
    clearStore: () => {
        ipcRenderer.send('clearStore');
    },

    ///////////////////////////
    //////   Listeners   //////
    ///////////////////////////

    /**
     * Provide an easier way to listen to events
     */
    on: (channel: string, callback: Function) => {
        ipcRenderer.on(channel, (_, data) => callback(data));
    }
}

contextBridge.exposeInMainWorld('Main', api)
