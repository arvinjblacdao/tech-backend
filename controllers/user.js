const models = require("../models");
const User = models.User;

module.exports.createUser = (reqBody) => {

	return User.create({
		firstName: "John",
		lastName: "Smith",
		authorPseudonym: "jsmith"
	})

}