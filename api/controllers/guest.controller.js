const database = require("../../database/database");
const utils = require("../utils/utils");

module.exports.guests = (req, res) => {
    const { data } = res.locals;
    res.json(utils.notification("Xử lý thành công", "ok", 200, { guests: data }))
}

module.exports.guest = (req, res) => {
    const { data } = res.locals;
    res.json(utils.notification("Xử lý thành công", "ok", 200, { guest: data }))
}

module.exports.create = (req, res) => {
    const { data } = res.locals;

    let new_data = database.config.get("guest").push(data).write();

    res.json(utils.notification("Tạo thành công", "ok", 200, { guest: data }))
}

module.exports.delete = (req, res) => {
    const { guest } = res.locals;

    let data = database.config.get("guest").remove({id: guest.id}).write();

    res.json(utils.notification("Xóa thành công", "ok", 200));
}