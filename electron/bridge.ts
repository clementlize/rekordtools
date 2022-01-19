import { contextBridge, ipcRenderer } from 'electron';

export const api = {

    /////////////////////////////
    ////// Common settings //////
    /////////////////////////////

    setDarkMode: (on: boolean) => {
        ipcRenderer.send('setDarkMode', on);
    },

    ///////////////////////////
    ////// DATABASE PATH //////
    ///////////////////////////

    openDbPathDialog: () => {
        ipcRenderer.send('openDbPathDialog');
    },

    getDbPath: () => {
        ipcRenderer.send('getDbPath');
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
