import { Dimensions, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
// Context
import { useAuth } from '../../context/AuthContext';
// Icons
import Feather from 'react-native-vector-icons/Feather';
// Components
import ItemCard from '../../components/search/ItemCard';
import CategoryCard from '../../components/search/CategoryCard';
import SearchInput from '../../components/search/SearchInput';
import NavBar from '../../components/home/NavBar';

const Search = ({ navigation }) => {
  // Context
  const { dispatch, useAuthSelector, useThemeSelector } = useAuth();
  // Redux state
  const { isAuthenticated, user, accessToken, books } = useAuthSelector;
  const { theme } = useThemeSelector;
  const color = theme.colors;
  return (
    <SafeAreaView style={[styles.safeView, { backgroundColor: color.background }]}>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.safeView}>

        <NavBar
          children={<SearchInput />}
        />

        <View style={styles.categoryContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <CategoryCard
              category='History'
              onPress={null}
            />
            <CategoryCard
              category='Math'
              onPress={null}
            />
            <CategoryCard
              category='Mental Health'
              onPress={null}
            />
            <CategoryCard
              category='Physical Health'
              onPress={null}
            />
            <CategoryCard
              category='Plant'
              onPress={null}
            />
          </ScrollView>
        </View>

        <View style={styles.recommendContainer}>
          <Text style={[styles.recommendText, { color: color.text }]}>Recommend</Text>
          <View style={styles.recommendWrap}>
            {books.map((book: any, index: number) => (
              <ItemCard
                key={index}
                onPress={() => navigation.navigate('BookDetail', { selectedBook: books[index] })}
                itemImg={book.img ? book.img : 'https://dictionary.cambridge.org/vi/images/thumb/book_noun_001_01679.jpg?version=6.0.31'}
                itemName={book.title}
              />
            ))}
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Search;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },


  // Category container
  categoryContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    marginVertical: 15,
    paddingHorizontal: 10
  },


  // Recommend container
  recommendContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
  },

  recommendText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 10
  },

  recommendWrap: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
})