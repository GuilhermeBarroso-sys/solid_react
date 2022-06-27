import { createContext, ReactNode, useEffect, useState } from "react";
type DarkModeProvider = {
  children: ReactNode
}

interface IDarkModeContext {
  colorTheme: string
  setColorTheme: React.Dispatch<React.SetStateAction<string>>
}
export const DarkMode = createContext({} as IDarkModeContext);
export function DarkModeProvider({children} : DarkModeProvider) {

  const initialState = localStorage.getItem('@guisolidapi:colorTheme') != 'dark' ? 'light' : 'dark' ;
  const [colorTheme, setColorTheme] = useState(initialState)

  useEffect(() => {
      localStorage.setItem('@guisolidapi:colorTheme', colorTheme)
      if(colorTheme == 'dark') {
        document.documentElement.classList.add('dark')
        document.body.style.backgroundColor = '#171717'
      } 
      else {
        document.documentElement.classList.remove('dark')
        document.body.style.backgroundColor = '#d3d0df' 
      }
      
  }, [colorTheme])
  return (
		<DarkMode.Provider value = {{colorTheme,setColorTheme}}>
			{children}
		</DarkMode.Provider>
	);
}

