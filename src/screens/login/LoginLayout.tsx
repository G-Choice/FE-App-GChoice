import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../assets/colors/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { InputComponent } from '../../components/input/TextField';
import { ButtonComponent } from '../../components/input/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import GchoiceAxios from '../../api/index';
import { setAuth } from '../../global-states';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EmailInput {
  value: string;
}

interface PasswordInput {
  value: string;
}

const LoginLayout: React.FC = () => {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [emailInput, setEmailInput] = useState<EmailInput>({ value: '' });
  const [passwordInput, setPasswordInput] = useState<PasswordInput>({ value: '' });

  const auth = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const resetForm = () => {
    setEmailInput({ value: '' });
    setPasswordInput({ value: '' });
  };
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email cannot be empty');
      return false;
    }
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? '' : 'Invalid email address');
    return isValid;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('Password cannot be empty');
      return false;
    }
    const isValid = password.length >= 6;
    setPasswordError(isValid ? '' : 'Password must be at least 6 characters');
    return isValid;
  };

 const submit = async () => {
   setIsLoading(true);

   const isEmailValid = validateEmail(emailInput.value);
   const isPasswordValid = validatePassword(passwordInput.value);

   if (!isEmailValid || !isPasswordValid) {
     setIsLoading(false);
     return;
   }

   let data = {
     email: emailInput.value,
     password: passwordInput.value,
   };
   try {
    const response = await GchoiceAxios({
      url: 'auth/login',
      method: 'post',
      data: data,
    });
    await AsyncStorage.setItem('accessToken', response.data.accessToken);
    dispatch(
      setAuth({
        authToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })
    );
    setIsLoading(false);
    if (response.status === 201) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Login Successfully!',
        visibilityTime: 2000,
        autoHide: true,
        onHide: () => {
          resetForm();
          navigation.navigate('HomeScreen');
        },
      });
    }
  } catch (error) {
    setIsLoading(false);
    console.log(error.response.status )
    if (error.response.status === 401) {
     Toast.show({
       type: 'error',
       position: 'top',
       text1: 'Incorrect email or password!',
       visibilityTime: 3000,
       autoHide: true,
     });
   } else {
     console.log('An error occurred:', error.message);
     Toast.show({
       type: 'error',
       position: 'top',
       text1: 'An error occurred. Please try again later.',
       visibilityTime: 3000,
       autoHide: true,
     });
   }
  }
 }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={styles.logo}
          />
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              color: Colors.darkBlack,
              marginLeft: 10,
              fontWeight: '600',
              fontSize: 25,
            }}>
            Welcome
          </Text>
          <Text
            style={{
              color: Colors.darkBlack,
              marginLeft: 10,
              fontWeight: '500',
              fontSize: 16,
            }}>
            Sign in to continue
          </Text>
          <Text
            style={{
              color: Colors.darkBlack,
              marginLeft: 10,
              fontWeight: '700',
              marginTop: 20,
            }}>
            Email <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <InputComponent
            value={emailInput.value}
            placeholder="Enter Email"
            onChangeText={text => setEmailInput({ value: text })}
          />
          {emailError.length > 0 && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}
          <Text
            style={{
              color: Colors.darkBlack,
              marginLeft: 10,
              fontWeight: '700',
            }}>
            Password <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <InputComponent
            secureTextEntry={!showPassword}
            value={passwordInput.value}
            placeholder="Enter Password"
            onChangeText={(text) => setPasswordInput({ value: text })}
          />
          {passwordError.length > 0 && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? 'eye-slash' : 'eye'}
              size={20}
              color={Colors.darkBlack}
            />
          </TouchableOpacity>

          <ButtonComponent onPress={() => submit()} buttonText="Sign in" />
          {isLoading && (
            <ActivityIndicator size="large" color={Colors.primaryColor} style={styles.loadingIndicator} />
          )}
          <View style={styles.haveAccountContainer}>
            <Text style={styles.haveAccountText}>
              Do not have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.loginLink}>Create Account</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>Or Sign In With</Text>
            <View style={styles.separatorLine} />
          </View>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../assets/icons/google.jpg')}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../assets/icons/Facebook.jpg')}
                style={{ width: 14, height: 25 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../assets/icons/Apple.jpg')}
                style={{ width: 21, height: 25 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  safeAreaView: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 190,
  },
  logo: {
    width: 300,
    height: 60,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingTop: 16,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -200,
  },
  input: {
    padding: 10,
    borderBottomWidth: 0.75,
    borderBottomColor: Colors.darkBlack,
    marginBottom: 10,
    color: '#888',
  },
  signUpButton: {
    padding: 12,
    backgroundColor: Colors.primaryColor,
    borderRadius: 12,
    marginTop: 15,
  },
  signUpButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.secondaryColor,
  },
  haveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  haveAccountText: {
    color: Colors.darkBlack,
    fontWeight: '400',
  },
  loginLink: {
    fontWeight: '600',
    color: Colors.primaryColor,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.darkBlack,
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: '300',
    color: Colors.darkBlack,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  eyeIconContainer: {
    position: 'absolute',
    top: 190,
    right: 20,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
  },
});

export { LoginLayout };
