import { Alert, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
// Context
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
// Components
import ListBook from '../../components/profile/ListBook';
import SearchInput from '../../components/search/SearchInput';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const Developer = ({ navigation }) => {
   // Theme
   const { theme } = useTheme();
   // Data
   const { books, setData, removeBookMethod } = useData();

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
         'Remove this book?', `Do you wanna remove ${book?.title}?`,
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
                  removeBookMethod(book.id, book.title);
                  ToastAndroid.show(`Removed ${book?.title}!`, ToastAndroid.SHORT);
               },
               style: 'default'
            }
         ]
      )
   }
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bgc }}>
         <View style={[styles.headerContainer, { backgroundColor: theme.orange }]}>
            <View style={{flexDirection: 'row'}}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backIcon, { backgroundColor: theme.white }]}>
                  <Ionicons name="arrow-back" size={21} color="black" />
               </TouchableOpacity>
               <Text style={{ fontSize: 21, fontWeight: 'bold', paddingLeft: 10, color: 'white' }}>Welcome to Developer Mode</Text>
            </View>
            <SearchInput />
         </View>

         <View style={[styles.listBookContainer]}>
            <View style={styles.titleContainer}>
               <Text style={[styles.title, { color: theme.text }]}>List of books</Text>
               <TouchableOpacity onPress={() => {
                  navigation.navigate('AddBook')
                  setData({})
               }}>
                  <Ionicons name="add-circle-outline" size={27} color={theme.text} />
               </TouchableOpacity>
            </View>

            <View style={[styles.listBookWrap, { backgroundColor: theme.white }]}>
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


   // List book container
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
   }
})