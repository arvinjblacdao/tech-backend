const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");

// Route for creating a book
router.post("/", (req, res) => {
	bookController.createBook(req.body).then(result => res.send(result));
})

// Route for getting all books
router.get("/", (req, res) => {
	bookController.getAllBooks(req.body).then(result => res.send(result));
})

// Route for getting a single book
router.get("/:bookId", (req, res) => {
	bookController.getBook(req.params.bookId).then(result => res.send(result));
})

// Route for updating a book
router.put("/:bookId", (req, res) => {

	const data = {
		bookId: req.params.bookId,
		title: req.body.title,
		description: req.body.description,
		coverImage: req.body.coverImage,
		price: req.body.price,
		userId: req.body.userId
	}

	bookController.updateBook(data).then(result => res.send(result));
})

// Route for deleting a book
router.delete("/:bookId", (req, res) => {
	bookController.deleteBook(req.params.bookId).then(result => res.send(result));
})

module.exports = router;