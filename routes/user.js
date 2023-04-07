const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// Route for creating user
router.post("/", (req, res) => {
	userController.createUser(req.body).then(result => res.send(result));
})

// Route for authenticating user
router.post("/authenticate", (req, res) => {
	userController.authenticate(req.body).then(result => res.send(result));
})

module.exports = router;