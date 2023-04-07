const bcrypt = require("bcrypt");
const auth = require("../auth");
const models = require("../models");
const User = models.User;

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