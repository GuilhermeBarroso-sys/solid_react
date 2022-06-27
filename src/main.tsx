import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./global.css";
import "./custom.css";
import { Login } from "./pages/Login";
import { AuthProvider } from "./contexts/auth";
import 'sweetalert2/src/sweetalert2.scss'
import { ToggleDarkMode } from "./components/toggleDarkMode";
ReactDOM.createRoot(document.getElementById("root")!).render(
  
	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route path="/" element={<div> oi</div>} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</AuthProvider>
	</BrowserRouter>
);
