const database = require("../../database/database");
const utils = require("../utils/utils");

module.exports = {
    historys: (req, res) => {
        const { data } = res.locals;
        res.json(utils.notification("Xử lý thành công", "ok", 200, { historys: data }))
    },
    history: (req, res) => {
        const { historyOfGuest, guest } = res.locals;

        res.json(utils.notification("Xử lý thành công", "ok", 200, { historys: historyOfGuest, guest }))
    },
    create: (req, res) => {
        const { data } = res.locals;

        database.config.get("history").push(data).write();

        res.json(utils.notification("Ghi lịch sử thành công", "ok", 200, { history: data }))
    }
}