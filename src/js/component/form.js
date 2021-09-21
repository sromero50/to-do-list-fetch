import React, { useState, useEffect } from "react";

const Form = () => {
	const [toDo, setToDo] = useState("");
	const [list, setList] = useState([]);

	//////////////////// handlers /////////////////////////////////////////////
	const handleSubmit = e => {
		e.preventDefault();
		setToDo("");
	};
	const handleOnChange = e => {
		setToDo(e.target.value);
	};

	const handleRemove = label => {
		const newList = list.filter(item => item.label !== label);

		if (list.length === 0) {
			deleteAll();
		}

		setList(newList);
	};

	const handlePressKey = e => {
		if (e.key === "Enter") {
			setList([
				...list,
				{ id: list.length + 1, label: toDo, done: false }
			]);
		}
	};
	/////////////////////// fetch api ///////////////////////////////////////////
	const url = "https://assets.breatheco.de/apis/fake/todos/user/sromero50";

	const create = () => {
		fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok);
				console.log(resp.status);
				console.log(resp.text());
				return resp.json();
			})
			.then(() => {
				getList();
			})
			.catch(error => {
				console.log(error);
			});
	};

	const getList = () => {
		fetch(url)
			.then(res => res.json())
			.then(list => {
				setList(list);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const update = () => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(list),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok);
				console.log(resp.status);
				console.log(resp.text());
				return resp.json();
			})
			.then(data => {
				setList(data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const deleteAll = () => {
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(() => setList([]))
			.then(() => create())
			.catch(error => console.error("Error: ", error));
	};

	useEffect(() => {
		list.length > 0 ? getList() : create();
	}, []);

	update();

	return (
		<>
			<h1 className="display-4">To do list with fetch</h1>
			<div className="prueba">
				<form action="" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="To Do"
						className="form-control toDo"
						value={toDo}
						onChange={handleOnChange}
						onKeyPress={handlePressKey}
					/>
				</form>
				<ul className="list-group list-group-flush">
					{list.map(item => {
						return (
							<li key={item.id} className="list-group-item ">
								<>{item.label}</>
								<span onClick={() => handleRemove(item.label)}>
									<i className="fas fa-times"></i>
								</span>
							</li>
						);
					})}
				</ul>
				<footer>
					{list.length > 1
						? list.length + " items"
						: list.length + " item"}{" "}
					left
				</footer>
				<button
					onClick={deleteAll}
					className="btn btn-danger w-100 deleteBtn">
					Delete all
				</button>
			</div>
		</>
	);
};

export default Form;
