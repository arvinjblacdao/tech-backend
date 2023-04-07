const models = require("../models");
const Book = models.Book;

// Create book method
module.exports.createBook = (reqBody) => {

	return Book.findOne({
		where: {
			title: reqBody.title
		}
	})
	.then((data) => {
		if (data === null) {
			return Book.create({
				title: reqBody.title,
				description: reqBody.description,
				coverImage: reqBody.coverImage,
				price: reqBody.price,
				userId: reqBody.userId
			})
		} else {
			return false;
		}
	})
	
}

// Get all books method
module.exports.getAllBooks = () => {
	return Book.findAll({});
}

// Get a single book method
module.exports.getBook = (reqParam) => {
	const book = Book.findByPk(reqParam);
	if (book === null) {
		return false;
	} else {
		return book;
	}
}