const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./connectDB");
const enableCORS = require("./enableCORS");
const todosRouter = require("./todosRouter");

const app = express();
app.use(enableCORS);
app.use(bodyParser.json()); // for parsing application/json
app.use("/todos", todosRouter);

const PORT = 5000;

const server = () => {
	app.listen(PORT, () => {
		console.log(`Listening to port ${PORT}`);
	});
};

connectDB(server);
