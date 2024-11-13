import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { ToastAndroid } from "react-native";

const API_URL = process.env.API_URL;

export const signInAction = (username: string, password: string, resetAuth: () => void) => {
   return async (dispatch: Dispatch) => {
      if (!username && !password) {
         ToastAndroid.show('Enter Full name and Password!', ToastAndroid.SHORT);
         return;
      } if (!username) {
         ToastAndroid.show('Enter User Name!', ToastAndroid.SHORT);
         return;
      } if (!password) {
         ToastAndroid.show('Enter Password!', ToastAndroid.SHORT);
         return;
      }
      try {
         const response = await axios.post(`${API_URL}/user/users/signin/`,
            {
               username,
               password
            }
         );
         console.log('User sign in successful: ', response.data.user_data.username);
         dispatch({
            type: 'SIGN_IN',
            payload: response.data
         })
         resetAuth();
      } catch (error: any) {
         console.log('SIGN IN ERROR: ', error.response.data.error);
         ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT);
         resetAuth();
      }
   };

}

export const signUpAction = (username: string, password: string, resetAuth: () => void) => {
   return async (dispatch: Dispatch) => {
      if (!username || !password) {
         ToastAndroid.show('Enter Full name and Password!', ToastAndroid.SHORT);
         return;
      } if (!username || username.length < 6) {
         ToastAndroid.show('Username at least 6 characters!', ToastAndroid.SHORT);
         return;
      } if (!password || password.length < 6) {
         ToastAndroid.show('Password at least 6 characters!', ToastAndroid.SHORT);
         return;
      }
      try {
         const response = await axios.post(`${API_URL}/user/users/signup/`,
            {
               username,
               password
            }
         );
         console.log('User sign up successful: ', response.data.message);
         dispatch({
            type: 'SIGN_UP',
            payload: true
         })
         ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
         resetAuth();
      } catch (error: any) {
         let msg = error.response;
         if (msg = { "username": "A user with that username already exists." }) { msg = 'Username already exist!' }
         console.log('SIGN UP ERROR: ', msg);
         ToastAndroid.show(msg, ToastAndroid.SHORT);
         // resetAuth();
      }
   }
}

export const signOutAction = () => {
   ToastAndroid.show('Signed out!', ToastAndroid.SHORT);
   return {
      type: 'SIGN_OUT',
      payload: false
   }
}

export const getUserProfile = (userId: number, accessToken: string) => {
   return async (dispatch: Dispatch) => {
      try {
         const response = await axios.get(`${API_URL}/user/profile/${userId}/`, {
            headers: {
               'Authorization': `Bearer ${accessToken}`,
            },
         });
         dispatch({
            type: 'GET_USER_PROFILE',
            payload: response.data
         })
         console.log('Get user profile successful: ', response.data.user);
      } catch (error: any) {
         console.log('GET USER PROFILE ERROR: ', error.response.data.detail);
      }
   }
}

export const updateUserProfile = (isNewUser: boolean, userId: number, userData: any, accessToken: string, resetForm: () => void) => {
   return async (dispatch: Dispatch) => {
      try {
         const response = await axios.patch(`${API_URL}/user/users/${userId}/`, userData, {
            headers: {
               'Authorization': `Bearer ${accessToken}`,
            },
         });
         dispatch({
            type: 'UPDATE_USER_INFO',
            payload: response.data
         })
         console.log('Update info successful: ', response.data.email);
         ToastAndroid.show('Update info successful!', ToastAndroid.SHORT);
         resetForm();
      } catch (error: any) {
         console.log('UPDATE USER INFO ERROR: ', error.response.data);
         resetForm();
      }
      // update info
      if (isNewUser) {
         try {
            const response = await axios.post(`${API_URL}/user/profile/`, userData, {
               headers: {
                  'Authorization': `Bearer ${accessToken}`,
               },
            });
            dispatch({
               type: 'UPDATE_USER_PROFILE',
               payload: response.data
            })
            console.log('Update profile successful: ', response.data.user);
            ToastAndroid.show('Update profile successful!', ToastAndroid.SHORT);
            resetForm();
         } catch (error: any) {
            console.log('UPDATE USER PROFILE ERROR: ', error.response.data);
            resetForm();
         }
      } else {
         try {
            const response = await axios.patch(`${API_URL}/user/profile/${userId}/`, userData, {
               headers: {
                  'Authorization': `Bearer ${accessToken}`,
               },
            });
            dispatch({
               type: 'UPDATE_USER_PROFILE',
               payload: response.data
            })
            console.log('Update profile successful: ', response.data.user);
            ToastAndroid.show('Update profile successful!', ToastAndroid.SHORT);
            resetForm();
         } catch (error: any) {
            console.log('UPDATE USER PROFILE ERROR: ', error.response.data);
            resetForm();
         }
      }
   }
}

export const getBooksAction = () => {
   return async (dispatch: Dispatch) => {
      try {
         const response = await axios.get(`${API_URL}/books/`);
         dispatch({
            type: 'GET_BOOKS',
            payload: response.data
         })
         console.log('Get books successful: ', response.data.map((book: any) => book.title));
      } catch (error: any) {
         console.log('GET BOOKS ERROR: ', error.message);
      }
   }
}

export const addBookAction = (bookData: any, accessToken: string, resetFrom: () => void) => {
   return async (dispatch: Dispatch) => {
      try {
         const response = await axios.post(`${API_URL}/books/`, bookData, {
            headers: {
               'Authorization': `Bearer ${accessToken}`,
            },
         });
         dispatch({
            type: 'ADD_BOOK',
            payload: response.data
         })

         console.log('Add book successful: ', response.data.title);
         ToastAndroid.show(`Add ${response.data.title} book successful!`, ToastAndroid.SHORT);
         resetFrom();
      } catch (error: any) {
         console.log('ADD BOOK ERROR: ', error.message);
      }
   }
}

export const updateBookAction = (id: number, bookData: any, accessToken: string, resetForm: () => void) => {
   return async (dispatch: Dispatch) => {
      try {
         const response = await axios.patch(`${API_URL}/books/${id}/`, bookData, {
            headers: {
               'Authorization': `Bearer ${accessToken}`,
            },
         });
         dispatch({
            type: 'UPDATE_BOOK',
            payload: response.data,
         })

         console.log('Update book successful: ', response.data.title);
         ToastAndroid.show(`Update ${response.data.title} book successful!`, ToastAndroid.SHORT);
         resetForm();
      } catch (error: any) {
         console.log('UPDATE BOOK ERROR: ', error.message);
      }
   }
}

export const deleteBookAction = (id: number, title: string, accessToken: string) => {
   return async (dispatch: Dispatch) => {
      try {
         const response = await axios.delete(`${API_URL}/books/${id}/`, {
            headers: {
               'Authorization': `Bearer ${accessToken}`,
            },
         });
         dispatch({
            type: 'DELETE_BOOK',
            payload: id
         })
         console.log('Delete book successful: ', title);
         ToastAndroid.show(`Deleted book ${title} successful!`, ToastAndroid.SHORT);
      } catch (error: any) {
         console.log('DELETE BOOK ERROR: ', error.message);
      }
   }
}

export const addToCartAction = (userId: number, item: any, accessToken: string) => {
   return async (dispatch: Dispatch) => {
      try {
         const response = await axios.patch(`${API_URL}/user/profile/${userId}/`, item, {
            headers: {
               'Authorization': `Bearer ${accessToken}`,
            },
         });
         dispatch({
            type: 'ADD_TO_CART',
            payload: response.data.old_cart
         })

         console.log('Add to cart successful: ', response.data.old_cart);
         ToastAndroid.show(`Add ${response.data.old_cart.map((item) => item)} to cart successful!`, ToastAndroid.SHORT);
      } catch (error: any) {
         console.log('UPDATE BOOK ERROR: ', error.message);
      }
   }
}
// export const addToCartAction = (item: any) => {
//    console.log(`Add ${item.title} to cart successful!`);
//    ToastAndroid.show(`Add ${item.title} to cart successful!`, ToastAndroid.SHORT);
//    return {
//       type: 'ADD_TO_CART',
//       payload: item
//    }
// }

export const removeFromCartAction = (item: any) => {
   console.log(`Removed ${item.title} from cart successful!`);
   ToastAndroid.show(`Remove ${item.title} from cart successful!`, ToastAndroid.SHORT);
   return {
      type: 'REMOVE_FROM_CART',
      payload: item
   }
}