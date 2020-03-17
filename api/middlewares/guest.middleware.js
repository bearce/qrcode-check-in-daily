const database = require("../../database/database");
const utils = require("../utils/utils");

module.exports.guests = (req, res, next) => {
    let guests = database.config.get("guest").value();

    res.locals = {
        ...res.locals,
        data: guests
    }
    next();
}

module.exports.guest = (req, res, next) => {
    let { guestId } = req.params;
    let guest = database.config.get("guest").find((el) => el.id === guestId).value();

    if(!guest) {
        res.json(utils.notification("Người dùng này không tồn tại", "error", 400));
        return;
    }

    res.locals = {
        ...res.locals,
        data: guest
    }
    next();
}

module.exports.create = (req, res, next) => {
    let errors = {};
    let { id, firstname, lastname } = req.body;

    id = new Date().getTime().toString();

    if(utils.isNull(firstname)) {
        errors.firstname = utils.notification("Firstname không được để trống", "error", 400);
    }
    if(utils.isNull(lastname)) {
        errors.lastname = utils.notification("Lastname không được để trống", "error", 400);
    }
    
    if(utils.isErrors(errors)) {
        res.json(utils.notification("Có lỗi xảy ra", "error", 400, { errors }));
        return;
    }

    res.locals = {
        ...res.locals,
        data: {
            firstname,
            lastname,
            id,
            create: new Date()
        }
    }
    next();
}

module.exports.delete = (req, res, next) => {
    const { guestId } = req.params;

    let guest = database.config.get("guest").find(el => el.id === guestId).value();

    if(!guest) {
        res.json(utils.notification("Người dùng này không tồn tại", "error", 400));
        return;
    }

    res.locals = {
        ...res.locals,
        guest
    }
    next();
}