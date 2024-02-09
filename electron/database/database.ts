import { Database } from "@journeyapps/sqlcipher";
import { runBytecodeFile } from "bytenode";
import Blowfish from "egoroof-blowfish";
import { IpcMainEvent } from "electron/main";
import fs from 'fs';
import { getRekordboxSettingsPath } from "./rekordBoxSettingsPath";

const sqlite3 = require("@journeyapps/sqlcipher").verbose();

/**
 * Get the JSON file containing useful information and paths
 * @returns 
 */
const getRekordBoxSettings = (): (string[])[] => {
    return JSON.parse(fs.readFileSync(getRekordboxSettingsPath(), "utf-8")).options;
}


/**
 * Extract and return the database key
 * @returns 
 */
const getDbKey = (): string => {

    const bytecodeFilePath0 = process.cwd() + "/bd8f13e1-e7bb-46b6-9cbc-aa9955e596e1.jsc";
    const tempKey = runBytecodeFile(bytecodeFilePath0);
    return tempKey;

    const bytecodeFilePath1 = process.cwd() + "/943cd794-6ffe-48b8-9db4-303a80c46932.jsc";
    const encodedKey = runBytecodeFile(bytecodeFilePath1);
    const key = Buffer.from(encodedKey, "base64");

    const bytecodeFilePath2 = process.cwd() + "/d49c21fd-00e1-459e-a24a-22fd068e3815.jsc";
    const password = runBytecodeFile(bytecodeFilePath2);

    // The final decrypted key
    const bf = new Blowfish(key, Blowfish.MODE.ECB);
    const dbKey = bf.decode(password, Blowfish.TYPE.STRING);
    console.log(`Decrypted key`, {  // TODO: remove
        encodedKey,
        password,
        dbKey,
    });
    return dbKey;
}

/**
 * Get the database path based on the settings file
 */
const getDbPath = (): string => {
    return getRekordBoxSettings()[0][1];
}

export const readDb = async (event: IpcMainEvent) => {

    try {

        const dbPath = getDbPath();
        const dbKey = getDbKey();  // TODO: try catch here, return error to webapp

        const db: Database = new sqlite3.Database(dbPath, () => {

            db.serialize(() => {

                db.run("PRAGMA cipher_compatibility = 4");
                db.run(`PRAGMA key = '${dbKey}'`);

                db.all("select name from sqlite_master where type='table'", function (err: any, tables: any) {

                    console.log("tables:")
                    console.log(tables);
                    event.reply("readDb-response", tables);
                });

                db.each("SELECT ID AS id, Name, Seq FROM djmdPlaylist", function (err: any, row: any) {

                    console.log(err);
                    console.log(row);
                    //console.log(`ID: ${row.id} ; Name: ${row.Name} ; Seq : ${row.Seq}`);
                });
            });
        });
    }
    catch (err) {
        console.log(err);
        event.reply("readDb-response", "error");
    }
}