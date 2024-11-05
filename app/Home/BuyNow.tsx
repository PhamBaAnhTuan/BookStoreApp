import { Dimensions, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
// import { Picker } from '@react-native-picker/picker';
// Route get params
import { useRoute } from "@react-navigation/native";
// Components
import Header from '../../components/home/Header';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
// Context
import { useAuth } from '../../context/AuthContext';

const BuyNow = ({ navigation }) => {
   // Auth context
  const { useAuthSelector, useThemeSelector } = useAuth();
  // Redux state
  const { isAuthenticated, user, accessToken, books } = useAuthSelector;
  const { theme } = useThemeSelector;
  const color = theme.colors;
   // Route get params
   const route = useRoute();
   // const type = route.params?.type;
   const selectedBook = route.params?.selectedBook;
   // Handle amount
   const [amount, setAmount] = useState(1);
   const Increase = () => setAmount(amount + 1)
   const Decrease = () => setAmount(amount !== 1 ? amount - 1 : amount)
   let totalPrice: number = selectedBook.price * amount;
   // Time
   const [method, setMethod] = useState('');
   // Loading
   const [loading, setLoading] = useState(false);
   // const booking = () => {
   //    setLoading(true);
   //    setTimeout(() => {
   //       type === 'buy'
   //          ? navigation.navigate('BookingDone', { selectedBook: selectedBook, type: 'buy' })
   //          : navigation.navigate('BookingDone', { selectedBook: selectedBook, type: 'gift', name: name })
   //       setLoading(false);
   //    }, 500);
   // };

   // handle input
   const [name, setName] = useState('');
   const textChange = (text: string) => setName(text);
   return (
      <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
         <Header
            onPress={() => navigation.goBack()}
         />

         <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={[styles.itemIn4Container, { backgroundColor: color.surface }]}>
               <Image style={styles.itemImg} source={{ uri: selectedBook.img ? selectedBook.img : 'https://dictionary.cambridge.org/vi/images/thumb/book_noun_001_01679.jpg?version=6.0.31' }} />

               <View style={styles.in4Container}>
                  <Text style={[styles.itemName, { color: color.onSurface }]}>{selectedBook.title}</Text>
                  {/* <Text style={[styles.brandName, { color: 'black' }]}>{selectedBook.brand}</Text> */}

                  <View style={styles.discountContainer}>
                     <View style={styles.discountWrap}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold', color: color.onSurface }}>{selectedBook.discount}% OFF</Text>
                     </View>
                     {selectedBook.is_free ?
                        (<View style={[styles.freeShipWrap, { borderColor: color.success }]}>
                           <Text style={{ fontSize: 10, fontWeight: 'bold', color: color.success }}>FREE SHIP</Text>
                        </View>)

                        : null}
                  </View>

                  <View style={styles.priceContainer}>
                     <Text style={[styles.price, { color: 'tomato' }]}>{selectedBook.price}$</Text>
                     <Text style={[styles.sold, { color: color.onSurface }]}>{selectedBook.rate} </Text>
                     <AntDesign name="star" size={15} color="gold" />
                  </View>

                  <View style={[styles.amountContainer, {borderColor: color.onSurface}]}>
                     <TouchableOpacity style={styles.increaseIcon} onPress={Decrease}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: color.onSurface }}>-</Text>
                     </TouchableOpacity>
                     <Text style={{ color: color.onSurface }}>{amount}</Text>
                     <TouchableOpacity style={styles.increaseIcon} onPress={Increase}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: color.onSurface }}>+</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>

            <View style={[styles.container, { backgroundColor: color.surface }]}>
               <View style={styles.addressContainer}>
                  <Text style={[styles.voucherText, { color: color.onSurface }]}>Full name</Text>
                  <TextInput style={[styles.textInput, {color: color.onSurface}]} onChangeText={textChange} />
               </View>
               <View style={styles.addressContainer}>
                  <Text style={[styles.voucherText, { color: color.onSurface }]}>Address</Text>
                  <TextInput style={[styles.textInput, {color: color.onSurface}]} />
               </View>
               <View style={styles.addressContainer}>
                  <Text style={[styles.voucherText, { color: color.onSurface }]}>Phone number</Text>
                  <TextInput style={[styles.textInput, {color: color.onSurface}]} keyboardType='number-pad' />
               </View>
            </View>

            <View style={[styles.container, { backgroundColor: color.surface  }]}>

               <TouchableOpacity style={styles.voucherContainer}>
                  <Text style={[styles.voucherText, { color: color.onSurface }]} >Discount</Text>

                  <View style={styles.voucherWrap}>
                     <View style={styles.discountWrap}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold', color: color.onSurface }}>{selectedBook.discount}% OFF</Text>
                     </View>
                     {/* <MaterialIcons name="keyboard-arrow-right" size={24} color={'black'} /> */}
                  </View>
               </TouchableOpacity>

               <TouchableOpacity style={styles.voucherContainer}>
                  <Text style={[styles.voucherText, { color: color.onSurface }]} >Free ship</Text>

                  <View style={styles.voucherWrap}>
                     <View style={[styles.freeShipWrap, { borderColor: color.success }]}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold', color: color.success }}>FREE SHIP</Text>
                     </View>
                     {/* <MaterialIcons name="keyboard-arrow-right" size={24} color={'black'} /> */}
                  </View>
               </TouchableOpacity>

               <TouchableOpacity style={styles.voucherContainer}>
                  <Text style={[styles.voucherText, { color: color.onSurface }]} >Rate</Text>

                  <View style={styles.voucherWrap}>
                     <Text style={[styles.text, { color: color.onSurface }]}>{selectedBook.rate} </Text>
                     <AntDesign name="star" size={15} color="gold" />
                  </View>
               </TouchableOpacity>
            </View>

            <View style={[styles.container, { backgroundColor: color.surface  }]}>
               <View style={styles.voucherContainer}>
                  <Text style={[styles.voucherText, { color: color.onSurface }]} >Buy method</Text>
               </View>

               <View style={[styles.picker, {borderColor: color.onSurface}]}>
                  {/* <Picker
                     selectedValue={method}
                     // style={styles.picker}
                     // itemStyle={styles.pickerItem}
                     onValueChange={(itemValue, itemIndex) => setMethod(itemValue)}
                  >
                     <Picker.Item label='Thanh toán khi nhận hàng' value="Thanh toán khi nhận hàng" />
                     <Picker.Item label='Thẻ tín dụng/Ghi nợ' value="Thẻ tín dụng/Ghi nợ" />
                     <Picker.Item label='Google Pay' value="Google Pay" />
                     <Picker.Item label='Zalo Pay' value="Zalo Pay" />
                     <Picker.Item label='Momo' value="Momo" />
                  </Picker> */}
               </View>
            </View>
         </ScrollView>

         <View style={styles.buyBtnContainer}>
            {/* {loading === true ?
                  (<Loading />)
                  : (
                     <>
                        <View style={styles.leftContainer}>
                           <Text style={[styles.price, { color: 'white' }]}>{totalPrice || 0} VND</Text>
                        </View>
                        <TouchableOpacity style={styles.buyBtn} >
                           <Text style={styles.buyText}>Đặt hàng</Text>
                        </TouchableOpacity>
                     </>
                  )
               } */}
            <View style={[styles.leftContainer, { backgroundColor: color.lightOrange }]}>
               <Text style={styles.price}>Total {totalPrice}$</Text>
            </View>
            <TouchableOpacity style={[styles.buyBtn, { backgroundColor: color.orange }]} >
               <Text style={styles.buyText}>Buy</Text>
            </TouchableOpacity>
         </View>

      </SafeAreaView>
   )
}

export default BuyNow

const styles = StyleSheet.create({
   // Item in 4 container
   itemIn4Container: {
      height: 150,
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      // borderRadius: 10,
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginBottom: 5,
      // borderWidth: 1
   },

   // Item container
   itemImg: {
      height: 130,
      width: 100,
      borderRadius: 7,
      resizeMode: 'cover',
      // borderWidth: 1,
   },

   // In4 container
   in4Container: {
      height: '100%',
      width: '60%',
      // borderWidth: 1,
      justifyContent: 'space-around'
   },
   itemName: {
      fontSize: 15,
      fontWeight: 'bold',
   },
   brandName: {
      // height: 15,
      fontSize: 10,
      // fontWeight: 'bold',
      // borderWidth: 1
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
      width: 'auto',
      // borderWidth: 1,
      paddingHorizontal: 5,
      // marginRight: 10,
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
   },
   freeShipWrap: {
      height: 'auto',
      width: 'auto',
      borderWidth: 1,
      paddingHorizontal: 5,
      marginLeft: 10,
      borderColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
   },

   // Price container
   priceContainer: {
      height: 'auto',
      width: '100%',
      // borderWidth: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      // justifyContent: 'space-between'
   },
   price: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white'
   },
   sold: {
      fontSize: 12,
      color: 'black',
      marginLeft: 20
   },

   // Amount container
   amountContainer: {
      height: 'auto',
      width: 70,
      borderWidth: 1,
      borderRadius: 5,
      flexDirection: 'row',
      // alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-around',
   },
   increaseIcon: {
      height: 23,
      width: 23,
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1
   },


   // Payment method container
   picker: {
      height: 40,
      width: '100%',
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 10,
      alignSelf: 'center',
      // alignItems: 'center',
      justifyContent: 'center',
   },
   pickerItem: {
      fontSize: 13,
      fontWeight: 'bold',
      alignItems: 'center',
      // justifyContent: 'center',
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


   // Container
   container: {
      height: 'auto',
      width: '100%',
      alignSelf: 'center',
      // alignItems: 'center',
      // borderRadius: 10,
      backgroundColor: 'white',
      paddingVertical: 15,
      paddingHorizontal: 10,
      marginBottom: 5,
      // borderWidth: 1
   },

   // Addres container
   addressContainer: {
      height: 'auto',
      width: '100%',
      borderRightColor: '#bbe3ff',
      paddingVertical: 5,
      // borderWidth: 1,
   },
   text: {
      fontSize: 12,
      fontWeight: 'bold',
      // borderWidth: 1,
   },
   textInput: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
   },


   // Buy btn container
   buyBtnContainer: {
      height: 60,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1,
   },

   leftContainer: {
      height: '100%',
      width: '40%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      // borderWidth: 1,
      backgroundColor: 'plum'
   },

   // Price
   // price: {
   //    fontSize: 20,
   //    fontWeight: "bold",
   //    color: 'white',
   //    // borderWidth: 1,
   // },

   buyBtn: {
      height: '100%',
      width: '60%',
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1,
      backgroundColor: 'tomato'
   },
   buyText: {
      fontWeight: 'bold',
      color: 'white'
   }
})