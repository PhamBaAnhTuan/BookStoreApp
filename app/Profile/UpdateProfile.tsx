import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// Context
import { useAuth } from '../../context/AuthContext';
// Action
import { updateUserProfile } from '../redux/reducer/authActions';
// Components
import AddButton from '../../components/profile/AddButton';
import Header from '../../components/home/Header';
import Input from '../../components/form/Input';

const UpdateProfile = ({navigation}) => {
   // Redux auth
   const { dispatch, useAuthSelector, useThemeSelector, data, setData, resetForm } = useAuth();
   // Redux theme
   const { isAuthenticated, accessToken, user, books } = useAuthSelector;
   const { theme } = useThemeSelector;
   const color = theme.colors;

   useEffect(() => {
      if (user) {
         setData({
            first_name: user?.first_name,
            last_name: user?.last_name,
            email: user?.email,
         })
      }
   }, [user]);
   // Handle update info
   const handelUpdateUser = () => {
      if (!data.first_name || !data.last_name || !data.email) {
         return ToastAndroid.show("Please fill all this fields!", ToastAndroid.SHORT)
      }
      dispatch(updateUserProfile(user.id, data, accessToken, resetForm));
      navigation.goBack();
      console.log('User: ', data)
   }
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.background }}>
         <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

            <Header
               onPress={() => navigation.goBack(resetForm())}
            />

            <View style={[styles.formAddBook, { backgroundColor: color.surface }]}>
               <Text style={[styles.title, { color: color.onSurface }]}>Update Profile</Text>

               <Input
                  title='First name:'
                  placeholder=''
                  required={true}
                  onChangeText={(value: any) => setData({ ...data, first_name: value })}
                  value={data.first_name}
                  keyboardType={'default'}
               />
               <Input
                  title='Last name:'
                  placeholder=''
                  required={true}
                  onChangeText={(value: any) => setData({ ...data, last_name: value })}
                  value={data.last_name}
                  keyboardType={'default'}
               />
               <Input
                  title='Email:'
                  placeholder='example@gmail.com'
                  required={true}
                  onChangeText={(value: any) => setData({ ...data, email: value })}
                  value={data.email}
                  keyboardType={'default'}
               />
               {/* <Input
                  title='Phone number:'
                  placeholder=''
                  required={false}
                  onChangeText={(value: any) => setData({ ...data, phone: value })}
                  value={data.phone}
                  keyboardType={'number-pad'}
               />
               <Input
                  title='Address:'
                  placeholder='Da nang city'
                  required={false}
                  onChangeText={(value: any) => setData({ ...data, address: value })}
                  value={data.address}
                  keyboardType={'default'}
               /> */}

               <AddButton
                  onPress={handelUpdateUser}
                  title='Update information'
                  color='green'
               />
            </View>

         </ScrollView>
      </SafeAreaView>
   )
}

export default UpdateProfile

const styles = StyleSheet.create({
   // Form container
   formAddBook: {
      height: 'auto',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 30,
      // marginTop: 10
   },


   title: {
      fontSize: 27,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
      paddingBottom: 15,
   },
})