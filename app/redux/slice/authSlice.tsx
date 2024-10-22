import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const authSlice = createSlice({
   name: 'auth',
   initialState: {
      isLoggedIn: false,
      username: '',
   },
   reducers: {
      login: (state, actions) => {
         state.isLoggedIn = true;
         state.username = actions.payload;
      },
      logout: (state) => {
         state.isLoggedIn = false;
         state.username = '';
      },
   },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;