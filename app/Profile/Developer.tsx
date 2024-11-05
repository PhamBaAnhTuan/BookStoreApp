import { Alert, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
// Context
import { useAuth } from '../../context/AuthContext';
// Components
import ListBook from '../../components/profile/ListBook';
import SearchInput from '../../components/search/SearchInput';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
// Actions
import { deleteBookAction } from '../redux/reducer/authActions';


const Developer = ({ navigation }) => {
   // Context
   const { dispatch, useAuthSelector, useThemeSelector } = useAuth();
   // Redux state
   const { isAuthenticated, accessToken, user, books } = useAuthSelector;
   const { theme } = useThemeSelector;
   const color = theme.colors;

   // Remove confirm
   const [book, setBook] = useState({});
   const [isRemoving, setIsRemoving] = useState(false);

   useEffect(() => {
      if (isRemoving && book?.id) {
         handleRemove();
         setIsRemoving(false);
      }

   }, [book, isRemoving]);

   const handleRemove = () => {
      Alert.alert(
         'Remove this books?', `Do you wanna remove ${book?.title}?`,
         [
            {
               text: 'Cancel',
               style: 'cancel',
               onPress: () => {
                  ToastAndroid.show(`Canceled!`, ToastAndroid.SHORT);
               },
            },
            {
               text: 'Remove',
               onPress: () => {
                  dispatch(deleteBookAction(book?.id, book?.title, accessToken))
                  ToastAndroid.show(`Removed ${book?.title}!`, ToastAndroid.SHORT);
               },
               style: 'default'
            }
         ]
      )
   }
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.background }}>
         <View style={[styles.headerContainer, { backgroundColor: color.orange }]}>
            <View style={{ flexDirection: 'row' }}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backIcon, { backgroundColor: color.surface }]}>
                  <Ionicons name="arrow-back" size={21} color={color.onSurface} />
               </TouchableOpacity>
               <Text style={{ fontSize: 21, fontWeight: 'bold', paddingLeft: 10, color: color.text }}>Welcome to Developer Mode</Text>
            </View>
            <SearchInput />
         </View>

         <View style={[styles.listBookContainer]}>
            <View style={styles.titleContainer}>
               <Text style={[styles.title, { color: color.text }]}>List of books</Text>
               <TouchableOpacity onPress={() => {
                  navigation.navigate('AddBook')
                  // setData({})
               }}>
                  <Ionicons name="add-circle-outline" size={27} color={color.text} />
               </TouchableOpacity>
            </View>

            {books.length > 0 ? 
            (
               <View style={[styles.listBookWrap, { backgroundColor: color.surface }]}>
                  {books.map((book: any, index: number) => (
                     <ListBook
                        key={index}
                        title={book.title}
                        onPress={() => navigation.navigate('UpdateBook', { selectedBook: books[index] })}
                        remove={() => {
                           setBook(books[index]);
                           setIsRemoving(true);
                        }}
                     />
                  ))}
               </View>
            )
               : (
                  <View style={styles.emptyTextWrap}>
                     <Text style={[styles.emptyText, { color: color.divider }]}>List is empty</Text>
                  </View>
               )
            }
         </View>
      </SafeAreaView >
   )
}

export default Developer

const styles = StyleSheet.create({
   headerContainer: {
      height: 100,
      width: '100%',
      justifyContent: 'space-evenly',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
   },
   backIcon: {
      height: 'auto',
      width: 'auto',
      padding: 3,
      borderRadius: 50,
      marginLeft: 10
   },


   // List books container
   listBookContainer: {
      height: 'auto',
      width: '100%',
      marginTop: 20,
   },

   titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginBottom: 5
   },
   title: {
      fontSize: 21,
      fontWeight: 'bold',
   },

   listBookWrap: {
      height: 'auto',
      width: '100%',
      borderRadius: 10,
      paddingVertical: 3
      // borderWidth: 1
   },

   emptyTextWrap:{
      height: '50%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
   },
   emptyText: {
      fontSize: 16,
      fontWeight: 'bold',
   },
})