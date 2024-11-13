import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Context
import { useAuth } from '../../context/AuthContext';


interface Props {
   free_ship: boolean,
   freeShip: any,
   notFreeShip: any,
}

const FreeShipForm = (props: Props) => {
   // Context
   const { useThemeSelector } = useAuth();
   const { theme } = useThemeSelector;
   const color = theme.colors;

   return (
      <View style={styles.inputWrap}>
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.titleText, { color: color.onSurface }]}>Free ship:</Text>

            <TouchableOpacity style={[styles.freeBtn, props.free_ship ? { backgroundColor: 'green' } : { backgroundColor: 'lightgray' }]}
               onPress={props.freeShip}>
               <Text style={{ color: color.onSurface, fontWeight: 'bold' }}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.freeBtn, props.free_ship ? { backgroundColor: 'lightgray' } : { backgroundColor: 'tomato' }]}
               onPress={props.notFreeShip}>
               <Text style={{ color: color.onSurface, fontWeight: 'bold' }}>No</Text>
            </TouchableOpacity>
         </View>
      </View>
   )
}

export default FreeShipForm

const styles = StyleSheet.create({
   inputWrap: {
      height: 'auto',
      width: '90%',
      marginBottom: 10,
   },
   titleText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black'
   },

   freeBtn: {
      borderRadius: 10,
      backgroundColor: 'green',
      paddingHorizontal: 20,
      paddingVertical: 5,
      marginLeft: 15
   }
})