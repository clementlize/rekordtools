//const sqlite3 = require("@journeyapps/sqlcipher");

//export const db = new sqlite3.Database(process.env.DBPATH);

export const readDb = () => {

    /*db.serialize(() => {
        db.run("PRAGMA cipher_compatibility = 4");
        db.run(`PRAGMA key = ${process.env.DBKEY}`);
        db.each("SELECT ID AS id, Name, Seq FROM djmdPlaylist", function (err: any, row: any) {
            console.log(`ID: ${row.id} ; Name: ${row.Name} ; Seq : ${row.Seq}`);
        });
    });

    db.close();*/
}