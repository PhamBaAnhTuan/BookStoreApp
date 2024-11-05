import axios from "axios";
import { createContext, useContext, useState } from "react";
import { ToastAndroid } from "react-native";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../app/redux/store/store";


export const AuthContext = createContext<any>(null);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   // Dispatch for redux
   const dispatch: AppDispatch = useDispatch<AppDispatch>();

   const useAuthSelector = useSelector((state: RootState) => state.auth);
   const useThemeSelector = useSelector((state: RootState) => state.theme);

   const [email, setEmail] = useState('');
   const [userName, setUserName] = useState('');
   const [password, setPassword] = useState('');

   const resetAuth = () => {
      setUserName('');
      setPassword('');
      setEmail('');
   };

   const [data, setData] = useState({});
   const resetForm = () => setData({});

   return (
      <AuthContext.Provider value={{
         dispatch, useAuthSelector, useThemeSelector,
         email, setEmail, userName, setUserName, password, setPassword, resetAuth,
         data, setData, resetForm
      }}>
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = () => {
   const value = useContext(AuthContext);
   if (!value) {
      throw new Error('useAuth must be used within a AuthContextProvider');
   }
   return value;
}