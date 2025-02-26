const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";

const getTokenAuthHeader = (token: string) => `Bearer ${token}`;

function createInstance(API: string, timeout?: number) {
  axios.defaults.withCredentials = true;
  const serverInstance = axios.create({
    baseURL: API,
    headers: { "Content-Type": "application/json" },
  });

  const interceptorsRq = async (config: InternalAxiosRequestConfig<any>) => {
    // let accessToken = storage.getAccessToken()

    // config.headers.Authorization = getTokenAuthHeader(accessToken)

    return config;
  };
  const interceptorsRqError = (error: any) => {
    return Promise.reject(error);
  };

  const interceptorsRs = (response: AxiosResponse<any, any>) => {
    return response?.data;
  };
  const interceptorsRsError = async (error: any) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      try {
        // xử lí gọi api refresh token
      } catch (error: any) {
        //xử lí khi  không có quyền hoặc hết hạn token
      }
    }

    return Promise.reject(error);
  };

  serverInstance.interceptors.request.use(interceptorsRq, interceptorsRqError);
  serverInstance.interceptors.response.use(interceptorsRs, interceptorsRsError);

  return serverInstance;
}
const axiosInstance = createInstance(SERVER_DOMAIN, 60000);

axiosRetry(axiosInstance, { retries: 3 });

export default axiosInstance;
