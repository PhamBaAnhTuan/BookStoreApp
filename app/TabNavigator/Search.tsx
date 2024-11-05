import { Dimensions, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
// Theme context
import { useTheme } from '../../context/ThemeContext';
// Components
import ItemCard from '../../components/search/ItemCard';
import CategoryCard from '../../components/search/CategoryCard';

const Search = ({ navigation }) => {
  // Theme
  const { theme } = useTheme();
  // Handle search
  const [search, setSearch] = useState('');
  const handleSearchChange = (text: string) => setSearch(text);
  const resetSearch = () => setSearch('');
  return (
    <SafeAreaView style={[styles.safeView, { backgroundColor: theme.bgc }]}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.searchContainer, { backgroundColor: theme.gray }]}>
            <TouchableOpacity>
              <Image style={styles.icon} source={require('../../assets/icons/camera.png')} resizeMode='cover' />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder='Search'
              value={search}
              onChangeText={handleSearchChange}
            />
            {search !== ''
              ? (
                <TouchableOpacity onPress={resetSearch}>
                  <Image style={styles.xIcon} source={require('../../assets/icons/x.png')} />
                </TouchableOpacity>
              )
              : null}
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <ScrollView horizontal={true}>
            <CategoryCard
              category='Pant'
              onPress={null}
            />
            <CategoryCard
              category='Tee'
              onPress={null}
            />
            <CategoryCard
              category='Fast food'
              onPress={null}
            />
            <CategoryCard
              category='Sneaker'
              onPress={null}
            />
            <CategoryCard
              category='Iphone'
              onPress={null}
            />
            <CategoryCard
              category='Tee'
              onPress={null}
            />
            <CategoryCard
              category='Fast food'
              onPress={null}
            />
            <CategoryCard
              category='Sneaker'
              onPress={null}
            />
          </ScrollView>
        </View>

        <View style={styles.recommendContainer}>
          <Text style={[styles.recommendText, { color: theme.text }]}>Recommend</Text>
          <View style={styles.recommendWrap}>
            <ItemCard
              itemImg={require('../../assets/icons/cake.png')}
              itemName='Cake'
            />
            <ItemCard
              itemImg={require('../../assets/icons/vegetable.png')}
              itemName='Vegetable'
            />
            <ItemCard
              itemImg={require('../../assets/icons/jeans.png')}
              itemName='Jeans'
            />
            <ItemCard
              itemImg={require('../../assets/icons/sneakers.png')}
              itemName='Sneakers'
            />
            <ItemCard
              itemImg={require('../../assets/icons/soft-drink.png')}
              itemName='Soft drink'
            />
            <ItemCard
              itemImg={require('../../assets/icons/device.png')}
              itemName='Devices'
            />
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Search;

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: '#F1B720',
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    // alignItems: 'center',
  },


  // Header
  header: {
    height: 'auto',
    width: '100%',
    // backgroundColor: '#F1B720',
    marginVertical: 15,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-evenly',
    // borderWidth: 1
  },

  searchContainer: {
    height: 40,
    width: '95%',
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    paddingLeft: 5
  },
  icon: {
    height: 25,
    width: 25,
  },
  xIcon: {
    height: 20,
    width: 20,
  },

  searchInput: {
    height: '100%',
    width: '85%',
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


  // Category container
  categoryContainer:{
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  },


  // Recommend container
  recommendContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
  },

  recommendText: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 10
  },

  recommendWrap:{
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'space-around',
  }
})