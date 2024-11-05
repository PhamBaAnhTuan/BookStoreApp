import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
// Context
import { useTheme } from '../../context/ThemeContext';

interface Props {
   icon: any,
   typeName: string,
   onPress: any
}
const TypeCard = (props: Props) => {
   // Theme
   const {theme} = useTheme();
   return (
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
         <View style={styles.imgContainer}>
            <Image style={styles.icon} source={props.icon}/>
         </View>
         <Text style={[styles.text, {color: theme.text}]}>{props.typeName}</Text>
      </TouchableOpacity>
   )
}

export default TypeCard

const styles = StyleSheet.create({
   container:{
      height: 'auto',
      width: 60,
      // borderWidth: 1,
      alignItems: 'center',
      marginHorizontal: 6,
      // marginTop: 10
   },

   imgContainer:{
      height: 50,
      width: 50,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: 'gray',
      alignItems: 'center',
      justifyContent: 'center'
   },

   icon:{
      height: 40,
      width: 40,
      resizeMode: 'cover'
   },

   text:{
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black'
   }
})