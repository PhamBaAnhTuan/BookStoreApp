import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
// Theme context
import { useAuth } from '../../context/AuthContext';

interface Props{
   category: string,
   onPress: any
}

const CategoryCard = (props: Props) => {
   // Context
  const { useThemeSelector } = useAuth();
  // Redux state
  const { theme } = useThemeSelector;
  const color = theme.colors;
   return (
      <TouchableOpacity style={[styles.container, {backgroundColor: color.surface}]} onPress={props.onPress}>
         <Text style={[styles.text, {color: color.onSurface}]}>{props.category}</Text>
      </TouchableOpacity>
   )
}

export default CategoryCard

const styles = StyleSheet.create({
   container: {
      height: 35,
      width: 'auto',
      // borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10
   },

   text:{
      fontSize: 12,
      fontWeight: 'bold',
   }
})