import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const resMessage: string =
      (error.response?.data as { message?: string })?.message || '';

    if (resMessage === 'Invalid value') {
      return Promise.reject(error);
    }

    const config = error.config as AxiosRequestConfig & {
      retry?: number;
      retryDelay?: number;
    };

    if (config.retry && config.retry > 0) {
      config.retry -= 1;

      const delayRetryRequest = new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log('retrying request:', config.url);
          resolve();
        }, config.retryDelay || 1000);
      });

      return delayRetryRequest.then(() => axiosInstance(config));
    }

    return Promise.reject(error);
  }
);
