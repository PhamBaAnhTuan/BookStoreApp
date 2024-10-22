import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
// Theme context
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
// Components
import SettingCard from '../../components/profile/SettingCard';
// Context


const Profile = ({ navigation }) => {
  // Theme
  const { theme } = useTheme();
  // Sing out method
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuth();
  const signOutMethod = () => {
    Alert.alert(
      'Sign out?', 'Do you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Sign out',
          onPress: () => {
            setIsAuthenticated(false)
            setUser([]);
            navigation.replace('SignIn')
            console.log('User signed out')
            console.log('Is authenticated: ', isAuthenticated)
          },
          style: 'default'
        }
      ]
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bgc }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

        <View style={[styles.profileContainer, { backgroundColor: theme.orange }]}>
          <Image style={styles.profileImage} source={require('../../assets/images/zeros.jpg')} />
          <View style={styles.profileInfoContainer}>
            <Text style={[styles.userNameText, { color: theme.white }]}>{user.username || 'TuanPham'}</Text>
            <Text style={{ color: theme.white }}>{user.email || 'TuanPham'}</Text>
          </View>
        </View>

        <View style={[styles.settingContainer, { backgroundColor: 'white' }]}>
          <SettingCard
            onPress={() => navigation.navigate('Developer')}
            icon={<Ionicons name="settings-outline" size={24} color="black" />}
            title='Developer'
          />
          <SettingCard
            onPress={() => navigation.navigate('AddBook')}
            icon={<Ionicons name="add" size={27} color="black" />}
            title='Add book'
          />
          <SettingCard
            onPress={null}
            icon={<Ionicons name="notifications-outline" size={24} color="black" />}
            title='Notification'
          />
          <SettingCard
            onPress={null}
            icon={<Ionicons name="receipt-outline" size={24} color="black" />}
            title='Receipt'
          />
          <SettingCard
            onPress={signOutMethod}
            icon={<AntDesign name="logout" size={24} color="red" />}
            title='Sign out'
          />
        </View>

        <View style={styles.settingContainer}>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile;

const styles = StyleSheet.create({
  // profile container
  profileContainer: {
    height: 100,
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },

  profileImage: {
    height: 70,
    width: 70,
    resizeMode: 'cover',
    borderRadius: 100
  },

  profileInfoContainer: {
    height: '100%',
    width: '65%',
    // borderWidth: 1,
    justifyContent: 'center',
  },
  userNameText: {
    fontSize: 17,
    fontWeight: 'bold'
  },


  // setting container
  settingContainer: {
    height: 'auto',
    width: '100%',
    marginBottom: 5,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'lightgray'
  },
})