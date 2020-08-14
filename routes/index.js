const express = require("express");
const router = express.Router();

router.use("/", require("./indexRouter"));
router.use("/api/v1/groups", require("./groupRouter"));
router.use("/api/v1/levels", require("./levelRouter"));

module.exports = router;
