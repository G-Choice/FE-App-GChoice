import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"

const GchoiceAxios = axios.create({
  baseURL: 'https://62e6-2402-800-6294-436f-2c66-aed4-eae9-46ad.ngrok-free.app/',
  headers: {'Authorization': 'bearer token...'}
});

GchoiceAxios.interceptors.request.use(async function (config) {
  let accessToken = await AsyncStorage.getItem("accessToken")
  config.headers.Authorization = `bearer ${accessToken}`
  // config.headers["Content-Type"] = 'multipart/form-data'
  // config.headers["Content-Type"] = 'application/json-pact+json'
  // config.headers["Content-Type"] = 'application/*'
  return config;
}, function (error) {
  return Promise.reject(error);
});


export default GchoiceAxios