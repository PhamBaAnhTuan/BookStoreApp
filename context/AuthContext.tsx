import axios from "axios";
import { createContext, useContext, useState } from "react";
import { ToastAndroid } from "react-native";


export const AuthContext = createContext<any>(null);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   // API URL
   const API_URL = 'http://192.168.8.108:8000/api';
   // Sign in method
   const [user, setUser] = useState([]);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const signIn = async (username: string, password: string) => {
      try {
         const response = await axios.post(`${API_URL}/user/signin/`, {
            username: username,
            password: password
         });
         console.log('Sign in successful: ', response.data);
         setIsAuthenticated(true);
         setUser({ username: username, password: password });
         ToastAndroid.show('Sign in successful!', ToastAndroid.SHORT);
         return response.data;
      } catch (error: any) {
         let msg = error.response.data;
         if (msg = {"detail": "No active account found with the given credentials"})
            { msg = 'Invalid Email or Password!' }
         console.log(msg);
         // console.error('Error signing in:', error.response?.data);
         ToastAndroid.show(msg, ToastAndroid.SHORT);
      }
   };
   
   // Sign up method
   const signUp = async (email: string, username: string, password: string) => {
      try {
         const response = await axios.post(`${API_URL}/user/signup/`, {
            email: email,
            username: username,
            password: password
         });
         console.log('Sign up successful: ', response.data);
         setIsAuthenticated(true);
         setUser({ email: email, username: username, password: password });
         ToastAndroid.show('Sign up successful!', ToastAndroid.SHORT);
         return response.data;
      } catch (error: any) {
         let msg = error.response.data;
         if (msg = {"error": "UNIQUE constraint failed: auth_user.username"})
            { msg = 'User name already exist!' }
         console.log(msg);
         // console.error('Error signing up:', error.response?.data);
         ToastAndroid.show(msg, ToastAndroid.SHORT);
      }

   };
   return (
      <AuthContext.Provider value={{
         API_URL, signIn, signUp, isAuthenticated, setIsAuthenticated,
         user, setUser, email, setEmail, username, setUsername, password, setPassword
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