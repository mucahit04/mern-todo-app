import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
	const [todoBody, setTodoBody] = useState(props.edit ? props.edit.value : "");
	const [todoTag, setTodoTag] = useState(props.edit ? props.edit.tag : "");
	const [focusKey, setFocusKey] = useState("");
	const todoBodyRef = useRef(null);

	useEffect(() => {
		todoBodyRef.current.focus();
	}, [focusKey]);

	const handleChange = e => {
		setTodoBody(e.target.value);
	};
	const handleTagChange = e => {
		setTodoTag(e.target.value);
	};
	const handleSubmit = e => {
		e.preventDefault();
		props.onSubmit({
			id: Math.floor(Math.random() * 10000),
			text: todoBody,
			tag: todoTag,
		});
		setTodoBody("");
		setTodoTag("");
		setFocusKey(Math.random());
	};
	return (
		<form className='todo-form' onSubmit={handleSubmit}>
			{props.edit ? (
				<>
					<input
						type='text'
						placeholder='Update todo'
						value={todoBody}
						name='text'
						className='todo-input edit'
						onChange={handleChange}
						ref={todoBodyRef}
					/>
					<input
						type='text'
						placeholder='Update tag'
						value={todoTag}
						onChange={handleTagChange}
						className='todo-input edit'
					/>
					<button className='todo-button'>Update todo</button>
				</>
			) : (
				<>
					<input
						type='text'
						placeholder={"Enter a todo"}
						value={todoBody}
						name='text'
						className='todo-input'
						onChange={handleChange}
						ref={todoBodyRef}
					/>
					<input
						type='text'
						placeholder='Add tag'
						value={todoTag}
						onChange={handleTagChange}
						className='todo-input todo-tag'
					/>
					<button className='todo-button'>Add todo</button>
				</>
			)}
		</form>
	);
}

export default TodoForm;
