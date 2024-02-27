import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../assets/colors/index';
import GchoiceAxios from '../../api/index';
import { setAuth } from '../../global-states';
import Toast from 'react-native-toast-message';

interface VerificationProps { }

const Verification: React.FC<VerificationProps> = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const otpInputsRefs = useRef<TextInput[]>([...Array(6)].map(() => React.createRef<TextInput>()));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOtpChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    if (value && index < otpValues.length - 1) {
      otpInputsRefs.current[index + 1].focus();
    }

    setOtpValues(newOtpValues);
  };

  const submitVerification = async () => {
    setLoading(true);
    setError('');

    const verifyData = {
      email: email,
      otp: otpValues.join(''),
    };

    try {
      const response = await GchoiceAxios({
        url: 'auth/verifyOtp',
        method: 'post',
        data: verifyData,
      });

      console.log('Verification successful');
      setLoading(false);

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Verification Successful',
        visibilityTime: 2000,
        autoHide: true,
        onHide: () => {
          navigation.navigate('LoginScreen');
        },
      });
    } catch (error) {
      console.error('Verification failed', error);
      setLoading(false);
      setError('OTP is not correct. Please try again!');
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Incorrect OTP',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: Colors.darkBlack, marginLeft: 10, fontWeight: '700', fontSize: 25 }}>
            Verification
          </Text>
          <Text style={{ color: Colors.darkBlack, marginLeft: 10, fontWeight: '300', fontSize: 16 }}>
            We will send you the code {'/br'} verification to your mobile
          </Text>

          <View style={styles.otpContainer}>
            {otpValues.map((value, index) => (
              <TextInput
                key={index}
                ref={(ref) => (otpInputsRefs.current[index] = ref)}
                style={styles.otpInput}
                value={value}
                onChangeText={(text) => handleOtpChange(index, text)}
                keyboardType="numeric"
                maxLength={1}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.sendAgainButton}>
            <Text style={styles.sendAgainText}>Send again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton} onPress={submitVerification}>
            {loading ? (
              <ActivityIndicator size="small" color={Colors.secondaryColor} />
            ) : (
              <Text style={styles.signUpButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
    height: 60
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingTop: 16,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -200

  },
  input: {
    padding: 10,
    borderBottomWidth: 0.75,
    borderBottomColor: Colors.darkBlack,
    marginBottom: 10,
    color: "#888"
  },
  signUpButton: {
    padding: 12,
    backgroundColor: Colors.primaryColor,
    borderRadius: 12,
    marginTop: 15
  },
  sendAgainButton: {
    padding: 12,
    backgroundColor: Colors.darkGrey,
    borderRadius: 12,
    marginTop: 15
  },
  sendAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.secondaryColor,
  },
  signUpButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.secondaryColor,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.darkBlack,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkBlack,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
    marginTop: 10,
  },
});

export { Verification };