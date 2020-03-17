const express = require("express");
const router = express.Router();

//middleware
const middleware = require("../middlewares/guest.middleware");
//controller
const controller = require("../controllers/guest.controller");

router.get("/", middleware.guests, controller.guests);
router.get("/:guestId", middleware.guest, controller.guest);
router.post("/", middleware.create, controller.create);
router.delete("/:guestId", middleware.delete, controller.delete);

module.exports = router;