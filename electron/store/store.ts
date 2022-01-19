import ElectronStore from 'electron-store';

export interface SettingsStoreSchema {
    mainDbPath: string;
}

export const settingsStore = new ElectronStore<SettingsStoreSchema>();