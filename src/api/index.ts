import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const GchoiceAxios = axios.create({
  baseURL: 'https://75ea-113-176-99-140.ngrok-free.app',
  // baseURL: 'http://10.0.2.2:3000',
});

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken'); 
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