import { settingsStore } from "../store/store";

export const setDarkMode = (on: boolean) => {

    settingsStore.set("darkMode", on);
}