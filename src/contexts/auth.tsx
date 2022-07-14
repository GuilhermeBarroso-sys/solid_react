import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

type User = {
  id: string
  username: string
  email: string;
}

type AuthProvider = {
  children: ReactNode
}


interface ISignInParams {
  email: string
  password: string;
}
interface ISignInResponse {
  user: User
  token: string;
}

interface ISignUpParams {
  username: string
  email: string
  password: string;
}

interface ICreateContextData {
  user: User|null
  signOut: () => void
  signUp: ({username, email, password} : ISignUpParams) => Promise<boolean>
  signIn: ({email, password} : ISignInParams) =>  Promise<boolean>
  isAuthenticated: () => boolean
}
const localStorageTokenKey = "@guisolidapi:token";
export const AuthContext = createContext({} as ICreateContextData);

export function AuthProvider(props : AuthProvider) {
	// const navigate = useNavigate();
	const [user,setUser] = useState<User|null>(null);
  
	useEffect(() => {
		const token = localStorage.getItem(localStorageTokenKey);
		if(token) {
			api.defaults.headers.common.authorization = `Bearer ${token}`;
			api.get<User>("users/authenticate")
				.then( ({data : user}) => {
					setUser(user);
				})
				.catch(() => {
					// navigate("/login");
				});
		}
	}, []);

	function signOut() {
		localStorage.removeItem(localStorageTokenKey);
		// navigate("/login");

	}

	function isAuthenticated() {
		const token = localStorage.getItem(localStorageTokenKey);

		return token ? true : false;
	}

	async function signUp({username,email, password} : ISignUpParams) {
		try {
			const {status} = await api.post(`users`, {
				username,
				email,
				password
			});
			return status === 201; 
		} catch(err) {
			return false;
		} 
	}
	async function signIn({email,password} : ISignInParams) : Promise<boolean> {
		try {
			const {data : { user , token } } = await api.post<ISignInResponse>("users/authenticate", {email,password});
			localStorage.setItem(localStorageTokenKey, token);
			api.defaults.headers.common.authorization = `Bearer ${token}`;
			setUser(user);
			return true;
		} catch (err) {
			return false;
		}
  
	}
	return (
		<AuthContext.Provider value = {{user, signOut, signUp, signIn, isAuthenticated}}>
			{props.children}
		</AuthContext.Provider>
	);
}



