const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");

// Route for creating a book
router.post("/", (req, res) => {
	bookController.createBook(req.body).then(result => res.send(result));
})

module.exports = router;