
const initialState = {
   theme: {}
}
export const themeReducer = (state = initialState, action: any) => {
   switch (action.type) {
      case 'SET_THEME':
         return {
            // ...state,
            theme: action.payload === 'light' ? {
               mode: 'light',
               colors: {
                  primary: '#ff7233', // A vibrant orange
                  secondary: '#ffa831', // A warmer yellow-orange
                  background: '#ffffff', // Light background
                  text: '#000000', // Dark text for readability
                  surface: '#f0f0f0', // Light gray surface
                  error: '#d32f2f', // Muted red for errors
                  success: '#388e3c', // Muted green for success
                  warning: '#fbc02d', // Brighter yellow for warnings
                  info: '#1976d2', // A calmer blue for information
                  disabled: '#e0e0e0', // Light gray for disabled state
                  divider: '#bdbdbd', // A soft gray divider
                  onSurface: '#000000', // Dark text on light surfaces
                  onBackground: '#000000', // Dark text on light background
                  onText: '#ffffff', // White text on colored buttons (primary/secondary)
                  onPrimary: '#ffffff', // White text on primary button
                  onSecondary: '#ffffff', // White text on secondary button
               }
            }
               : {
                  mode: 'dark',
                  colors: {
                     primary: '#ff7233', // Same vibrant orange to contrast with dark background
                     secondary: '#ffa831', // Warm yellow-orange for contrast
                     background: '#101010', // Dark background
                     text: '#ffffff', // Light text for readability on dark background
                     surface: '#333333', // Dark surface
                     error: '#ff5252', // Bright red for errors (stronger contrast)
                     success: '#4caf50', // Brighter green for success
                     warning: '#ffeb3b', // Brighter yellow for warnings
                     info: '#64b5f6', // Light blue for information
                     disabled: '#757575', // Darker gray for disabled state
                     divider: '#424242', // Darker gray divider
                     onSurface: '#ffffff', // White text on dark surfaces
                     onBackground: '#ffffff', // White text on dark background
                     onText: '#000000', // Black text on lighter buttons (primary/secondary)
                     onPrimary: '#000000', // Dark text on bright primary button
                     onSecondary: '#000000', // Dark text on bright secondary button
                  }
               }
         }
      default:
         return state
   }
}
