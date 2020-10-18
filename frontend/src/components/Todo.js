import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
	const [edit, setEdit] = useState({
		id: null,
		value: "",
		tag: "",
	});

	const submitUpdate = value => {
		updateTodo(edit.id, value);
		setEdit({
			id: null,
			value: "",
			tag: "",
		});
	};

	if (edit.id) {
		return <TodoForm edit={edit} onSubmit={submitUpdate} />;
	}

	return (
		<div className='todos-container'>
			{todos.length >= 1 && (
				<div className='todo-header'>
					<p>Description</p>
					<p>Tag</p>
				</div>
			)}
			{todos.map(todo => (
				<div className={todo.isComplete ? "todo-container complete" : "todo-container"}>
					<div className='todo-row' key={todo.id} onClick={() => completeTodo(todo.id)}>
						<p className='description'>{todo.text}</p>
						<p className='tag'>{todo.tag}</p>
					</div>
					<div className='icons'>
						<RiCloseCircleLine onClick={() => removeTodo(todo.id)} className='delete-icon' />
						<TiEdit
							onClick={() => setEdit({ id: todo.id, value: todo.text, tag: todo.tag })}
							className='edit-icon'
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default Todo;
