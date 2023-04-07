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
	return Book.findByPk(reqParam)
	.then(result => {
		if (result === null) {
			return false;
		} else {
			return book;
		}
	});
	
}

// Update a book method
module.exports.updateBook = (data) => {
	return Book.findByPk(data.bookId)
	.then(result => {
		if (result === null) {
			return false;
		} else {
			return Book.update(
				{ 
					title : data.title,
					description: data.description,
					coverImage: data.coverImage,
					price: data.price,
					userId: data.userId
				},
				{
					where: { id: data.bookId }
				}
			)
		}
	});
	
}

// Delete a book method
module.exports.deleteBook = (bookId) => {
	return Book.findByPk(bookId)
	.then(result => {
		if (result === null) {
			return false;
		} else {
			Book.destroy({
				where: { id : bookId }
			});

			return true;
		}
	})
}