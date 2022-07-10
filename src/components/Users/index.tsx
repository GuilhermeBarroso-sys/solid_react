
import { ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import { DeleteButton } from "../Button/DeleteButton";
import { EditButton } from "../Button/EditButton";
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
	const navigate = useNavigate();
	const columns = [
		{ name: "id", header: "Id", defaultVisible: false, defaultWidth: 60, type: "number" },
		{ name: "username", header: "Name", defaultFlex: 1 },
		{ name: "email", header: "Email", defaultFlex: 1},
		{ name: "options", header: "Opcoes", defaultFlex: 1},

	];
	useEffect(() => {
		if(user) {
			fetchUsers().then((users) => {
				setRows(users.filter(tableUsers => tableUsers.id !== user.id));
			});
		}
	}, [user]);
	async function destroyUser(id : string) {
		try {
			const {isConfirmed} = await Swal.fire({
				title: "Tem certeza?",
				text: "Uma vez deletado, você não conseguira recuperar esse dado!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonColor: "gray",
				cancelButtonText: "Cancelar!",
				confirmButtonText: "Sim, prosseguir!"
			});
			if(isConfirmed) {
				await api.delete(`users/${id}`); 
				const users = await fetchUsers();
				setRows(users.filter(tableUsers => tableUsers.id !== user?.id));
				Swal.fire("Deletado!", "Usuário deletado com sucesso!", "success");
			}
		} catch( err ) {
			Swal.fire("Algo deu errado", "Algo deu errado! Tente novamente", "error");
		}
	}
	async function fetchUsers() : Promise<TUsers[]> {
		const users = await api.get<TUsers[]>("users");
		const usersArray : Array<TUsers> = []; 
		await Promise.all(users.data.map(item => {
			usersArray.push({
				...item, 
				options: 	
                <div className="text-center"> <EditButton onClickFunction={() => {}}/> <DeleteButton onClickFunction={() => destroyUser(item.id)}/> </div>
			});
		}));
		return usersArray;
	}
  
	return (
		<>
			<Navbar />
	
			<div className="w-3/4 mx-auto">
				<div className="text-left mb-3">
					<svg xmlns="http://www.w3.org/2000/svg" onClick={() => {navigate("/users/create");}} className="h-10 w-10 text-green-600 dark:text-green-300" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
					</svg>
				</div>
				<Table data={rows} columns={columns} checkboxColumn={true}/>
			</div>
		</>
	);
}