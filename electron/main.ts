import { Database } from '@journeyapps/sqlcipher';
import { app, BrowserWindow, ipcMain, session } from 'electron';
import { reactDevToolsPath } from './config/config';
const sqlite3 = require('@journeyapps/sqlcipher').verbose();
const isDev = require('electron-is-dev');

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit();
}

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
    ipcMain.on('message', (event, message) => {
        console.log(message)

        console.log("------- ENTERING READ DB FUNTION -----")

        //console.log("DB PATH: " + process.env.ELECTRON_WEBPACK_APP_DBPATH);
        //const db: Database = new sqlite3.Database(process.env.ELECTRON_WEBPACK_APP_DBPATH, () => {
        //const db: Database = new sqlite3.Database("/mnt/data/dev/perso/files/master.db", () => {
        const db: Database = new sqlite3.Database("/mnt/datadev/perso/files/master.db", () => {
            //const db: Database = new sqlite3.Database("E:\\dev\\perso\\files\\master.db", () => {

            db.serialize(() => {

                db.run("PRAGMA cipher_compatibility = 4");
                db.run(`PRAGMA key = 'key'`);

                db.all("select name from sqlite_master where type='table'", function (err: any, tables: any) {

                    console.log("tables:")
                    console.log(tables);
                    event.reply("response", tables);
                });

                db.each("SELECT ID AS id, Name, Seq FROM djmdPlaylist", function (err: any, row: any) {

                    console.log(err);
                    console.log(row);
                    //console.log(`ID: ${row.id} ; Name: ${row.Name} ; Seq : ${row.Seq}`);
                });
            });
        });
    });
}

app.on('ready', createWindow)
    .whenReady()
    .then(registerListeners)
    .then(async () => {
        if (isDev) {
            await session.defaultSession.loadExtension(reactDevToolsPath, { allowFileAccess: true });
        }
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
