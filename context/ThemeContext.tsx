import React, { useContext } from "react";
import { createContext } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext<any>(null);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

   const scheme = useColorScheme();
   const theme = {
      bgc: scheme === 'dark' ? '#101010' : '#d7d7d7',
      text: scheme === 'dark' ? '#fff' : '#111518',
      white: scheme === 'dark'? 'white' : 'white',
      black: scheme === 'dark'? 'black' : 'black',
      gray: scheme === 'dark' ? 'gray' : 'lightgray',
      green: scheme === 'dark' ? 'green' : 'green',
      orange: scheme === 'dark' ? '#ff7233' : '#ff7233',
      lightOrange: scheme === 'dark' ? '#ffa831' : '#ffa831',
   }

   return (
      <ThemeContext.Provider value={{ theme }}>
         {children}
      </ThemeContext.Provider>
   )
};

export const useTheme = () => {
   const value = useContext(ThemeContext);
   if (!value) {
      throw new Error('useTheme must be used within a ThemeProvider');
   }
   return value;
}