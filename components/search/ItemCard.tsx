import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
// Context
import { useTheme } from '../../context/ThemeContext';


interface Props{
   itemImg: any,
   itemName: string,
}

const ItemCard = (props: Props) => {
   // Theme
   const { theme } = useTheme();
   return (
      <TouchableOpacity style={[styles.container, {backgroundColor: theme.gray}]}>
         {/* <View style={{borderWidth: 1}}> */}
         <Image style={styles.itemImg} source={props.itemImg} />
         {/* </View> */}

         <View style={styles.in4Container}>
            <Text style={[styles.itemName, { color: theme.text }]}>{props.itemName}</Text>
         </View>
      </TouchableOpacity>
   )
}

export default ItemCard

const styles = StyleSheet.create({
   container: {
      height: 200,
      width: '48%',
      // borderWidth: 0.1,
      borderRadius: 10,
      // backgroundColor: '#F1F1F1',
      backgroundColor: 'gray',
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      // shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
   },

   itemImg: {
      height: 150,
      maxWidth: '90%',
      resizeMode: 'contain',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      // borderWidth: 1,
      alignSelf: 'center',
      // marginTop: 5
   },


   // In4 container
   in4Container: {
      height: 'auto',
      width: '90%',
      // borderWidth: 1,
      alignSelf: 'center',
      alignItems: 'center',
      marginTop: 5
   },

   itemName: {
      fontSize: 13,
      fontWeight: 'bold',
      paddingVertical: 5,
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