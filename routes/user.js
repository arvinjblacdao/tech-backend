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

// Route for getting a single user
router.get("/:userId", (req, res) => {
	userController.getUser(req.params.userId).then(result => res.send(result));
})

// Route for getting a single user with parameters
router.post("/profile", (req, res) => {
	userController.getUserByParameters(req.body).then(result => res.send(result));
})

// Route for updating a user
router.put("/:userId", (req, res) => {

	const data = {
		userId: req.params.userId,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		currentPassword: req.body.currentPassword,
		newPassword: req.body.newPassword,
		authorPseudonym: req.body.authorPseudonym
	}

	userController.updateUser(data).then(result => res.send(result));
})

// Route for hard deleting a user
router.delete("/:userId", (req, res) => {
	userController.deleteUser(req.params.userId).then(result => res.send(result));
})

// Route for soft deleting/toggle isActive status for a user
router.put("/:userId/toggleActive", (req, res) => {
	userController.toggleActive(req.params.userId).then(result => res.send(result));
})

// Route for unpublishing a book
router.delete("/:userId/unpublish/:bookId", (req, res) => {

	const data = {
		userId: req.params.userId,
		bookId: req.params.bookId
	}

	userController.unpublishBook(data).then(result => res.send(result));
})

module.exports = router;