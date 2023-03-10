const express = require("express");
const router = express.Router();
const { addUser, login, getProfile } = require("../controllers/Users.js");

router.post("/", addUser);
router.post("/login", login);
router.get("/profile/:id", getProfile);

module.exports = router;
