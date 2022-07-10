import { Navbar } from "../../Navbar";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginTheme from "../../../assets/loginTheme.svg";
import { AuthContext } from "../../../contexts/auth";
import { api } from "../../../services/api";
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
export function CreateUser() {
	const {register, handleSubmit, formState: { errors }} = useForm<Inputs>();
	const [validEmail, setValidEmail] = useState(true);
	const [validPassword, setValidPassword] = useState(false);
	const {signIn, isAuthenticated} = useContext(AuthContext);
	const navigate = useNavigate();
	const onSubmit : SubmitHandler<Inputs> = async ({email,password}) => {
		const success = await signIn({email,password});

	};
	function isValidEmail(email: string) : boolean {
		const emailRegexTemplate =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		return email.match(emailRegexTemplate) ? true : false;
	}
	return (
		<>
			<Navbar />
			<div className="w-full mt-12 ">

				<div className="w-1/2 mx-auto">

					<svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
						navigate("/users");
					}} className="h-12 w-12 cursor-pointer dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
						<path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
					</svg>
				</div>
				<h1 className=" text-center text-4xl font-extrabold text-gray-700 dark:text-[#ffff] "> Criar usuário</h1>
			</div>
			<div className="flex w-100  justify-center mt-10 dark:border-yellow">
				<div className="w-full  flex flex-row justify-center min-h-fit h-auto">
					<div className="w-full md:w-1/2 bg-white dark:bg-[#2C2E43] dark:text-[#ffff] rounded-l-md flex flex-col items-center md:justify-center  ">
					
						<div className="w-full max-w-xs">
							<form className="bg-white  dark:bg-[#2C2E43] rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
								<div className="mb-4">
									<label className="block text-gray-700 dark:text-[#ffff] text-lg font-bold mb-2" htmlFor="email">
                                        email
									</label>
									<input {...register("email", {required: true})} required onChange={( { target : {value} } ) => {
										isValidEmail(value) ? setValidEmail(true) : setValidEmail(false);
									}} className={validEmail ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500"} id="email" type="email" placeholder="email" />
            
								</div>
								<div className="mb-1">
									<label className="block text-gray-700 dark:text-[#ffff]  text-lg font-bold mb-2" htmlFor="password">
                                        Senha
									</label>
									<input  {...register("password", {required: true})} required onChange={( { target: { value }}) => {
										value.length >= 1 ? setValidPassword(true) : setValidPassword(false);
									}} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"} id="password" type="password" placeholder="******************" />
    

								</div>
								<div className="flex items-center flex-col">
									<button
										disabled = {!validEmail || !validPassword ?  true : false } 
										className={
											!validEmail || !validPassword ?" bg-green-300 cursor-not-allowed dark:bg-[#4f545c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " : "bg-green-500 hover:bg-green-700 dark:bg-[#1b1f25] dark:hover:bg-[#222831] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
										} type="submit" >Criar</button>
								</div>
							</form>
				
						</div>
					
					</div>
				</div>
			</div>
		</>
	);
}