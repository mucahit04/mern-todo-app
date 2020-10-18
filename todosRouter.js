const express = require("express");

const todosRouter = express.Router();

const { getTodos, createTodo, updateTodo, deleteTodo } = require("./todos-controllers");

todosRouter.get("/", getTodos);
todosRouter.post("/", createTodo);
todosRouter.route("/:id").patch(updateTodo).delete(deleteTodo);

module.exports = todosRouter;
