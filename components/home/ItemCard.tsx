import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
// Context
import { useTheme } from '../../context/ThemeContext';


interface Props{
   itemImg: any,
   itemName: string,
   discount: number,
   price: number,
   sold: number
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

            <View style={styles.discountContainer}>
               <View style={styles.discountWrap}>
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: theme.text }}>{props.discount}% off</Text>
               </View>

               <View style={[styles.freeShipWrap, {borderColor: theme.green}]}>
                  <Text style={{ fontSize: 11, fontWeight: '400', color: theme.green }}>Free ship</Text>
               </View>
            </View>

            <View style={styles.priceContainer}>
               <Text style={styles.price}>${props.price}</Text>
               <Text style={[styles.sold, {color: theme.text}]}>{props.sold} sold</Text>
            </View>
         </View>
      </TouchableOpacity>
   )
}

export default ItemCard

const styles = StyleSheet.create({
   container: {
      height: 230,
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
      alignSelf: 'center'
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

   discountWrap: {
      height: 'auto',
      width: 40,
      // borderWidth: 1,
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10
   },

   freeShipWrap: {
      height: 'auto',
      width: 70,
      borderWidth: 1,
      borderColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
   },


   // Price container
   priceContainer: {
      height: 'auto',
      width: '100%',
      // borderWidth: 1,
      marginTop: 5,
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between'
   },

   price:{
      fontSize: 15,
      color: 'tomato',
      fontWeight: '500'
   },
   sold:{
      fontSize: 11,
      color: 'black'
   }
})