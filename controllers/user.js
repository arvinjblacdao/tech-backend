const bcrypt = require("bcrypt");
const auth = require("../auth");
const models = require("../models");
const Book = models.Book;
const User = models.User;
const { Op } = require("sequelize");

// Create user method
module.exports.createUser = (reqBody) => {

	return User.findOne({
		where: {
			username: reqBody.username
		}
	})
	.then((data) => {
		if (data === null) {
			return User.create({
				firstName: reqBody.firstName,
				lastName: reqBody.lastName,
				username: reqBody.username,
				password: bcrypt.hashSync(reqBody.password, 10),
				authorPseudonym: reqBody.authorPseudonym
			})
		} else {
			return false;
		}
	})
	
}

// Authenticate user method
module.exports.authenticate = (reqBody) => {

	return User.findOne({
		where: {
			username: reqBody.username
		}
	})
	.then((data) => {
		if (data === null) {
			return false;
		} else {

			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, data.password);

			if (isPasswordCorrect) {
				return { access : auth.createAccessToken(data) };
			} else {
				return false;
			}

		}
	})

}

// Get a single user method
module.exports.getUser = (reqParam) => {
	return User.findByPk(reqParam)
	.then(result => {
		if (result === null) {
			return false;
		} else {
			return result;
		}
	});
	
}

// Get a single user with query parameters method
module.exports.getUserByParameters = (reqBody) => {
	return User.findOne({
		where: {
			[Op.or]: [
				{ firstName: reqBody.firstName },
				{ lastName: reqBody.lastName },
				{ username: reqBody.username },
				{ authorPseudonym: reqBody.authorPseudonym },
			]
		}
	}).then(result => {
		if (result === null) {
			return false;
		} else {
			return result
		}
	});

}

// Update a user method
module.exports.updateUser = (data) => {
	return User.findByPk(data.userId)
	.then(result => {
		if (result === null) {
			return false;
		} else {

			console.log(result.password);
			console.log(data.currentPassword);

			const isPasswordCorrect = bcrypt.compareSync(data.currentPassword, result.password);

			if (isPasswordCorrect) {
				return User.update(
					{ 
						firstName : data.firstName,
						lastName: data.lastName,
						username: data.username,
						password: bcrypt.hashSync(data.newPassword, 10),
						authorPseudonym: data.authorPseudonym
					},
					{
						where: { id: data.userId }
					}
				)
			} else {
				return false;
			}
			
		}
	});
	
}

// Hard delete a user method
module.exports.deleteUser = (userId) => {
	return User.findByPk(userId)
	.then(result => {
		if (result === null) {
			return false;
		} else {
			User.destroy({
				where: { id : userId }
			});

			return true;
		}
	})
}

// Soft delete a user method
module.exports.toggleActive = (userId) => {
	return User.findByPk(userId)
	.then(result => {
		if (result === null) {
			return false;
		} else {

			return User.update(
				{ 
					isActive: !result.isActive
				},
				{
					where: { id: userId }
				}
			)
			
		}
	});
	
}

// Unpublish book by user
module.exports.unpublishBook = (data) => {
	return Book.findByPk(data.bookId)
	.then(result => {

		if (result.userId == data.userId.toString()) {
			Book.destroy({
				where: { id : data.bookId }
			});

			return true
		} else {
			return false
		}
		
	})
}