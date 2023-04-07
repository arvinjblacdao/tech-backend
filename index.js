require('dotenv').config();
const cors = require("cors");
const express = require("express");
const { Sequelize } = require('sequelize');

// Defines the connection to the localhost SQL database
const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect : "mysql"
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
});

try {
	sequelize.authenticate();
	console.log('MySQL connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}