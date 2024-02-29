import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const GchoiceAxios = axios.create({
  // baseURL: 'https://62d5-2401-d800-4f0-b75c-c903-3b4b-a789-7194.ngrok-free.app',
  baseURL: 'http://10.0.2.2:3000',

});

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken'); 
    console.log(token)
    return token;
  } catch (error) {
    console.error('Error getting token from AsyncStorage:', error);
    return null;
  }
};

GchoiceAxios.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

export default GchoiceAxios;