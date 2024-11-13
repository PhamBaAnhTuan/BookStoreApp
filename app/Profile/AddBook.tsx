import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// Context
import { useAuth } from '../../context/AuthContext';
// Action
import { addBookAction } from '../redux/reducer/authActions';
// Components
import AddButton from '../../components/profile/AddButton';
import Header from '../../components/home/Header';
import Input from '../../components/form/Input';
import FreeShipForm from '../../components/form/FreeShipForm';

const AddBook = ({ navigation }) => {
   // Redux auth
   const { dispatch, useAuthSelector, useThemeSelector, data, setData, resetForm } = useAuth();
   // Redux theme
   const { isAuthenticated, accessToken, user, books } = useAuthSelector;
   const { theme } = useThemeSelector;
   const color = theme.colors;
   // Handle add book
   const handelAdd = () => {
      if (!data.title || !data.author || !data.price) {
         return Alert.alert("Lack of information!", "Please fill all this fields!")
      }
      dispatch(addBookAction(data, accessToken, resetForm));
      navigation.goBack();
      console.log(data)
   }

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.background }}>
         <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

            <Header
               onPress={() => navigation.goBack(resetForm())}
            />

            <View style={[styles.formAddBook, { backgroundColor: color.surface }]}>
               <Text style={[styles.title, { color: color.onSurface }]}>Add New Book</Text>

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
   // Form container
   formAddBook: {
      height: 'auto',
      width: '97%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 30,
      marginTop: 10,
      borderRadius: 10
   },


   title: {
      fontSize: 27,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
      paddingBottom: 15,
   },
})