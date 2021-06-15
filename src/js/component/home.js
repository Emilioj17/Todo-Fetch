import React, { useState, useEffect, useRef } from "react";

async function putData(url = "", data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: "PUT", // *GET, POST, PUT, DELETE, etc.
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
	console.log("Hola desde putData");
	return response.json();
}

async function getData(url = "") {
	// Default options are marked with *
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	console.log("Hola desde getData");
	return response.json();
}

async function delData(url = "") {
	// Default options are marked with *
	const response = await fetch(url, {
		method: "DELETE", // *GET, POST, PUT, DELETE, etc.
		headers: {
			"Content-Type": "application/json"
		}
	});
	console.log("Hola desde delData");
	return response.json();
}

async function createData(url = "", data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
	console.log("Hola desde createData");
	return response.json();
}

export function Home() {
	const [tasks, setTasks] = useState([]);
	const [conteo, setConteo] = useState(0);
	const [tamaño, setTamaño] = useState(tasks.length);

	let alert = useRef("");
	let baseDatos =
		"https://assets.breatheco.de/apis/fake/todos/user/emiliojelves";

	//useEffect Inicial que llama a la Data
	useEffect(() => {
		console.log("Hola desde useEffect");

		// // Crear Data
		// createData(baseDatos, []);

		//Borrar Data
		// delData(baseDatos);

		//Put Data
		// putData(baseDatos, []).then(data => {
		// 	console.log("Data Actualizada");
		// 	console.log(data); // JSON data parsed by `data.json()` call
		// });

		// //Get Data
		getData(baseDatos).then(data => {
			setTasks(data);
		});
	}, []);

	//useEffect Que Actualiza Data en BD al cambiar tasks
	useEffect(() => {
		putData(baseDatos, tasks).then(data => {
			console.log(data); // JSON data parsed by `data.json()` call
		});

		console.log("Data Actualizada");
	}, [tasks]);

	useEffect(() => {
		if (tasks.length == 0) {
			alert.current.style.display = "";
		} else {
			alert.current.style.display = "none";
		}
	});

	/*Handlers      */
	//Al borrar
	const handler = event => {
		console.log("Hola desde handler");
		console.log(event.target);
		let element2 = tasks.filter((item, index) => index != event.target.id);
		setTasks(element2);
		setConteo(conteo + 1);
		// setTamaño(tamaño - 1);
	};

	//On Enter
	const onEnter = event => {
		if (event.keyCode === 13) {
			setTasks(tasks.concat({ label: event.target.value, done: false }));
			event.target.value = "";
			// setTamaño(tamaño + 1);
		}
	};

	//Borrar todas las tareas
	const handlerBorrar = evento => {
		// console.log("Hola desde Borrar");
		setConteo(conteo + tasks.length);
		let element2 = [];
		setTasks(element2);
	};

	//Returns
	return (
		<div className="text-center">
			<div className="bg-light">
				<div>
					<h1>Todos</h1>
				</div>
				<div className="pb-2">
					<input
						type="text"
						placeholder="¿Qué necesitas hacer?"
						onKeyUp={onEnter}
					/>
				</div>
			</div>
			<div
				className="alert alert-danger"
				ref={alert}
				role="alert"
				style={{ display: "none" }}>
				No tasks, add a task
			</div>
			<div className="lista">
				<ul className="list-group my-2">
					{tasks.map((t, index) => (
						<li
							key={index}
							className="list-group-item"
							id={index}
							onClick={handler}>
							{t.label}
						</li>
					))}
					<p className="pt-2">{conteo} items se han ido</p>
				</ul>
				<div className="d-flex justify-content-end">
					<input
						className="btn btn-warning"
						type="button"
						onClick={handlerBorrar}
						value="Borrar Tareas"
					/>
				</div>
			</div>
		</div>
	);
}
