import { useState } from "react";
import { Table } from "../Table";

export function Users() {
	const [rows, setRows] = useState([ 
		["1", "Gui", "t@gmail.com"],
		["2", "Tata", "tata@gmail.com"],
		["4", "Tata", "tata@gmail.com"],
		["6", "Tata", "tata@gmail.com"],
		["8", "Tata", "tata@gmail.com"],
		["9", "Tata", "tata@gmail.com"],

	]);
	return (
		<div className="w-3/4 mx-auto">
			<Table 
				columns={["Id", "Username", "Email"]} 
				rows = {rows}
				setRows={setRows}
			/>
		</div>
	);
}