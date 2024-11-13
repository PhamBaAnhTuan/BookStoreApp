import { Alert, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react';
// Context
import { useAuth } from '../../context/AuthContext';

interface Props {
   onPress: any,
   title: string,
   remove: any
}
const ListBook = (props: Props) => {
   // Context
   const { useThemeSelector } = useAuth();
   // Redux state
   const {theme} = useThemeSelector;
   const color = theme.colors;
   
   return (
      <View style={styles.container}>
         <TouchableOpacity style={styles.wrapLeft} onPress={props.onPress}>
            <Text style={[styles.title, {color: color.onSurface}]}>{props.title}</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.wrapRight} onPress={props.remove}>
            <Text style={styles.text}>Remove</Text>
         </TouchableOpacity>
      </View>
   )
}

export default ListBook

const styles = StyleSheet.create({
   container: {
      height: 55,
      width: '95%',
      borderBottomWidth: 0.5,
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
   },

   wrapLeft: {
      height: '100%',
      width: '80%',
      justifyContent: 'center',
      // borderWidth: 1
   },
   title: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black'
   },

   wrapRight: {
      height: '100%',
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1
   },
   text: {
      fontSize: 13,
      fontWeight: '600',
      color: 'red'
   },
})