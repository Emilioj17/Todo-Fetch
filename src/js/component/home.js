import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const tareas = [
	{ label: "Lavar las Manos" },
	{ label: "Programar en el PC" },
	{ label: "Hacer la Cama" },
	{ label: "Preparar la Comida" },
	{ label: "Lavar las Manos" },
	{ label: "Programar en el PC" },
	{ label: "Hacer la Cama" },
	{ label: "Preparar la Comida" }
];

export function Home() {
	const [tasks, setTasks] = useState(tareas);
	const [conteo, setConteo] = useState(0);
	const [tamaño, setTamaño] = useState(tareas.length);

	let alert = useRef("");

	useEffect(() => {
		console.log(alert.current.style.display);
		// tamaño == 0 ? console.log("Hola desde useEffect") : "";
		if (tamaño == 0) {
			// console.log(alert.current.style);
			alert.current.style.display = "";
		} else {
			alert.current.style.display = "none";
		}
	});

	const handler = event => {
		let element = document.getElementById(event.target.id);
		// console.log(element);
		element.parentNode.removeChild(element);
		setConteo(conteo + 1);
		setTamaño(tamaño - 1);
	};

	const onEnter = event => {
		if (event.keyCode === 13) {
			setTasks(tasks.concat({ label: event.target.value }));
			event.target.value = "";
			setTamaño(tamaño + 1);
		}
	};

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
			</div>
		</div>
	);
}
