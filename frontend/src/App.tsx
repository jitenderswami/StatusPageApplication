import { useState, useEffect } from "react";

const App = () => {
	const [message, setMessage] = useState("");

	useEffect(() => {
		fetch("http://localhost:3000/")
			.then((response) => response.text())
			.then((data) => setMessage(data))
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	return (
		<div>
			<h1>Full Stack App</h1>
			<p>{message}</p>
		</div>
	);
};

export default App;
