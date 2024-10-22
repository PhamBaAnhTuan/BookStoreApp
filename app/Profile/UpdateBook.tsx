import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// Context
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
// Components
import AddButton from '../../components/profile/AddButton';
import Header from '../../components/home/Header';

const UpdateBook = ({ navigation }) => {
   // Route
   const route = useRoute();
   const selectedBook = route.params?.selectedBook;
   // Theme
   const { theme } = useTheme();
   // Add book
   const { data, setData, updateBookMethod } = useData();

   useEffect(() => {
      if (selectedBook) {
         setData({
            title: selectedBook.title,
            author: selectedBook.author,
            img: selectedBook.img,
            price: selectedBook.price ? selectedBook.price.toString() : '',
            type: selectedBook.type,
            discount: selectedBook.discount  ? selectedBook.discount.toString() : '',
            is_free: selectedBook.is_free,
            description: selectedBook.description,
         })
      }
   }, [selectedBook]);

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bgc }}>
         <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

            <Header
               onPress={() => navigation.goBack()}
            />

            <View style={styles.formUpdateBook}>
               <Text style={styles.title}>Update Book</Text>
               <View style={styles.inputWrap}>
                  <Text style={styles.titleText}>Title:</Text>
                  <TextInput style={[styles.textInput, {color: 'black'}]} placeholder="Enter book title"
                     onChangeText={(value) => setData({ ...data, title: value })}
                     value={data.title}
                  />
               </View>

               <View style={styles.inputWrap}>
                  <Text style={styles.titleText}>Author:</Text>
                  <TextInput style={[styles.textInput, {color: 'black'}]} placeholder="Enter author's name"
                     onChangeText={(value) => setData({ ...data, author: value })}
                     value={data.author}
                  />
               </View>

               <View style={styles.inputWrap}>
                  <Text style={styles.titleText}>Image book:</Text>
                  <TextInput style={[styles.textInput, {color: 'black'}]} placeholder="Image Url"
                     onChangeText={(value) => setData({ ...data, img: value })}
                     value={data.img}
                     keyboardType='url'
                  />
               </View>

               <View style={styles.inputWrap}>
                  <Text style={styles.titleText}>Price:</Text>
                  <TextInput style={[styles.textInput, {color: 'black'}]} placeholder="$" keyboardType='number-pad'
                     onChangeText={(value) => setData({ ...data, price: value })}
                     value={data.price}
                  />
               </View>

               <View style={styles.inputWrap}>
                  <Text style={styles.titleText}>Type:</Text>
                  <TextInput style={[styles.textInput, {color: 'black'}]} placeholder="Life, Self develop..."
                     onChangeText={(value) => setData({ ...data, type: value })}
                     value={data.type}
                  />
               </View>

               <View style={styles.inputWrap}>
                  <Text style={styles.titleText}>Discount:</Text>
                  <TextInput style={[styles.textInput, {color: 'black'}]} placeholder="Number" keyboardType='number-pad'
                     onChangeText={(value) => setData({ ...data, discount: value })}
                     value={data.discount}
                  />
               </View>

               <View style={styles.inputWrap}>
                  <Text style={styles.titleText}>Description:</Text>
                  <TextInput style={[styles.textInput, {color: 'black'}]} placeholder="Enter description"
                     onChangeText={(value) => setData({ ...data, description: value })}
                     value={data.description}
                     multiline={true}
                  />
               </View>

               <View style={styles.inputWrap}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <Text style={styles.titleText}>Free ship:</Text>

                     <TouchableOpacity style={[styles.freeBtn, data.is_free ? { backgroundColor: 'green' } : { backgroundColor: 'lightgray' }]}
                        onPress={() => setData({ ...data, is_free: true })}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes</Text>
                     </TouchableOpacity>

                     <TouchableOpacity style={[styles.freeBtn, data.is_free ? { backgroundColor: 'lightgray' } : { backgroundColor: 'tomato' }]}
                        onPress={() => setData({ ...data, is_free: false })}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>No</Text>
                     </TouchableOpacity>
                  </View>
               </View>

               <AddButton
                  onPress={() => updateBookMethod(selectedBook.id) ? navigation.goBack(): undefined}
                  title='Update'
                  color='green'
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
      color: 'black',
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
      color: 'black'
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