const initialState = {
   isAuthenticated: false,
   user: null,
   accessToken: null,
   books: [],
   signedUpDone: false
}
export const authReducer = (state = initialState, action: any) => {

   switch (action.type) {
      case 'SIGN_IN':
         return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user_data,
            accessToken: action.payload.access_token,
         }

      case 'SIGN_UP':
         return {
            ...state,
            signedUpDone: action.payload
         }
      case 'SIGN_OUT':
         return {
            ...state,
            isAuthenticated: action.payload,
            user: null,
            accessToken: null
         }
      case 'GET_USER_PROFILE':
         return {
            ...state,
            user: { ...state.user, ...action.payload }
         }
      case 'UPDATE_USER_PROFILE':
         return {
            ...state,
            user: { ...state.user, ...action.payload }
         }
      case 'GET_BOOKS':
         return {
            ...state,
            books: action.payload,
         }
      case 'ADD_BOOK':
         return {
            ...state,
            books: [...state.books, action.payload]
         }
      case 'UPDATE_BOOK':
         return {
            ...state,
            books: state.books.map(book =>
               book.id === action.payload.id ? action.payload : book
            ),
         }
      case 'DELETE_BOOK':
         return {
            ...state,
            books: state.books.filter(book => book.id !== action.payload)
         }
      case 'UPDATE_USER':
         return {
            ...state,
            user: action.payload
         }
      default:
         return state
   }
}
