import { Database } from "@journeyapps/sqlcipher";
import Blowfish from "egoroof-blowfish";
import { IpcMainEvent } from "electron/main";
import fs from 'fs';
import path from 'path';
import { getRekordboxSettingsPath } from "./rekordBoxSettingsPath";

const sqlite3 = require("@journeyapps/sqlcipher").verbose();

/**
 * Get the JSON file containing useful information and paths
 * @returns 
 */
const getRekordBoxSettings = (): any => {

    return JSON.parse(fs.readFileSync(getRekordboxSettingsPath(), "utf-8")).options;
}

/**
 * Extract and return the database key
 * @returns 
 */
const getDbKey = (): string | undefined => {

    const getEncryptedPassword = (_asarPath: string): string | undefined => {

        const authManager = fs.readFileSync(path.resolve(_asarPath, "controllers/auth_manager.js"), "utf-8");

        let password: string | undefined = undefined;
        authManager.split(/\r?\n/).forEach(line => {

            if (line.includes("pass: ")) {

                password = line.split(": ")[1].split("\"")[1];
            }
        });

        return password;
    };

    const decrypt = (_passwordEncoded: Buffer, _key: string): string => {

        const bf = new Blowfish(_key, Blowfish.MODE.ECB);
        return bf.decode(_passwordEncoded, Blowfish.TYPE.STRING);
    };

    const encodedKey = getRekordBoxSettings()[1][1];
    const key = Buffer.from(encodedKey, "base64");

    // TODO: what happens on OSX?
    const asarPath = path.resolve(getRekordBoxSettings()[5][1], "../../rekordboxAgent-win32-x64/resources/app.asar");
    const passwordString = getEncryptedPassword(asarPath);

    if (!passwordString) {

        console.log("Error: could not find asar password");
        return "err";
    }

    // The final decrypted key
    return decrypt(key, passwordString);
}

/**
 * Get the database path based on the settings file
 */
const getDbPath = (): string => {

    return getRekordBoxSettings()[0][1];
}

export const readDb = (event: IpcMainEvent) => {

    //const db: Database = new sqlite3.Database("E:\\dev\\perso\\files\\master.db", () => {
    //const db: Database = new sqlite3.Database("/mnt/datadev/perso/files/master.db", () => {
    //const db: Database = new sqlite3.Database("/mnt/data/dev/perso/files/master.db", () => {
    const db: Database = new sqlite3.Database(getDbPath(), () => {

        db.serialize(() => {

            db.run("PRAGMA cipher_compatibility = 4");
            db.run(`PRAGMA key = '${getDbKey()}'`);

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