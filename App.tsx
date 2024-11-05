
import React from 'react';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Context
import { ThemeContextProvider } from './context/ThemeContext';
// Components
import SignIn from './app/SignIn';
import SignUp from './app/SignUp';
import Home from './app/TabNavigator/Home';
import TabNavigator from './app/TabNavigator/TabNavigator';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <ThemeContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='SignIn'>
          <Stack.Screen name='TabNavigator' component={TabNavigator}/>
          <Stack.Screen name='SignIn' component={SignIn}/>
          <Stack.Screen name='SignUp' component={SignUp}/>
          <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContextProvider>
  );
}
export default App;
