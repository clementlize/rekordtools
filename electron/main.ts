import { app, BrowserWindow, ipcMain, session } from 'electron';
import os from 'os';
import path from 'path';

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
    mainWindow = new BrowserWindow({
        // icon: path.join(assetsPath, 'assets', 'icon.png'),
        width: 1100,
        height: 700,
        backgroundColor: '#191622',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    })

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

async function registerListeners() {
    /**
     * This comes from bridge integration, check bridge.ts
     */
    ipcMain.on('message', (_, message) => {
        console.log(message)
    })
}

const extensionsPath = "/.config/google-chrome/Default/Extensions/";
const reactDevToolsPath = path.join(os.homedir(), `${extensionsPath}fmkadmapgofadopljbjfkapdkoienihi/4.22.0_0`);
const reduxDevToolsPath = path.join(os.homedir(), `${extensionsPath}lmhkpmbekcpmknklioeibfkpmmfibljd/3.0.3_0`);

app.on('ready', createWindow)
    .whenReady()
    .then(registerListeners)
    .then(async () => {
        await session.defaultSession.loadExtension(reactDevToolsPath, { allowFileAccess: true });
    })
    .then(async () => {
        await session.defaultSession.loadExtension(reduxDevToolsPath, { allowFileAccess: true });
    })
    .catch(e => console.error(e))

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
