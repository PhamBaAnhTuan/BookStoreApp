import { Dimensions, Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Context
import { useAuth } from '../../context/AuthContext';
// Action
import { getUserProfile } from '../redux/reducer/authActions';
// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Components
import TypeCard from '../../components/home/TypeCard';
import ItemCard from '../../components/home/ItemCard';
import SearchInput from '../../components/search/SearchInput';
import NavBar from '../../components/home/NavBar';

const Home = ({ navigation }) => {
  // Context
  const { dispatch, useAuthSelector, useThemeSelector } = useAuth();
  // Redux state
  const { isAuthenticated, user, accessToken, books, cart } = useAuthSelector;
  const { theme } = useThemeSelector;
  const color = theme.colors;
  // Effect
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserProfile(user.id, accessToken));
      console.log('Home get profile');
    }
  }, [isAuthenticated, dispatch])

  const log = () => console.log(
    'User: ', user?.username,
    '\nIs authenticated: ', isAuthenticated,
    '\nAccessToken: ', accessToken,
    '\nIs Admin: ', user?.is_superuser,
    '\nProfile: ', user,
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.background }}>
      <StatusBar backgroundColor={color.primary} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

        <NavBar
          children={
            <>
              <View style={styles.searchContainer}>
                <SearchInput />
              </View>

              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Cart')}>
                  <Ionicons name="bag-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={log}>
                  <Ionicons name="chatbubble-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </>
          }
        />

        <Text style={[styles.itemCardTitle, { color: color.text }]}>Category</Text>
        <View style={[styles.categoryContainer]}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {books.map((book: any, index: number) => (
              <TypeCard
                key={index}
                icon={book.img ? book.img : 'https://cdn-icons-png.flaticon.com/128/207/207114.png'}
                typeName={book?.title}
                onPress={null}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.itemCardContainer}>
          <Text style={[styles.itemCardTitle, { color: color.text }]}>Recommended daily</Text>
          <View style={styles.itemCardWrap}>
            {books.map((book: any, index: number) => (
              <ItemCard
                key={index}
                onPress={() => navigation.navigate('BookDetail', { selectedBook: books[index] })}
                itemImg={book?.img ? book.img : 'https://dictionary.cambridge.org/vi/images/thumb/book_noun_001_01679.jpg?version=6.0.31'}
                itemName={book?.title}
                discount={book?.discount}
                is_free={book?.free_ship}
                price={book?.price}
                star={book?.rate}
              />
            ))}
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Home;

const styles = StyleSheet.create({
  // Search container
  searchContainer: {
    height: 'auto',
    width: '80%',
    // borderWidth: 1,
    alignItems: 'center',
  },
  icon: {
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  xIcon: {
    height: 20,
    width: 20,
  },

  searchInput: {
    height: '100%',
    width: '80%',
    // borderWidth: 1
  },
  searchInput1: {
    height: '100%',
    width: '75%',
  },


  // Header right
  headerRight: {
    height: 40,
    width: '20%',
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },


  // Category
  categoryContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingVertical: 5
  },


  // Item card container
  itemCardContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
  },

  itemCardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 7,
  },
  itemCardWrap: {
    height: 'auto',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  }
})