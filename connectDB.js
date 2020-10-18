const mongoose = require("mongoose");

const DB_URL =
	process.env.MONGODB_URI ||
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pdudy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
};

const connectDB = server => {
	mongoose
		.connect(DB_URL, options)
		.then(() => server())
		.catch(err => console.log("err happened in db connection!", err));
};

module.exports = connectDB;
