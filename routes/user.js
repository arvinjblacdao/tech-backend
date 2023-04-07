const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/", (req, res) => {
	userController.createUser(req.body).then(result => res.send(result));
})

router.post("/authenticate", (req, res) => {
	userController.authenticate(req.body).then(result => res.send(result));
})

module.exports = router;