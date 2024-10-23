import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";

export const signInAction = (username:string, password:string) => {
   return async (dispatch: Dispatch) => {
      try {
         const response = await axios.post(
            'http://192.168.8.108:8000/user/signin/',
            {
               username,
               password
            }
         );
         console.log('User Signed in successful: ', response.data.user_data.username);
         dispatch({
            type: 'signIn',
            payload: response.data
         })
      } catch (error) {
         console.error('Sign in error: ', error);
      }
   };

}

export const signOut = () =>{
   return {
      type: 'signOut',
      payload: false
   }
}