import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
// Context
import { useAuth } from '../../context/AuthContext';
// Redux action
import { signOutAction } from '../redux/reducer/authActions';
import { setTheme } from '../redux/reducer/themeActions';
// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// Components
import SettingCard from '../../components/profile/SettingCard';
import NavBar from '../../components/home/NavBar';


const Profile = ({ navigation }) => {
  // Auth context
  const { useAuthSelector, useThemeSelector, dispatch } = useAuth();
  // Redux state
  const { isAuthenticated, user, accessToken, books } = useAuthSelector;
  const { theme } = useThemeSelector;
  const color = theme.colors;
  // Handle sign out
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
            dispatch(signOutAction())
          },
          style: 'default'
        }
      ]
    )
  }

  useEffect(() => {
    if (isAuthenticated === false) {
      navigation.replace('SignIn')
      console.log('User signed out')
      console.log(
        'User: ', user?.username,
        '| Is authenticated: ', isAuthenticated,
        '| accessToken: ', accessToken,
      )
    }
  }, [isAuthenticated])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

        <NavBar
          children={
            <>
              <TouchableOpacity>
                <Image style={styles.profileImage} source={require('../../assets/images/zeros.jpg')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileInfoContainer}>
                <Text style={[styles.userNameText, { color: color.onText }]}>{user?.username || 'User name'}</Text>
                <Text style={{ color: color.onText }}>{user?.email || 'Your email here'}</Text>
              </TouchableOpacity>
            </>
          }
        />

        <View style={[styles.settingContainer, { backgroundColor: color.surface }]}>
          {user?.is_superuser
            ? <SettingCard
              onPress={() => navigation.navigate('Developer')}
              icon={<Ionicons name="settings-outline" size={24} color={color.onSurface} />}
              title='Developer'
            />
            : null
          }
          <SettingCard
            onPress={() => navigation.navigate('AddBook')}
            icon={<Ionicons name="add" size={27} color={color.onSurface} />}
            title='Add book'
          />
          <SettingCard
            onPress={() => navigation.navigate('UpdateProfile')}
            icon={<Ionicons name="person-sharp" size={24} color={color.onSurface} />}
            title='Change information'
          />
          <SettingCard
            onPress={() => {
              dispatch(setTheme('light'))
              ToastAndroid.show('Set light theme successful', ToastAndroid.SHORT)
            }}
            icon={<Entypo name="light-up" size={24} color={color.onSurface} />}
            title='Light theme'
          />
          <SettingCard
            onPress={() => {
              dispatch(setTheme('dark'))
              ToastAndroid.show('Set dark theme successful', ToastAndroid.SHORT)
            }}
            icon={<MaterialIcons name="dark-mode" size={24} color={color.onSurface} />}
            title='Dark theme'
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
  profileImage: {
    height: 70,
    width: 70,
    resizeMode: 'cover',
    borderRadius: 100
  },

  profileInfoContainer: {
    height: '50%',
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
    marginVertical: 15,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'lightgray'
  },
})