const mongoose = require("mongoose");

const DB_URL =
	process.env.MONGODB_URI ||
	`mongodb+srv://todoApp:todoApp@cluster0.pdudy.mongodb.net/todo-app?retryWrites=true&w=majority`;

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
