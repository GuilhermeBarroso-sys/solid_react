import { useContext, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginTheme from "../../../assets/loginTheme.svg";
import { AuthContext } from "../../../contexts/auth";
import { api } from "../../../services/api";
import { Navbar } from "../../Navbar";
import { ToggleDarkMode } from "../../toggleDarkMode";
type Inputs = {
  email: string,
  password: string,
};
type AuthenticateUser =  {
  token: string
  user: {
    id: string,
    username: string,
    email: string
  }
}
export function LoginScreen() {
	const {register, handleSubmit, formState: { errors }} = useForm<Inputs>();
	const navigate = useNavigate();
	const currentYear = new Date().getFullYear();
	const [validEmail, setValidEmail] = useState(true);
	const [validPassword, setValidPassword] = useState(false);
	const {signIn, isAuthenticated} = useContext(AuthContext);
	useEffect(() => {
		isAuthenticated() && navigate("/");
	},[]);
	const onSubmit : SubmitHandler<Inputs> = async ({email,password}) => {
		const success = await signIn({email,password});
		success ? navigate("/home") : Swal.fire("Erro", "Nao foi possivel autenticar, por favor verifique as credenciais.", "error");
	};
	function isValidEmail(email: string) : boolean {
		const emailRegexTemplate =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		return email.match(emailRegexTemplate) ? true : false;
	}
	return (
		<>
			<ToggleDarkMode />
			<div className="flex w-100 justify-center mt-10 dark:border-yellow">
				<div className="w-2/3  flex flex-row min-h-fit h-auto">
					<div className="w-full md:w-1/2 bg-white dark:bg-[#2C2E43] dark:text-[#ffff] rounded-l-md flex flex-col items-center md:justify-center  ">
						<h1 className="font-bold text-4xl black md:mt-40 mt-20 dark:text-[#ffff]">Entrar</h1>
						<div className="w-full max-w-xs">
							<form className="bg-white  dark:bg-[#2C2E43] rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
								<div className="mb-4">
									<label className="block text-gray-700 dark:text-[#ffff] text-sm font-bold mb-2" htmlFor="email">
                    email
									</label>
									<input {...register("email", {required: true})} required onChange={( { target : {value} } ) => {
										isValidEmail(value) ? setValidEmail(true) : setValidEmail(false);
									}} className={validEmail ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500"} id="email" type="email" placeholder="email" />
            
								</div>
								<div className="mb-1">
									<label className="block text-gray-700 dark:text-[#ffff]  text-sm font-bold mb-2" htmlFor="password">
                    Senha
									</label>
									<input  {...register("password", {required: true})} required onChange={( { target: { value }}) => {
										value.length >= 1 ? setValidPassword(true) : setValidPassword(false);
									}} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"} id="password" type="password" placeholder="******************" />
    

								</div>
								<div className="flex items-start flex-col">
									<a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-[#ffff] dark:font-extrabold mb-2" href="#">
                    Esqueceu sua senha?
									</a>
									<button
										disabled = {!validEmail || !validPassword ?  true : false } 
										className={
											!validEmail || !validPassword ?" bg-blue-300 cursor-not-allowed dark:bg-[#4f545c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " : "bg-blue-500 hover:bg-blue-700 dark:bg-[#1b1f25] dark:hover:bg-[#222831] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
										} type="submit" >Entrar</button>
								</div>
							</form>
							<p className="text-center text-gray-500 dark:text-[#ffff]  text-xs">&copy;{currentYear} Made by Gui Barroso.</p>
						</div>
					
					</div>
					<div className={`hidden md:flex w-1/2 bg-[#f3f4f8] dark:bg-[#222831] dark:text-[#ffff] rounded-r-md items-center justify-center`}><img src = {loginTheme} className="w-3/4" /> <br/><br/> </div>
				</div>
			</div>
		</>
	);
}