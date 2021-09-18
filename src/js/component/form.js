import React, { useState } from "react";

const Form = () => {
	const [toDo, setToDo] = useState("");
	const [list, setList] = useState([]);

	const handleSubmit = e => {
		e.preventDefault();
		setToDo("");
	};
	const handleOnChange = e => {
		setToDo(e.target.value);
	};

	const handlePressKey = e => {
		if (e.key === "Enter") {
			setList([...list, { id: list.length + 1, content: toDo }]);
		}
	};
	const handleRemove = id => {
		const newList = list.filter(item => item.id !== id);
		setList(newList);
	};

	return (
		<>
			<h1 className="display-4">To do list</h1>
			<form action="" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="To Do"
					className="form-control"
					value={toDo}
					onChange={handleOnChange}
					onKeyPress={handlePressKey}
				/>
			</form>
			<ul className="list-group list-group-flush">
				{list.map(item => {
					return (
						<li key={item.id} className="list-group-item ">
							<>{item.content}</>
							<span onClick={() => handleRemove(item.id)}>
								<i className="fas fa-times"></i>
							</span>
						</li>
					);
				})}
			</ul>
			<footer>{list.length} item left</footer>
		</>
	);
};

export default Form;
