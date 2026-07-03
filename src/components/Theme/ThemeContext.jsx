import react ,{useContext,createContext} from "react";


export const ThemeContext = createContext({
    lightMode: () => {},
    darkMode: () => {},
    themeMode: "light"
})

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme()
{
    return useContext(ThemeContext);
}