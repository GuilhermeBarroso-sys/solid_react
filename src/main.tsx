import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./global.css";
import "./custom.css";
import { Login } from "./pages/authentication/Login";
import { AuthProvider } from "./contexts/auth";
import "sweetalert2/src/sweetalert2.scss";
import { ToggleDarkMode } from "./components/toggleDarkMode";
import { DarkModeProvider } from "./contexts/darkMode";
import { Users } from "./components/Users";

ReactDOM.createRoot(document.getElementById("root")!).render(
  
	<BrowserRouter>
		<AuthProvider>
			<DarkModeProvider>
				<Routes>
					<Route path="/users" element={<Users />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</DarkModeProvider>
		</AuthProvider>
	</BrowserRouter>
);
