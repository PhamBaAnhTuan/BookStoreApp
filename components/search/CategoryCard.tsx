import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
// Theme context
import { useTheme } from '../../context/ThemeContext';


interface Props{
   category: string,
   onPress: any
}

const CategoryCard = (props: Props) => {
   // Theme
  const { theme } = useTheme();
   return (
      <TouchableOpacity style={[styles.container, {borderColor: theme.text}]} onPress={props.onPress}>
         <Text style={[styles.text, {color: theme.text}]}>{props.category}</Text>
      </TouchableOpacity>
   )
}

export default CategoryCard

const styles = StyleSheet.create({
   container: {
      height: 30,
      width: 'auto',
      borderWidth: 1,
      borderRadius: 5,
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