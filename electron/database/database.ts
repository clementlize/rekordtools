import { Database } from "@journeyapps/sqlcipher";
import { IpcMainEvent } from "electron/main";

const sqlite3 = require("@journeyapps/sqlcipher").verbose();

export const readDb = (event: IpcMainEvent) => {

    //const db: Database = new sqlite3.Database("E:\\dev\\perso\\files\\master.db", () => {
    //const db: Database = new sqlite3.Database("/mnt/datadev/perso/files/master.db", () => {
    const db: Database = new sqlite3.Database("/mnt/data/dev/perso/files/master.db", () => {

        db.serialize(() => {

            db.run("PRAGMA cipher_compatibility = 4");
            db.run(`PRAGMA key = 'key'`);

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