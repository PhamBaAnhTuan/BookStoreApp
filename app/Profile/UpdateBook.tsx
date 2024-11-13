import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// Context
import { useAuth } from '../../context/AuthContext';
// Actions
import { updateBookAction } from '../redux/reducer/authActions';
// Components
import AddButton from '../../components/profile/AddButton';
import Header from '../../components/home/Header';
import Input from '../../components/form/Input';
import FreeShipForm from '../../components/form/FreeShipForm';


const UpdateBook = ({ navigation }) => {
   // Route
   const route = useRoute();
   const selectedBook = route.params?.selectedBook;
   // Context
   const { dispatch, useThemeSelector, useAuthSelector, data, setData, resetForm } = useAuth();
   // Redux state
   const { theme } = useThemeSelector;
   const color = theme.colors;
   const { accessToken, books } = useAuthSelector;

   useEffect(() => {
      if (selectedBook) {
         setData({
            title: selectedBook?.title,
            author: selectedBook?.author,
            img: selectedBook?.img,
            price: selectedBook.price ? selectedBook.price.toString() : '',
            category: selectedBook?.category,
            discount: selectedBook.discount ? selectedBook.discount.toString() : '',
            free_ship: selectedBook?.free_ship,
            description: selectedBook?.description
         })
      }
   }, [selectedBook]);

   // Handle update book
   const handleUpdateBook = () => {
      dispatch(updateBookAction(selectedBook.id, data, accessToken, resetForm));
      navigation.goBack();
   }

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.background }}>
         <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

            <Header
               onPress={() => navigation.goBack(resetForm())}
            />

            <View style={[styles.formUpdateBook, { backgroundColor: color.surface }]}>
            <Text style={[styles.title, { color: color.onSurface }]}>Update Book</Text>
               <Input
                  title='Title:'
                  placeholder='book title'
                  required={true}
                  onChangeText={(value: any) => setData({ ...data, title: value })}
                  value={data.title}
                  keyboardType={'default'}
               />

               <Input
                  title='Author:'
                  placeholder='author name'
                  required={true}
                  onChangeText={(value: any) => setData({ ...data, author: value })}
                  value={data.author}
                  keyboardType={'default'}
               />
               <Input
                  title='Books image:'
                  placeholder='url'
                  required={false}
                  onChangeText={(value: any) => setData({ ...data, img: value })}
                  value={data.img}
                  keyboardType={'default'}
               />
               <Input
                  title='Price:'
                  placeholder='vnd'
                  required={true}
                  onChangeText={(value: any) => setData({ ...data, price: value })}
                  value={data.price}
                  keyboardType={'number-pad'}
               />
               <Input
                  title='Discount:'
                  placeholder='History...'
                  required={false}
                  onChangeText={(value: any) => setData({ ...data, discount: value })}
                  value={data.discount}
                  keyboardType={'number-pad'}
               />
               <Input
                  title='Description:'
                  placeholder=''
                  required={false}
                  onChangeText={(value: any) => setData({ ...data, description: value })}
                  value={data.description}
                  keyboardType={'default'}
               />
               <FreeShipForm
                  free_ship={data.free_ship}
                  freeShip={() => setData({ ...data, free_ship: true })}
                  notFreeShip={() => setData({ ...data, free_ship: false })}
               />

               <AddButton
                  onPress={handleUpdateBook}
                  title='Update'
                  color={color.success}
               />
            </View>

         </ScrollView>
      </SafeAreaView>
   )
}

export default UpdateBook

const styles = StyleSheet.create({
   title: {
      fontSize: 27,
      fontWeight: 'bold',
      textAlign: 'center',
      // paddingTop: 20,
      paddingBottom: 5,
   },


   // Form container
   formUpdateBook: {
      height: 'auto',
      width: '97%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 30,
      marginTop: 10,
      borderRadius: 10
   },

   inputWrap: {
      height: 'auto',
      width: '95%',
      marginBottom: 10,
      // borderWidth: 1,
   },
   titleText: {
      fontSize: 15,
      fontWeight: 'bold',
   },
   textInput: {
      width: '100%',
      height: 'auto',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      // borderWidth: 1,
      alignSelf: 'center',
   },

   freeBtn: {
      borderRadius: 10,
      backgroundColor: 'green',
      paddingHorizontal: 20,
      paddingVertical: 5,
      marginLeft: 15
   }
})