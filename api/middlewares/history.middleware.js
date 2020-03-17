const shortid = require("shortid");
const database = require("../../database/database");
const utils = require("../utils/utils");

module.exports = {
    historys: (req, res, next) => {
        let data = database.config
        .get("history")
        .value() // Get all historys

        data = database.config.get("history").map(history => {
            let guest = database.config.get("guest").find(el => el.id === history.guestId).value();
            return {
                ...history,
                fullname: guest.firstname + " " + guest.lastname
            }
        })

        res.locals = {
            data
        };
        next();
    },
    history: (req, res, next) => {
        const { guestId } = req.params;
        let guest = database.config.get("guest").find(el => el.id === guestId).value(); // Get history from guestID field
        
        //Not found
        if(!guest) {
            res.json(utils.notification("Người dùng này không tồn tại", "error", 400));
            return;
        }

        let historyOfGuest = database.config
        .get("history")
        .filter(el => el.guestId === guest.id)
        .value()// Get history of guest ID

        //Get Name
        historyOfGuest = historyOfGuest.map(history => {
            let guest = database.config.get("guest").find(el => el.id === history.guestId).value();
            return {
                ...history,
                fullname: guest.firstname + " " + guest.lastname
            }
        })

        res.locals = {
            historyOfGuest,
            guest
        }
        next();
    },
    create: (req, res, next) => {
        let now = new Date(); // Date now
        let { guestId } = req.body; // take guest ID
        let status, created, id; //Create field of history

        let guest = database.config.get("guest").find(el => el.id === guestId).value(); //Check guestID exists on GUEST DATA

        //Not found
        if(!guest) {
            res.json(utils.notification("Người dùng này không tồn tại", "error", 400));
            return;
        }

        let historyOfGuest = database.config.get("history").filter(el => el.guestId === guestId).value(); //Found, Check History of GuestID

        //Not history yet
        if(historyOfGuest.length !== 0) {
            let lastChecking = historyOfGuest[historyOfGuest.length - 1]; //Found, take last checking status
            
            //test

            //Same Day
            if(utils.getDMY(lastChecking.created) === utils.getDMY(now)) {
                if(lastChecking.status === "IN") {
                    status = "OUT"
                }
                else {
                    status = "IN"
                }
            } // Not Same Day, After one day -> Tomorrow
            else {
                status = "IN"
            }
        }
        else {
            //Default Status checking IN, created: Now()
            status = "IN";
        }

        // Next

        console.log(status);
        res.locals = {
            data: {
                id: new Date().getTime().toString(),
                status,
                created : new Date(),
                guestId
            }
        }
        next();
    }
}