import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import axios from "../axios";

function TodoList() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const getTodos = async () => {
			const response = await axios.get("/");
			const todos = await response.data;
			setTodos(todos);
		};
		getTodos();
	}, []);

	//creating a todo
	const addTodo = async todo => {
		if (!todo.text || !todo.text.trim()) {
			return;
		}

		const {
			data: { todo: newTodo },
		} = await axios.post("/", { text: todo.text, tag: todo.tag });

		setTodos(prevTodos => [newTodo, ...prevTodos]);
	};

	//updating a todo
	const updateTodo = async (todoId, todoToUpdate) => {
		if (!todoToUpdate.text || !todoToUpdate.text.trim()) {
			return;
		}
		// updating the backend
		const {
			data: { updatedTodo },
		} = await axios.patch(`/${todoId}`, { text: todoToUpdate.text, tag: todoToUpdate.tag });
		setTodos(todos => todos.map(item => (item.id === todoId ? updatedTodo : item)));
	};

	//deleting a todo
	const removeTodo = async id => {
		await axios.delete(`/${id}`);
		//updating the backend
		setTodos(todos.filter(todo => todo.id !== id));
	};

	//assigning a todo as complete
	const completeTodo = async (id, isComplete) => {
		// updating the backend
		const {
			data: { updatedTodo },
		} = await axios.patch(`/${id}`, { isComplete: !isComplete });
		setTodos(todos => todos.map(item => (item.id === id ? updatedTodo : item)));
	};

	return (
		<>
			<h1>Ready to take your notes!</h1>
			<TodoForm onSubmit={addTodo} />
			<Todo
				todos={todos}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
				updateTodo={updateTodo}
			/>
		</>
	);
}

export default TodoList;
