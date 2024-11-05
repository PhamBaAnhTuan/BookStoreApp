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
               <View style={styles.inputWrap}>
                  <Text style={[styles.titleText, { color: color.onSurface }]}>Title:</Text>
                  <TextInput style={[styles.textInput, { color: color.text }]} placeholder="Enter book title" placeholderTextColor={color.gray}
                     onChangeText={(value) => setData({ ...data, title: value })}
                     value={data.title}
                  />
               </View>

               <View style={styles.inputWrap}>
                  <Text style={[styles.titleText, { color: color.onSurface }]}>Author:</Text>
                  <TextInput style={[styles.textInput, { color: color.text }]} placeholder="Enter author's name" placeholderTextColor={color.gray}
                     onChangeText={(value) => setData({ ...data, author: value })}
                     value={data.author}
                  />
               </View>

               <View style={styles.inputWrap}>
                  <Text style={[styles.titleText, { color: color.onSurface }]}>Image book:</Text>
                  <TextInput style={[styles.textInput, { color: color.text }]} placeholder="Image Url" placeholderTextColor={color.gray}
                     onChangeText={(value) => setData({ ...data, img: value })}
                     value={data.img}
                     keyboardType='url'
                  />
               </View>

               <View style={styles.inputWrap}>
                  <Text style={[styles.titleText, { color: color.onSurface }]}>Price:</Text>
                  <TextInput style={[styles.textInput, { color: color.text }]} placeholder="$" keyboardType='number-pad' placeholderTextColor={color.gray}
                     onChangeText={(value) => setData({ ...data, price: value })}
                     value={data.price}
                  />
               </View>

               {/* <View style={styles.inputWrap}>
                  <Text style={[styles.titleText, { color: color.onSurface }]}>Type:</Text>
                  <TextInput style={[styles.textInput, { color: color.text }]} placeholder="Mental, math..." placeholderTextColor={color.gray}
                     onChangeText={(value) => setData({ ...data, category: value })}
                     value={data.category}
                  />
               </View> */}

               <View style={styles.inputWrap}>
                  <Text style={[styles.titleText, { color: color.onSurface }]}>Discount:</Text>
                  <TextInput style={[styles.textInput, { color: color.text }]} placeholder="Number" keyboardType='number-pad' placeholderTextColor={color.gray}
                     onChangeText={(value) => setData({ ...data, discount: value })}
                     value={data.discount}
                  />
               </View>

               <View style={styles.inputWrap}>
                  <Text style={[styles.titleText, { color: color.onSurface }]}>Description:</Text>
                  <TextInput style={[styles.textInput, { color: color.text }]} placeholder="Enter description" placeholderTextColor={color.gray}
                     onChangeText={(value) => setData({ ...data, description: value })}
                     value={data.description}
                     multiline={true}
                  />
               </View>

               <View style={styles.inputWrap}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <Text style={[styles.titleText, { color: color.onSurface }]}>Free ship:</Text>

                     <TouchableOpacity style={[styles.freeBtn, data.free_ship ? { backgroundColor: color.success } : { backgroundColor: color.gray }]}
                        onPress={() => setData({ ...data, free_ship: true })}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes</Text>
                     </TouchableOpacity>

                     <TouchableOpacity style={[styles.freeBtn, data.free_ship ? { backgroundColor: color.gray } : { backgroundColor: color.error }]}
                        onPress={() => setData({ ...data, free_ship: false })}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>No</Text>
                     </TouchableOpacity>
                  </View>
               </View>

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
      width: '100%',
      backgroundColor: 'white',
      // borderWidth: 1,
      // borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      marginTop: 10
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