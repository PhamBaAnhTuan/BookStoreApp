import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// Context
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
// Components
import AddButton from '../../components/profile/AddButton';
import Header from '../../components/home/Header';

const AddBook = ({ navigation }) => {
   // Theme
   const { theme } = useTheme();
   // Add book
   const { data, setData, addBookMethod } = useData();
   const handelAdd = () => {
      if (!data.title || !data.author || !data.price || !data.type) {
         return Alert.alert("Lack of information!", "Please fill all this fields!")
      }
      addBookMethod();
      navigation.goBack();
   }

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bgc }}>
         <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

            <Header
               onPress={() => navigation.goBack()}
            />

            <View style={styles.formAddBook}>
               <Text style={styles.title}>Add New Book</Text>
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
                     // onChange={handlePriceChange}
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
                  onPress={handelAdd}
                  title='Add'
                  color='green'
               />
            </View>

         </ScrollView>
      </SafeAreaView>
   )
}

export default AddBook

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
   formAddBook: {
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
      width: '90%',
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