import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./global.css";
import "./custom.css";
import { Login } from "./pages/authentication/Login";
import { AuthProvider } from "./contexts/auth";
import { ToggleDarkMode } from "./components/toggleDarkMode";
import { DarkModeProvider } from "./contexts/darkMode";
import { Users } from "./components/Users";
import "@inovua/reactdatagrid-community/index.css";
import "@inovua/reactdatagrid-community/base.css";
import "@inovua/reactdatagrid-community/theme/amber-light.css";
import "@inovua/reactdatagrid-community/theme/amber-dark.css";
import "@inovua/reactdatagrid-community/theme/default-light.css";
import "@inovua/reactdatagrid-community/theme/default-dark.css";
import { CreateUser } from "./components/Users/CreateUser";

ReactDOM.createRoot(document.getElementById("root")!).render(
  
	<AuthProvider>
		<BrowserRouter>
			<DarkModeProvider>
				<Routes key={"users"}>
					<Route path="/users" element={<Users />} />
					<Route path="/users/create" element={<CreateUser />} />

					<Route path="/login" element={<Login />} />
				</Routes>
			</DarkModeProvider>
		</BrowserRouter>
	</AuthProvider>
);
