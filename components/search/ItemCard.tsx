import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
// Context
import { useAuth } from '../../context/AuthContext';


interface Props {
   onPress: any,
   itemImg: any,
   itemName: string,
}

const ItemCard = (props: Props) => {
   // Context
  const { useThemeSelector } = useAuth();
  // Redux state
  const { theme } = useThemeSelector;
  const color = theme.colors;
   return (
      <TouchableOpacity style={[styles.container, { backgroundColor: color.surface }]} onPress={props.onPress}>
         <Image style={styles.itemImg} source={{ uri: props.itemImg }} />

         <View style={styles.in4Container}>
            <Text style={[styles.itemName, { color: color.text }]}>{props.itemName}</Text>
         </View>
      </TouchableOpacity>
   )
}

export default ItemCard

const styles = StyleSheet.create({
   container: {
      height: 'auto',
      width: '48%',
      // borderWidth: 0.1,
      borderRadius: 10,
      // backgroundColor: '#F1F1F1',
      backgroundColor: 'gray',
      marginBottom: 10,
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
   },

   itemImg: {
      height: 200,
      width: '97%',
      resizeMode: 'cover',
      borderRadius: 10,
      // borderWidth: 1,
      alignSelf: 'center',
      // marginTop: 5
   },


   // In4 container
   in4Container: {
      height: 'auto',
      width: '100%',
      // borderWidth: 1,
      alignSelf: 'center',
      alignItems: 'center',
      paddingTop: 3
   },

   itemName: {
      fontSize: 13,
      fontWeight: 'bold',
   },


   // Discount container
   discountContainer: {
      height: 'auto',
      width: '100%',
      // borderWidth: 1,
      alignSelf: 'center',
      flexDirection: 'row',
      // justifyContent: 'space-between'
   },
})