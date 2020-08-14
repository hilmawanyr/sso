const express = require("express");
const router = express.Router();
const GroupService = require("../services/GroupService");

router.get("/", GroupService.allGroups);
router.post("/", GroupService.addGroup);
router.get("/:code", GroupService.getGroup);
router.put("/", GroupService.updateGroup);

module.exports = router;
