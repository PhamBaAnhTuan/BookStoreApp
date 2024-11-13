import { Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react';
// Route to params
import { useRoute } from '@react-navigation/native';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
// Context
import { useAuth } from '../../context/AuthContext';
// Action
import { addToCartAction } from '../redux/reducer/authActions';

const BookDetail = ({ navigation }) => {
   // Auth context
   const { useAuthSelector, useThemeSelector, dispatch } = useAuth();
   // Redux state
   const { isAuthenticated, user, accessToken, books, cart } = useAuthSelector;
   const { theme } = useThemeSelector;
   const color = theme.colors;
   // Route get params
   const route = useRoute();
   const selectedBook = route.params?.selectedBook;
   // Handle follow
   const [follow, setFollow] = useState('Follow');
   const handleFollow = () => {
      follow === 'Follow'
         ? (setFollow('Following'), ToastAndroid.show('Following', ToastAndroid.SHORT))
         : (setFollow('Follow'), ToastAndroid.show('UnFollow', ToastAndroid.SHORT));
   }
   const addToCart = () => {
      dispatch(addToCartAction(selectedBook));
   }
   const log = () => {
      console.log('cart: ', cart.map(item => item.title));
   }
   return (
      <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
         <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backIcon, { backgroundColor: color.surface }]}>
               <Ionicons name="arrow-back" size={21} color={color.onSurface} />
            </TouchableOpacity>

            <View style={styles.imgContainer}>
               <Image style={styles.itemImg} source={{ uri: selectedBook.img ? selectedBook.img : 'https://dictionary.cambridge.org/vi/images/thumb/book_noun_001_01679.jpg?version=6.0.31' }} />
            </View>

            <View style={[styles.in4Container, { backgroundColor: color.surface }]}>
               <View style={styles.voucherContainer}>
                  <Text style={[styles.itemName, { color: color.onSurface }]}>{selectedBook.title}</Text>
               </View>
            </View>

            <View style={[styles.in4Container, { backgroundColor: color.surface }]}>
               <View style={styles.voucherContainer}>
                  <Text style={styles.price}>{selectedBook.price}$</Text>
                  <Text style={[styles.text, { color: color.onSurface, paddingRight: 5 }]}>{selectedBook.rate} Star</Text>
               </View>

               <TouchableOpacity style={styles.brandContainer}>
                  <TouchableOpacity >
                     <Text style={[styles.brandName, { color: color.onSurface }]} >
                        {/* {selectedBook.brand} */}
                        {selectedBook.author}
                     </Text >
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.flBtn, { borderColor: color.onSurface }]} onPress={handleFollow} >
                     <Text style={{ color: color.onSurface, fontSize: 11 }} >{follow}</Text>
                  </TouchableOpacity>
               </TouchableOpacity>

               <TouchableOpacity style={styles.voucherContainer}>
                  <Text style={[styles.voucherText, { color: color.onSurface }]} >Type</Text>

                  <View style={styles.voucherWrap}>
                     <Text style={[styles.text, { color: color.onSurface }]}>{selectedBook.type}</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity style={styles.voucherContainer}>
                  <Text style={[styles.voucherText, { color: color.onSurface }]} >Discount</Text>

                  <View style={styles.voucherWrap}>
                     <View style={styles.discountWrap}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', color: color.onSurface }}>{selectedBook.discount}% OFF</Text>
                     </View>
                     {/* <MaterialIcons name="keyboard-arrow-right" size={24} color={'black'} /> */}
                  </View>
               </TouchableOpacity>

               <TouchableOpacity style={styles.voucherContainer}>
                  <Text style={[styles.voucherText, { color: color.onSurface }]} >Free ship</Text>

                  <View style={styles.voucherWrap}>
                     <View style={[styles.freeShipWrap, { borderColor: color.success }]}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', color: color.success }}>FREE SHIP</Text>
                     </View>
                     {/* <MaterialIcons name="keyboard-arrow-right" size={24} color={'black'} /> */}
                  </View>
               </TouchableOpacity>

               <TouchableOpacity style={styles.voucherContainer}>
                  <Text style={[styles.voucherText, { color: color.onSurface }]} >Rate</Text>

                  <View style={styles.voucherWrap}>
                     <Text style={[styles.text, { color: color.onSurface }]}>{selectedBook.rate} </Text>
                     <AntDesign name="star" size={17} color="gold" />
                  </View>
               </TouchableOpacity>

            </View>

            <View style={[styles.in4Container, { backgroundColor: color.surface }]}>
               <View style={styles.voucherContainer}>
                  <Text style={[styles.voucherText, { color: color.onSurface }]} >Description</Text>
               </View>

               <Text style={{ textAlign: 'justify', color: color.onSurface }}>{selectedBook.description}</Text>
            </View>
         </ScrollView>

         <View style={styles.buyBtnContainer}>
            <View style={[styles.leftContainer, { backgroundColor: color.secondary }]}>
               <TouchableOpacity
                  style={[styles.giftIcon, { borderColor: color.divider }]}
                  onPress={log}
               >
                  <Ionicons name="gift-outline" size={25} color='white' />
               </TouchableOpacity>

               <TouchableOpacity style={[styles.cartIcon, { borderColor: color.divider }]} onPress={addToCart} >
                  <Ionicons name="bag-add-outline" size={25} color="white" />
               </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.buyBtn, { backgroundColor: color.primary }]} onPress={() => navigation.navigate('BuyNow', { selectedBook: selectedBook })}>
               <Text style={styles.buyText}>Buy now</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   )
}

export default BookDetail

const styles = StyleSheet.create({
   // Header
   header: {
      height: 50,
      width: '100%',
      // borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      // borderWidth: 1,
   },
   backIcon: {
      height: 'auto',
      width: 'auto',
      padding: 3,
      borderRadius: 50,
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 1
   },
   menuIcon: {
      height: 'auto',
      width: 'auto',
      padding: 3,
      borderRadius: 50,
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1
   },


   imgContainer: {
      height: 470,
      width: '100%',
      // borderWidth: 1,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
   },

   itemImg: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
      // borderBottomLeftRadius: 10,
      // borderBottomRightRadius: 10,
   },


   // In4 container
   in4Container: {
      height: 'auto',
      width: '100%',
      // borderWidth: 1,
      // borderRadius: 10,
      alignSelf: 'center',
      // backgroundColor: 'gray',
      marginTop: 5,
      paddingHorizontal: 7,
      paddingVertical: 7
   },

   itemName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      // borderWidth: 1,
   },


   // Brand container
   brandContainer: {
      height: 30,
      width: '100%',
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "space-between",
   },
   brandName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
   },
   flBtn: {
      height: 25,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'white',
      // marginLeft: 20,
   },

   // Price container
   price: {
      fontSize: 20,
      fontWeight: "bold",
      color: 'tomato',
      // borderWidth: 1,
   },
   text: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'white',
      // paddingRight: 5
   },

   // Voucher container
   voucherContainer: {
      height: 'auto',
      width: '100%',
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
      // borderWidth: 1,
      paddingVertical: 10
   },
   voucherText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white'
   },

   voucherWrap: {
      width: 'auto',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // borderWidth: 1
   },

   discountWrap: {
      height: 'auto',
      width: 'auto',
      // borderWidth: 1,
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5
   },

   freeShipWrap: {
      height: 'auto',
      width: 'auto',
      paddingHorizontal: 5,
      borderWidth: 1,
      borderColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
   },


   // Buy btn container
   buyBtnContainer: {
      height: 60,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // marginBottom: 10,
      // borderWidth: 1,
   },

   leftContainer: {
      height: '100%',
      width: '50%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      // borderWidth: 1,
      backgroundColor: '#F1B720'
   },

   // Icon
   giftIcon: {
      height: '80%',
      width: '50%',
      borderRightWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   cartIcon: {
      height: '80%',
      width: '50%',
      borderLeftWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },


   buyBtn: {
      height: '100%',
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1,
   },
   buyText: {
      fontWeight: 'bold',
      color: 'white'
   }
})