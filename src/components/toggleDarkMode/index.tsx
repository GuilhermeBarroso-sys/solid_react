import { useContext, useEffect, useState } from "react";
import { DarkMode } from "../../contexts/darkMode";

export function ToggleDarkMode() {
	const { colorTheme, setColorTheme} = useContext(DarkMode);
	return (

		<label className="inline-flex items-center cursor-pointer relative md:right-0 mt-10  left-3/4">
			<input  onChange={(event) => { setColorTheme(localStorage.getItem("@guisolidapi:colorTheme") == "dark" ? "light" : "dark");} } type="checkbox" value="" id="large-toggle" className="sr-only peer" checked = {colorTheme == "dark" && true} />
			<div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
		</label>
    
	);
}