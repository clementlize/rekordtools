import ElectronStore from 'electron-store';

export interface SettingsStoreSchema {
    rekordboxSettingsPath: string;
}

export const settingsStore = new ElectronStore<SettingsStoreSchema>();

export const clearStore = () => {
    settingsStore.clear();
}