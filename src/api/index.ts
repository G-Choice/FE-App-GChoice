import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const GchoiceAxios = axios.create({
  baseURL: 'https://5788-113-176-99-140.ngrok-free.app/',
});

GchoiceAxios.interceptors.request.use(
  async function (config) {
    let accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

GchoiceAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      try {
        const response = await GchoiceAxios.post('/auth/refresh', {
          refreshToken: refreshToken
        });
        const newAccessToken = response.data.accessToken;
        await AsyncStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return GchoiceAxios(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default GchoiceAxios;
