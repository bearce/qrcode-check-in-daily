const express = require("express");
const router = express.Router();

const middleware = require("../middlewares/history.middleware");
const controller = require("../controllers/history.controller");

router.get("/", middleware.historys, controller.historys)
router.get("/:guestId", middleware.history, controller.history);
router.post("/", middleware.create, controller.create);

module.exports = router;