"use strict";
const express = require("express");
const router = express.Router();
const { delete_media } = require("../controllers/delete.controllers");

router.get("/media/:slug", delete_media);
module.exports = router;
