"use strict";
const express = require("express");
const router = express.Router();
const { deleteFolder } = require("../controllers/file.controllers");

router.get("/delete/folder/:fileId", deleteFolder);
module.exports = router;
