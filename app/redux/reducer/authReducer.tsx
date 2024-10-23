
const initialState = {
   isSignedIn: false,
   accessToken: null,
   user: null,
}


export const authReducer = (state = initialState, action: any) => {

   switch (action.type) {
      case 'signIn':
         return {
            ...state,
            isSignedIn: true,
            user: action.payload.user_data.email,
            accessToken: action.payload.access_token,
         }
      case 'signUp':
         return {
            ...state,
            isSignedIn: action.payload
         }

      case 'signOut':
         return {
            ...state,
            isSignedIn: false
         }

      case 'getBook':
         return {
            ...state,
            userBooks: action.payload,
         }
      default:
         return state
   }
}

