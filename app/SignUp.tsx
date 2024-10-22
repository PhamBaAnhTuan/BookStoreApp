import { Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
// Context
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
// Icons
import Feather from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = ({ navigation }) => {
  // Theme
  const { theme } = useTheme();
  // Handle icon eye
  const [icon, setIcon] = useState('eye');
  const [isHide, setIsHide] = useState(true);

  const handleIconEye = () => {
    setIcon(icon === "eye" ? "eye-off" : "eye");
    setIsHide(!isHide);
  };
  // Auth
  const {
    signUp, isAuthenticated, setIsAuthenticated,
    email, setEmail, username, setUsername, password, setPassword
  } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  // Handle email change
  const handleEmailChange = (text: string) => setEmail(text);
  const handleUsernameChange = (text: string) => setUsername(text);
  const handlePasswordChange = (text: string) => setPassword(text);
  // Handle sign up
  useEffect(() => {
    if(isLogin) {
      signUpMethod();
      if(isAuthenticated) {
        navigation.replace('TabNavigator');
      }
      else{
        return;
      }
      setIsLogin(false);
    }
  }, [isLogin, isAuthenticated]); 
  const signUpMethod = async () => {
    if (!email && !username && !password) {
      ToastAndroid.show('Enter Full name and Password!', ToastAndroid.SHORT);
      return;
    } if (!email) {
      ToastAndroid.show('Enter Email!', ToastAndroid.SHORT);
      return;
    } if (!username) {
      ToastAndroid.show('Enter User name!', ToastAndroid.SHORT);
      return;
    } if (!password) {
      ToastAndroid.show('Enter Password!', ToastAndroid.SHORT);
      return;
    }
    try {
      await signUp(email, username, password);
    } catch (error) {
      console.log('Sign up error: ', error);
    }
    setEmail('');
    setUsername('');
    setPassword('');
    setIsLogin(false);
  };
  return (
    <SafeAreaView style={{ backgroundColor: theme.orange, flex: 1, justifyContent: 'space-between' }}>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo2.png')} resizeMode='contain' />
      </View>
      <View style={styles.shopeeTextContainer}>
        <Image style={styles.shopeeText} source={require('../assets/images/shopeeText.png')} resizeMode='contain' />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrap}>
          <Text style={[styles.emailText, { color: 'black' }]}>Email</Text>
          <TextInput style={[styles.emailInput, { backgroundColor: theme.white, color: 'black' }]}
            keyboardType='email-address'
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>

        <View style={styles.inputWrap}>
          <Text style={[styles.emailText, { color: 'black' }]}>User Name</Text>
          <TextInput style={[styles.emailInput, { backgroundColor: theme.white, color: 'black' }]}
            value={username}
            onChangeText={handleUsernameChange}
          />
        </View>

        <View style={styles.inputWrap}>
          <Text style={[styles.emailText, { color: 'black' }]}>Password</Text>
          <View style={[styles.passwordInputContainer, { backgroundColor: theme.white }]}>
            <TextInput style={[styles.passwordInput, { backgroundColor: theme.white, color: 'black' }]}
              secureTextEntry={isHide}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={handleIconEye}
            >
              <Feather name={icon} size={23} color="black" />
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <View style={styles.signUpBtnContainer}>
        <TouchableOpacity style={[styles.signUpBtn, { backgroundColor: theme.green }]} onPress={() => setIsLogin(true)}>
          <Text style={styles.signUpText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={{ height: 1, width: '35%', backgroundColor: theme.bgc }}></View>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.bgc }}>Or</Text>
          <View style={{ height: 1, width: '35%', backgroundColor: theme.bgc }}></View>
        </View>

        <View style={styles.otherMethodIcon}>
          <TouchableOpacity><Image source={require('../assets/icons/google.png')} resizeMode='cover' /></TouchableOpacity>
          <TouchableOpacity><Image source={require('../assets/icons/meta.png')} resizeMode='cover' /></TouchableOpacity>
          <TouchableOpacity><Image source={require('../assets/icons/instagram.png')} resizeMode='cover' /></TouchableOpacity>
        </View>

        <View style={styles.otherMethodContainer}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: theme.green }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  // Logo container
  logoContainer: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1
  },

  // SHopee text
  shopeeTextContainer: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1
  },
  shopeeText: {
    // alignSelf: 'center',
  },


  // Input container
  inputContainer: {
    height: 250,
    width: '100%',
    // borderWidth: 1,
    alignItems: 'center',
  },

  inputWrap: {
    height: 'auto',
    width: '85%',
    // borderWidth: 1,
    marginBottom: 5
  },
  emailText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emailInput: {
    height: 40,
    // borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fde8b2',
    paddingLeft: 10,
  },

  passwordInputContainer: {
    height: 40,
    width: '100%',
    // borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 5,
  },
  passwordInput: {
    height: '100%',
    width: '85%',
    borderRadius: 5,
    paddingLeft: 10
  },
  eyeIcon: {
    height: '100%',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // Sign in btn container
  signUpBtnContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    alignItems: 'center',
  },

  signUpBtn: {
    height: 40,
    width: '85%',
    backgroundColor: '#644f19',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: '20%'
  },
  signUpText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white'
  },


  // Or container
  orContainer: {
    height: 'auto',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '10%'
  },

  // Other method icons
  otherMethodIcon: {
    height: 'auto',
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderWidth: 1,
    marginBottom: '10%'
  },

  // Other method container
  otherMethodContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  }
})