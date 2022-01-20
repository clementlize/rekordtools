import { Database } from "sqlite3";

const sqlite3 = require("@journeyapps/sqlcipher").verbose();

export const readDb = () => {

    console.log("------- ENTERING READ DB FUNTION -----")

    console.log("DB PATH: " + process.env.ELECTRON_WEBPACK_APP_DBPATH);
    const db: Database = new sqlite3.Database(process.env.ELECTRON_WEBPACK_APP_DBPATH, () => {

        db.serialize(() => {

            db.run("PRAGMA cipher_compatibility = 4");
            db.run(`PRAGMA key = '${process.env.ELECTRON_WEBPACK_APP_DBKEY}'`);

            db.all("select name from sqlite_master where type='table'", function (err: any, tables: any) {

                console.log("tables:")
                console.log(tables);
            });

            db.each("select name from sqlite_master where type='table'", function (err: any, tables: any) {

                console.log("tables:")
                console.log(tables);
            });

            db.each("SELECT ID AS id, Name, Seq FROM djmdPlaylist", function (err: any, row: any) {

                console.log(err);
                console.log(row);
                //console.log(`ID: ${row.id} ; Name: ${row.Name} ; Seq : ${row.Seq}`);
            });

            db.close();
        });
    });
}