
import { PencilAltIcon } from "@heroicons/react/outline";
import { ReactNode, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import { Navbar } from "../Navbar";
import { Table } from "../Table";
import { ToggleDarkMode } from "../toggleDarkMode";
type TUsers = {
id: string
username: string;
email: string;
options: ReactNode
password?: string;
}


export function Users() {

	const {user} = useContext(AuthContext);
	const [rows, setRows] = useState<TUsers[]>([]);
	// async function makeTable() : Promise<ReactNode[][]>{
	// 	const data = await fetchUsers();
	// 	const rowsData = await Promise.all(data.map((user, index) => {
	// 		return [
	// 			user.id,
	// 			user.username,
	// 			user.email,
		
      
	// 	}
	// 	));
	// 	return rowsData;
	// }
	const columns = [
		{ name: "id", header: "Id", defaultVisible: false, defaultWidth: 60, type: "number" },
		{ name: "username", header: "Name", defaultFlex: 1 },
		{ name: "email", header: "Email", defaultFlex: 1},
		{ name: "options", header: "Opcoes", defaultFlex: 1},

	];
	useEffect(() => {
		if(user) {
			fetchUsers().then((users) => {
				setRows(users);
			});
		}
	}, [user]);

	async function fetchUsers() : Promise<TUsers[]> {
		const users = await api.get<TUsers[]>("users");
		const usersArray : Array<TUsers> = []; 
		await Promise.all(users.data.map(item => {
			usersArray.push({
				...item, 
				options: 	
                <div className="text-center">
                	<button onClick={() => {console.log(item.id, item.email);}}>
                		<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                			<path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"  />
                		</svg>
                	</button>

                	<button>
                		<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                			<path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                		</svg>  
                	</button> 
                </div>
			});
		}));
		return usersArray;
	}
  
	return (
		<>
			<Navbar />
			<div className="w-full ">
				<ToggleDarkMode />
    
			</div>
			<div className="w-3/4 mx-auto">
				<Table data={rows} columns={columns} checkboxColumn={true}/>
			</div>
		</>
	);
}