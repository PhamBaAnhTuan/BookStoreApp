import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
// Context
import { useAuth } from '../../context/AuthContext';

interface Props {
   icon: any,
   typeName: string,
   onPress: any
}
const TypeCard = (props: Props) => {
   // Context
   const { useThemeSelector } = useAuth();
   // Redux state
   const { theme } = useThemeSelector;
   const color = theme.colors;
   return (
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
         <View style={[styles.imgContainer, {backgroundColor: color.surface}]}>
            <Image style={styles.icon} source={{uri: props.icon}}/>
         </View>
         <Text style={[styles.text, {color: color.text}]}>{props.typeName}</Text>
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
      marginHorizontal: 5,
   },

   imgContainer:{
      height: 60,
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
   },

   icon:{
      height: 50,
      width: 50,
      borderRadius: 10,
      resizeMode: 'cover',
   },

   text:{
      width: '100%',
      fontSize: 12,
      fontWeight: '600',
      color: 'black',
      textAlign: 'center',
      // borderWidth: 1
   }
})