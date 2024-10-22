import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
// Context
import { useTheme } from '../../context/ThemeContext';
// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

interface Props{
   img: any,
   title: string,
   discount: number,
   is_free: boolean,
   price: number,
   sold: number,
   star: number,
}

const ItemCart = (props: Props) => {
   // Theme
   const { theme } = useTheme();
   const [checked, setChecked] = useState(true);
   const handleCheck = () => setChecked(checked ? false : true);
   // Handle amount
   const [amount, setAmount] = useState(1);
   const Increase = () => setAmount(amount + 1);
   const Decrease = () => setAmount(amount !== 1 ? amount - 1 : amount);
   return (
      <View style={[styles.container, { backgroundColor: theme.white }]}>
         <TouchableOpacity onPress={handleCheck}>
            {checked
            ? <AntDesign name="checkcircleo" size={24} color="black" />
            : <AntDesign name="checkcircle" size={24} color="green" />
            }
         </TouchableOpacity>

         <Image style={styles.img} source={{uri: props.img}} />

         <View style={styles.itemIn4}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>{props.title}</Text>

            <View style={styles.discountContainer}>
               <View style={styles.discountWrap}>
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: 'white' }}>{props.discount}% OFF</Text>
               </View>

               { props.is_free &&
                  <View style={[styles.freeShipWrap, { borderColor: 'green' }]}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'green' }}>FREE SHIP</Text>
               </View>
               }
            </View>

            <View style={styles.priceContainer}>
               <Text style={styles.price}>${props.price}</Text>

               <Text style={[styles.sold, { color: theme.text }]}>{props.sold} sold</Text>

               <View style={styles.starContainer}>
                  <Text style={[styles.sold, { color: theme.text }]}>{props.star ? props.star : '5.0'} </Text>
                  <AntDesign name="star" size={17} color="gold" />
               </View>
            </View>

            <View style={styles.amountContainer}>
               <TouchableOpacity style={styles.icon} onPress={Decrease}>
                  <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>-</Text>
               </TouchableOpacity>
               <Text style={{paddingHorizontal: 5, color: 'black'}}>{amount}</Text>
               <TouchableOpacity style={styles.icon} onPress={Increase}>
                  <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>+</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   )
}

export default ItemCart

const styles = StyleSheet.create({
   container: {
      height: 120,
      width: '98%',
      // borderWidth: 1,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginVertical: 3
   },

   checkboxImg: {
      height: 35,
      width: 35,
      // marginHorizontal: 5
   },

   img: {
      height: '90%',
      width: '27%',
      resizeMode: 'cover',
      borderRadius: 7
   },


   // Item container
   itemIn4: {
      height: '100%',
      width: '50%',
      // borderWidth: 1,
      justifyContent: 'space-evenly'
   },

   // Discount container
   discountContainer: {
      height: 'auto',
      width: '100%',
      // borderWidth: 1,
      flexDirection: 'row',
   },
   discountWrap: {
      height: 'auto',
      width: 'auto',
      // borderWidth: 1,
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
      paddingHorizontal: 5
   },
   freeShipWrap: {
      height: 'auto',
      width: 'auto',
      borderWidth: 1,
      paddingHorizontal: 5,
      borderColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
   },


   priceContainer: {
      height: 'auto',
      width: '75%',
      // borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // paddingRight: 20
   },

   price:{
      fontSize: 17,
      color: 'tomato',
      fontWeight: 'bold',
   },
   sold:{
      fontSize: 11,
      color: 'black'
   },
   // Star container
   starContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   starIcon:{
      height: 15,
      width: 15
   },


   // Amount container
   amountContainer:{
      height: 'auto',
      width: 'auto',
      borderWidth: 1,
      borderRadius: 3,
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-around',
      // paddingHorizontal: 3,
   },
   icon:{
      height: 'auto',
      width: 25,
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1
   }
})