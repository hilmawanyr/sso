const express = require("express");
const router = express.Router();
const LevelService = require("../services/LevelService");

router.get("/", LevelService.levelIndex);
router.post("/", LevelService.levelPost);
router.put("/:code", LevelService.levelPut);
router.patch("/", LevelService.levelPatch);

module.exports = router;
