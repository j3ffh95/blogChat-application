// It is the routers job to list out all of the URL's routes that we are on the lookout for
const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

router.get("/", userController.home);

module.exports = router;
