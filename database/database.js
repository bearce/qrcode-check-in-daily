const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

module.exports = {
    init: (cb) => {
        db.defaults({
            guest: [
                {
                    id: (new Date().getTime() + 1).toString(),
                    firstname: "Dương Đức",
                    lastname: "Trọng",
                    created: new Date()
                },
                {
                    id: (new Date().getTime() + 2).toString(),
                    firstname: "Nguyễn Trung",
                    lastname: "Kiên",
                    created: new Date()
                },
                {
                    id: (new Date().getTime() + 3).toString(),
                    firstname: "Hào Trúc",
                    lastname: "Lâm",
                    created: new Date()
                },
                {
                    id: (new Date().getTime() + 4).toString(),
                    firstname: "Trương Văn",
                    lastname: "Hải",
                    created: new Date()
                }
            ], 
            history: [
                {
                    id: (new Date().getTime()).toString(),
                    guestId: (new Date().getTime() + 1).toString(),
                    status: "IN",
                    created: new Date()
                }
            ]})
        .write();

        if(cb) cb();
    },
    config: db
}