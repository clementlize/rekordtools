import ElectronStore from 'electron-store';

export interface SettingsStoreSchema {

    darkMode: boolean;
    mainDbPath: string;
}

export const settingsStore = new ElectronStore<SettingsStoreSchema>();