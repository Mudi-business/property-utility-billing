import axios, { HttpStatusCode } from "axios";
import { store } from "../../store/store";
import { LoginActions } from "../../store/slices/LoginSlice";


//OUR RESUSBLE AXIOS INSTANCE FOR INTERCEPTING REQUEST AND RESPONSE SO WE CAN MANIPULATE DATA IN BETWEEN
export const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token: any = store?.getState()?.login;
  const { access_token } = JSON.parse(token.token);
  config.headers.Authorization = `Bearer ${access_token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const token: any = store?.getState()?.login;
    const { response } = error;

    if (response?.status === HttpStatusCode.Unauthorized) {
      try {
        const {
          data: { access_token, refresh_token },
        } = await axios.post<{ access_token: string; refresh_token: string }>(
          `${process.env.API_URL}/refresh/token`,
          { refresh_token: JSON.parse(token.token).refresh_token }
        );
        store.dispatch(
          LoginActions.setToken(JSON.stringify({ access_token, refresh_token }))
        );
      } catch (refreshError) {
        localStorage.clear();
        window.location.assign("/");
        console.error(refreshError);
      }

      return axiosInstance(error.config);
    }

    return Promise.reject(error);
  }
);
