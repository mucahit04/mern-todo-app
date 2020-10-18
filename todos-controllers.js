const Todo = require("./Todo");

const getTodos = async (req, res, next) => {
	let todos;
	try {
		todos = await Todo.find();
	} catch (err) {
		const error = new Error("Ooops, couldnt fetch data!");
		error.status = 500;
		return next(error);
	}
	if (todos.length > 0) {
		const modifiedTodos = todos.map(todo => todo.toObject({ getters: true }));
		res.status(200).json(modifiedTodos);
	} else {
		const error = new Error("Couldnt find any todo!");
		error.status = 404;
		return next(error);
	}
};

const createTodo = async (req, res, next) => {
	const todo = new Todo({
		text: req.body.text,
		tag: req.body.tag,
	});

	try {
		await todo.save();
	} catch (err) {
		const error = new Error("Couldnt create todo!");
		error.status = 500;
		return next(error);
	}

	res.status(201).json({ todo: todo.toObject({ getters: true }) });
};

const updateTodo = async (req, res, next) => {
	const { text, tag, isComplete } = req.body;
	const todoId = req.params.id;

	let todo;
	try {
		todo = await Todo.findById(todoId);
	} catch (err) {
		const error = new Error("Could not update the todo!");
		error.status = 500;
		return next(error);
	}

	if (text || tag) {
		todo.text = text;
		todo.tag = tag;
	}
	if (typeof isComplete !== "undefined") {
		todo.isComplete = isComplete;
	}

	try {
		await todo.save();
	} catch (err) {
		const error = new Error("Problem occured, todo could not update!");
		error.status = 500;
		return next(error);
	}

	res.status(200).json({ updatedTodo: todo.toObject({ getters: true }) });
};

const deleteTodo = async (req, res, next) => {
	const todoId = req.params.id;

	let todo;
	try {
		todo = await Todo.findById(todoId);
		todo.remove();
	} catch (err) {
		const error = new Error("The todo could not delete!");
		error.status = 500;
		return next(error);
	}
	res.status(200).json({ message: "The todo has been deleted." });
};

exports.getTodos = getTodos;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
